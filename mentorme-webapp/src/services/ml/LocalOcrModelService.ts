import * as tf from '@tensorflow/tfjs';
import {
    ADAPTIVE_THRESH_GAUSSIAN_C, adaptiveThreshold, boundingRect, 
    CHAIN_APPROX_SIMPLE, COLOR_RGBA2GRAY, CV_8U, CV_8UC1, CV_8UC4,
    cvtColor, dilate, findContours, INTER_AREA, Mat, MatVector, 
    Rect, resize, RETR_EXTERNAL, Size, THRESH_BINARY_INV
} from '@techstark/opencv-js';
import {BaseLocalModelService} from "../base-services/BaseLocalModelService";

interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}

class LocalOcrModelServiceClass extends BaseLocalModelService {
    private charMap: Record<number, string> = {
        1: ' ', 2: '!', 3: '"', 4: '#', 5: '&',
        6: '\'', 7: '(', 8: ')', 9: '*', 10: '+',
        11: ',', 12: '-', 13: '.', 14: '/', 15: '0',
        16: '1', 17: '2', 18: '3', 19: '4', 20: '5',
        21: '6', 22: '7', 23: '8', 24: '9', 25: ':',
        26: ';', 27: '?', 28: 'A', 29: 'B', 30: 'C',
        31: 'D', 32: 'E', 33: 'F', 34: 'G', 35: 'H',
        36: 'I', 37: 'J', 38: 'K', 39: 'L', 40: 'M',
        41: 'N', 42: 'O', 43: 'P', 44: 'Q', 45: 'R',
        46: 'S', 47: 'T', 48: 'U', 49: 'V', 50: 'W',
        51: 'X', 52: 'Y', 53: 'Z', 54: 'a', 55: 'b',
        56: 'c', 57: 'd', 58: 'e', 59: 'f', 60: 'g',
        61: 'h', 62: 'i', 63: 'j', 64: 'k', 65: 'l',
        66: 'm', 67: 'n', 68: 'o', 69: 'p', 70: 'q',
        71: 'r', 72: 's', 73: 't', 74: 'u', 75: 'v',
        76: 'w', 77: 'x', 78: 'y', 79: 'z', 80: '',
    };

    /**
     * Main pipeline function:
     * 1. Detect lines in the input image.
     * 2. Preprocess each line to 128 x 800.
     * 3. Run inference and decode.
     *
     * @param imageElement - HTMLImageElement or HTMLCanvasElement
     * @returns An array of recognized text strings (one per detected line).
     */
    public async extractHandwrittenText(imageElement: HTMLImageElement | HTMLCanvasElement): Promise<string[]> {
        if (!this.model || !this.isModelLoaded) throw new Error('OCR model is not loaded. Please call loadModel() first.');

        // Mark inference as started
        this._isRunningInference = true;
        
        try {
            // Step 1: Convert image to OpenCV Mat
            const srcMat = await this.createMatFromImage(imageElement);

            // Step 2: Detect bounding boxes for each line
            const lineBoxes: BoundingBox[] = this.detectLines(srcMat);

            const recognizedLines: string[] = [];
            for (const box of lineBoxes) {
                // Crop line region
                const lineMat = this.cropRegion(srcMat, box);

                // Preprocess to match model's expected shape: (128 x 800)
                const preprocessedTensor = this.preprocessLine(lineMat, 128, 800);

                // Inference: shape is [1, 128, 800, 1] if grayscale
                const prediction = this.model.predict(preprocessedTensor) as tf.Tensor;

                // Decode the output (assuming model outputs raw logits for CTC)
                const decodedText = this.ctcGreedyDecode(prediction);
                recognizedLines.push(decodedText);

                // Cleanup
                lineMat.delete();
                preprocessedTensor.dispose();
                prediction.dispose();
            }

            // Cleanup
            srcMat.delete();
            return recognizedLines;
        } finally {
            this._isRunningInference = false;
        }
    }

    /**
     * Converts an HTMLImageElement or HTMLCanvasElement to an OpenCV Mat.
     */
    private async createMatFromImage(imageElement: HTMLImageElement | HTMLCanvasElement): Promise<Mat> {
        const canvas = document.createElement('canvas');
        canvas.width = imageElement.width;
        canvas.height = imageElement.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Could not create canvas 2D context');
        
        ctx.drawImage(imageElement, 0, 0, imageElement.width, imageElement.height);
        const imgData = ctx.getImageData(0, 0, imageElement.width, imageElement.height);
        const srcMat = new Mat(imageElement.height, imageElement.width, CV_8UC4);
        srcMat.data.set(imgData.data);
        return srcMat;
    }

