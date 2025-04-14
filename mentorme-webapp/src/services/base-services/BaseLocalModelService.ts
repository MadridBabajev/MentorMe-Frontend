import { LayersModel, GraphModel, loadLayersModel } from "@tensorflow/tfjs";

/**
 * Base class handles basic loading of a tf.LayersModel
 */
export abstract class BaseLocalModelService {
    protected model: LayersModel | GraphModel | null = null;
    protected isModelLoaded = false;
    protected _isRunningInference = false;

    // The default behavior for loading TFJS models
    public async loadModel(modelUrls: any[]): Promise<void> {
        if (this.isModelLoaded) return;
        this.model = await loadLayersModel(modelUrls[0]);
        this.isModelLoaded = true;
        console.log(`Model loaded successfully from: ${modelUrls[0]}`);
    }

    public modelHasLoaded(): boolean {
        return this.isModelLoaded;
    }

    public get isRunningInference() {
        return this._isRunningInference;
    }
}
