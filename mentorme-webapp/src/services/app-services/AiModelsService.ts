import { BaseService } from "../base-services/BaseService";
import { HostURLs } from "../../types/strings/HostURLs";

const enum ServiceEndpoints {
    OCR = "OCR",
    SUMMARIZATION = "Summarization",
    COMBINED = "Combined",
}
export class AiModelsService extends BaseService {
    constructor() {
        super(HostURLs.AI_MODELS_CONTROLLER);
    }
    
    async callOcrOnServer(imageBlob: Blob): Promise<string[] | undefined> {
        try {
            // Build form data, if your endpoint expects a file upload
            const formData = new FormData();
            formData.append("file", imageBlob);

            const response = await this.axios.post<string[]>(ServiceEndpoints.OCR, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                console.log(response.data);
                return response.data;
            }
        } catch (error) {
            console.error("Error calling server-side OCR endpoint:", error);
        }
        return undefined;
    }
    
    async callSummarizeOnServer(text: string): Promise<string | undefined> {
        try {
            const response = await this.axios.post<string>(ServiceEndpoints.SUMMARIZATION, { text });
            if (response.status === 200) {
                console.log(response.data);
                return response.data;
            }
        } catch (error) {
            console.error("Error calling server-side Summarization endpoint:", error);
        }
        return undefined;
    }
    
    async callOcrAndSummarizeOnServer(imageBlob: Blob): Promise<string | undefined> {
        try {
            const formData = new FormData();
            formData.append("file", imageBlob);

            const response = await this.axios.post<string>(ServiceEndpoints.COMBINED, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                console.log(response.data);
                return response.data;
            }
        } catch (error) {
            console.error("Error calling combined server-side endpoint:", error);
        }
        return undefined;
    }
}