    /**
     * Detects lines in the image using a basic morphological approach.
     *
     * @param srcMat - The source image as an OpenCV Mat (4 channels).
     * @returns An array of bounding boxes representing line regions.
     */
    private detectLines(srcMat: Mat): BoundingBox[] {
        const grayMat = new Mat();
        cvtColor(srcMat, grayMat, COLOR_RGBA2GRAY, 0);

        const threshMat = new Mat();
        adaptiveThreshold(
            grayMat,
            threshMat,
            255,
            ADAPTIVE_THRESH_GAUSSIAN_C,
            THRESH_BINARY_INV,
            15,
            10
        );

        const kernel = Mat.ones(1, 40, CV_8U);
        const morphed = new Mat();
        dilate(threshMat, morphed, kernel);

        const contours = new MatVector();
        const hierarchy = new Mat();
        findContours(
            morphed,
            contours,
            hierarchy,
            RETR_EXTERNAL,
            CHAIN_APPROX_SIMPLE
        );

        const boxes: BoundingBox[] = [];
        for (let i = 0; i < contours.size(); i++) {
            const cnt = contours.get(i);
            const rect = boundingRect(cnt);
            // Heuristic to filter out noise.
            if (rect.width > 30 && rect.height > 10) {
                boxes.push({
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height
                });
            }
            cnt.delete();
        }
        // Sort boxes top-to-bottom.
        boxes.sort((a, b) => a.y - b.y);

        // Cleanup
        grayMat.delete();
        threshMat.delete();
        kernel.delete();
        morphed.delete();
        contours.delete();
        hierarchy.delete();
        return boxes;
    }

    /**
     * Crops a region from the source Mat based on a bounding box.
     */
    private cropRegion(srcMat: Mat, box: BoundingBox): Mat {
        const rect = new Rect(box.x, box.y, box.width, box.height);
        return srcMat.roi(rect);
    }

    /**
     * Preprocesses the cropped line to match the expected input shape:
     *   - Convert to grayscale if needed.
     *   - Resize to (targetHeight x targetWidth).
     *   - Normalize pixel values.
     *   - Expand dims to [1, targetHeight, targetWidth, 1].
     */
    private preprocessLine(lineMat: Mat, targetHeight: number, targetWidth: number): tf.Tensor4D {
        const imageIsGrayScale = lineMat.type() === CV_8UC1;
        if (!imageIsGrayScale) {
            const grayMat = new Mat();
            cvtColor(lineMat, grayMat, COLOR_RGBA2GRAY, 0);
            lineMat = grayMat;
        }

        const resizedMat = new Mat();
        const dsize = new Size(targetWidth, targetHeight);
        resize(lineMat, resizedMat, dsize, 0, 0, INTER_AREA);

        // Normalize pixel values to [0, 1].
        const data = new Float32Array(resizedMat.data.length);
        for (let i = 0; i < resizedMat.data.length; i++) {
            data[i] = resizedMat.data[i] / 255.0;
        }

        let inputTensor = tf.tensor3d(data, [targetHeight, targetWidth, 1], 'float32');
        // Expand dims once => shape [1, 128, 800, 1]
        inputTensor = inputTensor.expandDims(0);
        resizedMat.delete();

        // Return directly:
        return (inputTensor as unknown) as tf.Tensor4D;
    }

    /* 
    * Decodes model predictions into ASCII characters with the correct position
    * */
    private ctcGreedyDecode(logits: tf.Tensor, blankIndex: number = 80): string {
        return tf.tidy(() => {
            // Sanity-check: we expect a batch size of 1.
            if (logits.shape[0] !== 1) throw new Error("Expected logits with batch size 1");

            // Remove the batch dimension. Expected shape becomes [timeSteps, vocabSize].
            const squeezed = logits.squeeze([0]);

            // For each time step, get the index with the highest logit value.
            const maxIndices = squeezed.argMax(-1);

            // Convert the tensor of indices to a JavaScript array.
            const indicesArr = Array.from(maxIndices.dataSync()) as number[];

            // Decode by removing blank tokens.
            const decodedChars: string[] = [];
            for (const idx of indicesArr) {
                if (idx !== blankIndex) decodedChars.push(this.charMap[idx] ?? '?');
            }
            return decodedChars.join('');
        });
    }
}

// Export a singleton instance
const LocalOcrModelService = new LocalOcrModelServiceClass();
export default LocalOcrModelService;
