import * as tf from "@tensorflow/tfjs";
import {T5Tokenizer} from "@xenova/transformers";
import {BaseLocalModelService} from "../base-services/BaseLocalModelService";

class LocalSummarizerModelServiceClass extends BaseLocalModelService {
    private tokenizer: T5Tokenizer | null = null;
    protected isTokenizerLoaded = false;
    private EOS_TOKEN_ID = 1;
    
    /**
     * Load the model and the tokenizer from a local paths
     */
    public override async loadModel(modelUrls: any[]) {
        if (this.isModelLoaded && this.isTokenizerLoaded) return;
        const [ modelPath, tokenizerPath ] = modelUrls;
        
        console.log("Loading T5 summarizer model...");
        this.model = await tf.loadGraphModel(modelPath);
        this.isModelLoaded = true;
        
        console.log("Loading the T5 tokenizer...");
        const tokenizerJSON = await fetch(tokenizerPath).then((r) => r.json());
        this.tokenizer = new T5Tokenizer(tokenizerJSON, { type: "t5" });
        this.isTokenizerLoaded = true;
        
        console.log("T5 summarizer loaded successfully!");
    }

    /**
     * Summarize text with T5, using naive iterative decoding.
     */
    public async summarizeText(
        inputText: string,
        maxNewTokens = 50,
        maxTokensIn = 512
    ): Promise<string> {
        if (!this.model || !this.isModelLoaded) throw new Error("T5 model not loaded. Call loadModel() first.");
        if (!this.tokenizer || !this.isTokenizerLoaded) throw new Error("Tokenizer not loaded. Call loadModel() first.");
        await tf.setBackend("cpu");
        
        // 1) "summarize: " prefix
        const prompt = "summarize: " + inputText;
        
        // 2) Tokenize
        let inputIds = this.tokenizer.encode(prompt);
        // Force max input tokens to reduce memory usage
        if (inputIds.length > maxTokensIn) inputIds = inputIds.slice(0, maxTokensIn);
        const attentionMask = inputIds.map(() => 1);

        // 3) Decoder start: T5 usually uses the pad token as decoder_start_token
        const padTokenId = this.tokenizer.pad_token_id ?? 0;
        let outputTokens = [padTokenId];

        // 4) Iterative decoding
        for (let step = 0; step < maxNewTokens; step++) {
            const encInput = tf.tensor2d([inputIds], [1, inputIds.length], "int32");
            const encMask = tf.tensor2d([attentionMask], [1, attentionMask.length], "int32");
            const decInput = tf.tensor2d([outputTokens], [1, outputTokens.length], "int32");

            const outputs = this.model.execute(
                {
                    encoder_input_ids: encInput,
                    encoder_attention_mask: encMask,
                    decoder_input_ids: decInput
                },
                ["logits"]
            ) as tf.Tensor;
            
            // last step's logits => shape [1, vocabSize]
            const lastLogits = outputs.slice(
                [0, outputTokens.length - 1, 0],
                [1, 1, -1]
            );
            const squeezed = lastLogits.squeeze([0, 1]);
            const nextTokenIdTensor = squeezed.argMax(-1);
            const nextTokenIdData = await nextTokenIdTensor.data();
            const nextTokenId = nextTokenIdData[0];
            
            // Cleanup
            encInput.dispose();
            encMask.dispose();
            decInput.dispose();
            outputs.dispose();
            lastLogits.dispose();
            squeezed.dispose();
            nextTokenIdTensor.dispose();
            
            // EOS check
            if (nextTokenId === this.EOS_TOKEN_ID) break;
            outputTokens.push(nextTokenId);
        }
        // Skip the initial pad token
        return this.tokenizer.decode(outputTokens.slice(1));
    }

    /**
     * Multi-step "chunk and summarize" approach:
     * 1) Break the text into smaller token chunks (e.g., 512 tokens each).
     * 2) Summarize each chunk separately.
     * 3) Optionally combine those partial summaries into one text.
     * 4) Summarize that combined text again for a final short result.
     */
    public async chunkAndSummarize(
        inputText: string,
        maxChunkTokens = 512,
        chunkSummaryTokens = 50,
        finalSummaryTokens = 50
    ): Promise<string> {
        if (!this.tokenizer || !this.isTokenizerLoaded) throw new Error("Tokenizer not loaded. Call loadModel() first.");
        
        // Step 1: Tokenize entire text.
        const fullIds = this.tokenizer.encode(inputText);
        const partialSummaries: string[] = [];
        
        // Step 2: Chunk the tokens
        let start = 0;
        while (start < fullIds.length) {
            const chunkEnd = start + maxChunkTokens;
            const chunkIds = fullIds.slice(start, chunkEnd);
            
            // Summarize the chunk
            const chunkText = this.tokenizer.decode(chunkIds);
            const partialSummary = await this.summarizeText(
                chunkText,
                chunkSummaryTokens,
                maxChunkTokens
            );
            partialSummaries.push(partialSummary);
            
            start = chunkEnd;
        }
        
        // Step 4: Merge all partial summaries and run a final summarization
        const combinedSummary = partialSummaries.join(" ");
        return await this.summarizeText(
            combinedSummary,
            finalSummaryTokens,
            maxChunkTokens
        );
    }
}

// Export a singleton instance
const LocalSummarizerModelService = new LocalSummarizerModelServiceClass();
export default LocalSummarizerModelService;
