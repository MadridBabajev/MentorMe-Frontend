import * as tf from "@tensorflow/tfjs";
import {T5Tokenizer} from "@xenova/transformers";
import {BaseLocalModelService} from "../base-services/BaseLocalModelService";

/**
 * Summarizer service that:
 * 1) Loads a T5-based model (converted to TF.js).
 * 2) Loads a matching tokenizer (here, from @xenova/transformers for demonstration).
 * 3) Provides a method to do summarization with "real" tokenization.
 *
 * Also tracks an `isSummarizing` flag, which can help show a loading spinner in the UI.
 */
class LocalSummarizerModelServiceClass extends BaseLocalModelService {
    private tokenizer: T5Tokenizer | null = null;
    protected isTokenizerLoaded = false;
    
    /**
     * Load the model and the tokenizer from a local paths
     */
    public override async loadModel(modelUrls: any[]) {
        if (this.isModelLoaded || this.isTokenizerLoaded) return;
        const [ modelPath, tokenizerPath ] = modelUrls;

        console.log("Loading T5 summarizer model...");
        this.model = await tf.loadGraphModel(modelPath);

        console.log("Loading the T5 tokenizer...");
        const tokenizerJSON = await fetch(tokenizerPath).then((r) => r.json());
        this.tokenizer = new T5Tokenizer(tokenizerJSON, { type: "t5" });
        
        this.isModelLoaded = true;
        this.isTokenizerLoaded = true;
        console.log("T5 summarizer loaded successfully!");
    }

    /**
     * Summarize text by performing a forward pass on loaded T5 model.
     */
    public async summarizeText(inputText: string): Promise<string> {
        if (!this.isModelLoaded || !this.model) throw new Error("Model not loaded. Call loadModel() first.");
        if (!this.isTokenizerLoaded || !this.tokenizer) throw new Error("Tokenizer not loaded. Call loadModel() first.");

        this._isRunningInference = true;
        try {
            // 1) Build the prompt
            const prompt = "summarize: " + inputText;

            // 2) The T5Tokenizer from @xenova/transformers returns just a number[]
            const inputIds: number[] = this.tokenizer.encode(prompt);

            // 3) Convert to a Tensor, shape [batch=1, seqLen]
            const inputTensor = tf.tensor2d([inputIds], [1, inputIds.length], "int32");

            // 4) Single-pass model forward => shape [1, seqLen, vocab_size]
            const logits = this.model.predict(inputTensor) as tf.Tensor;

            // 5) ArgMax => predicted tokens (shape [1, seqLen])
            const argMax = logits.argMax(-1);
            const outputIds = Array.from(await argMax.data()) as number[];

            // 6) Decode
            //    Typically, T5-style tokenizers are *sometimes* async, but if `decode()` is synchronous, you can omit `await`.
            const decoded = this.tokenizer.decode(outputIds);

            // Cleanup Tensors
            argMax.dispose();
            logits.dispose();
            inputTensor.dispose();

            return decoded;
        } finally {
            this._isRunningInference = false;
        }
    }
}

// Export a singleton instance
const LocalSummarizerModelService = new LocalSummarizerModelServiceClass();
export default LocalSummarizerModelService;
