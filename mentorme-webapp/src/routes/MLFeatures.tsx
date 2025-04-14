import React, { useState, useRef, useMemo, useEffect, useCallback } from "react";
import { AiModelsService } from "../services/app-services/AiModelsService";
import { MLFeaturesView } from "./route-views/MLFeaturesView";
import LocalOcrModelService from "../services/ml/LocalOcrModelService";
import LocalSummarizerModelService from "../services/ml/LocalSummarizerModelService";
import { Loader } from "../components/layout/Loader";

/**
 * The main container component for AI feature demos.
 * It loads local (TFJS) models, provides server calls, etc.
 */
export const MLFeatures = () => {
    // --- State Management ---
    const [isLoadingModels, setIsLoadingModels] = useState(true);
    const [isLocalInferenceRunning, setIsLocalInferenceRunning] = useState(false);

    // Outputs for server-based calls
    const [recognizedText, setRecognizedText] = useState<string[]>([]);
    const [summaryText, setSummaryText] = useState<string>("");
    const [combinedResult, setCombinedResult] = useState<string>("");

    // Outputs for local-based calls
    const [localOcrText, setLocalOcrText] = useState<string[]>([]);
    const [localSummaryText, setLocalSummaryText] = useState<string>("");
    const [localCombinedText, setLocalCombinedText] = useState<string>("");

    // Store the selected file name so we can display it next to the input
    const [selectedFileName, setSelectedFileName] = useState<string>("");

    // Store manual text for the Summarizer here
    const [manualText, setManualText] = useState<string>("");

    // Paths to the TFJS models
    const localOCRModelPath = "./ml-models/ocr/model.json";
    const localSummarizationModelPath = `./ml-models/summarization/model.json`;
    const localSummarizationTokenizerPath = `./ml-models/summarization/tokenizer/tokenizer.json`;

    // Create an instance of the server-based AI service
    const aiApiService = useMemo(() => new AiModelsService(), []);

    // File input ref so we can read the user’s image
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Load OCR and Summarizer models (TFJS) on mount
    const loadAllModels = useCallback(async () => {
        try {
            // 1) Load local OCR
            await LocalOcrModelService.loadModel([localOCRModelPath]);

            // 2) Load local Summarizer model + tokenizer
            await LocalSummarizerModelService.loadModel([localSummarizationModelPath, localSummarizationTokenizerPath]);
        } catch (error) {
            console.error("Error loading local models:", error);
        } finally {
            setIsLoadingModels(false);
        }
    }, [localOCRModelPath, localSummarizationModelPath, localSummarizationTokenizerPath]);

    // Trigger loading once on mount
    useEffect(() => {
        loadAllModels().catch(err => {
            console.error("Error occurred when loading models", err);
        });
    }, [loadAllModels]);

    // Handle the changes the file input
    const handleFileInputChange = () => {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            setSelectedFileName(file.name);
        } else {
            setSelectedFileName("");
        }
    };

    // ===========================
    //          SERVER CALLS
    // ===========================
    const handleServerOcr = async () => {
        resetServerOutputs();
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            alert("Please select an image first.");
            return;
        }

        const result = await aiApiService.callOcrOnServer(file);
        if (result) {
            setRecognizedText(result);
        }
    };

    const handleServerSummarize = async () => {
        resetServerOutputs();
        const textToSummarize = recognizedText.length
            ? recognizedText.join(" ")
            : "No recognized text yet, but let's pretend we have some text here.";

        const result = await aiApiService.callSummarizeOnServer(textToSummarize);
        if (result) {
            setSummaryText(result);
        }
    };

    const handleServerOcrAndSummarize = async () => {
        resetServerOutputs();
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            alert("Please select an image first.");
            return;
        }
        const result = await aiApiService.callOcrAndSummarizeOnServer(file);
        if (result) {
            setCombinedResult(result);
        }
    };

    // ===========================
    //       LOCAL INFERENCE
    // ===========================
    const handleLocalOcr = async () => {
        resetLocalOutputs();
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            alert("Please select an image first.");
            return;
        }

        try {
            setIsLocalInferenceRunning(true);
            if (!LocalOcrModelService.modelHasLoaded()) {
                alert("OCR model is not loaded yet.");
                return;
            }
            const imageElement = await readImageFileAsImageElement(file);
            const lines = await LocalOcrModelService.extractHandwrittenText(imageElement);
            setLocalOcrText(lines);
        } catch (error) {
            console.error("Error in local OCR:", error);
        } finally {
            setIsLocalInferenceRunning(false);
        }
    };

    const handleLocalSummarize = async () => {
        if (!manualText.trim()) {
            alert("Please enter some text before summarizing");
            return;
        }
        try {
            setIsLocalInferenceRunning(true);
            const summary = await LocalSummarizerModelService.summarizeText(manualText);
            setLocalSummaryText(summary);
        } catch (error) {
            console.error("Error summarizing manual text:", error);
        } finally {
            setIsLocalInferenceRunning(false);
        }
    };

    const handleLocalOcrAndSummarize = async () => {
        resetLocalOutputs();
        const file = fileInputRef.current?.files?.[0];
        if (!file) {
            alert("Please select an image first.");
            return;
        }

        try {
            setIsLocalInferenceRunning(true);
            if (!LocalOcrModelService.modelHasLoaded() || !LocalSummarizerModelService.modelHasLoaded()) {
                alert("Models not yet loaded.");
                return;
            }

            const imageElement = await readImageFileAsImageElement(file);
            const lines = await LocalOcrModelService.extractHandwrittenText(imageElement);

            const combinedText = lines.join(" ");
            const summary = await LocalSummarizerModelService.summarizeText(combinedText);

            setLocalCombinedText(summary);
        } catch (error) {
            console.error("Error in local OCR+Summarize:", error);
        } finally {
            setIsLocalInferenceRunning(false);
        }
    };

    // ===========================
    //       Helper Methods
    // ===========================
    // Reset server-based outputs
    const resetServerOutputs = () => {
        setRecognizedText([]);
        setSummaryText("");
        setCombinedResult("");
    };

    // Reset local-based outputs
    const resetLocalOutputs = () => {
        setLocalOcrText([]);
        setLocalSummaryText("");
        setLocalCombinedText("");
    };

    // Read file into an HTMLImageElement
    const readImageFileAsImageElement = async (file: File): Promise<HTMLImageElement> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = new Image();
                img.onload = () => {
                    resolve(img);
                };
                img.onerror = reject;
                if (ev.target?.result) {
                    img.src = ev.target.result.toString();
                } else {
                    reject("FileReader event has no result");
                }
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    };

    // If loading or running inference, display a Loader
    if (isLoadingModels || isLocalInferenceRunning) {
        return <Loader />;
    }

    // Finally, render the UI with the MLFeaturesView
    return (
        <MLFeaturesView
            fileInputRef={fileInputRef}
            handleFileInputChange={handleFileInputChange}
            selectedFileName={selectedFileName}
            manualText={manualText}
            setManualText={setManualText}
            handleServerOcr={handleServerOcr}
            handleServerSummarize={handleServerSummarize}
            handleServerOcrAndSummarize={handleServerOcrAndSummarize}
            handleLocalOcr={handleLocalOcr}
            handleLocalSummarize={handleLocalSummarize}
            handleLocalOcrAndSummarize={handleLocalOcrAndSummarize}
            recognizedText={recognizedText}
            summaryText={summaryText}
            combinedResult={combinedResult}
            localOcrText={localOcrText}
            localSummaryText={localSummaryText}
            localCombinedText={localCombinedText}
        />
    );
};
