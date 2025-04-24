import React, {MutableRefObject} from "react";
import "../../styles/pages/ml-features.css"

interface MLFeaturesViewProps {
    fileInputRef: MutableRefObject<HTMLInputElement | null>,
    handleFileInputChange: () => void,
    selectedFileName: string,
    manualText: string,
    setManualText: (manualText: string) => void,
    handleServerOcr: () => void,
    handleServerSummarize: () => void,
    handleServerOcrAndSummarize: () => void,
    handleLocalOcr: () => void,
    handleLocalSummarize: () => void,
    handleLocalOcrAndSummarize: () => void,
    recognizedText: string[],
    summaryText: string,
    combinedResult: string,
    localOcrText: string[],
    localSummaryText: string,
    localCombinedText: string
}

export const MLFeaturesView = (props: MLFeaturesViewProps) => {
    const {
        fileInputRef,
        handleFileInputChange,
        selectedFileName,
        manualText,
        setManualText,
        handleServerOcr,
        handleServerSummarize,
        handleServerOcrAndSummarize,
        handleLocalOcr,
        handleLocalSummarize,
        handleLocalOcrAndSummarize,
        recognizedText,
        summaryText,
        combinedResult,
        localOcrText,
        localSummaryText,
        localCombinedText,
    } = props;

    return (
        <div className="ai-models-page container-fluid">
            {/* Title Row */}
            <div className="row justify-content-center">
                <div className="col-12 text-center">
                    <h2 className="page-title mb-4">AI Models Integration</h2>
                </div>
            </div>

            {/* File input and summarization text box */}
            <div className="row justify-content-center mb-4 file-input-row">
                <div className="col-md-6 col-sm-12 d-flex align-items-center justify-content-center file-input-col">
                    <label htmlFor="imageUpload" className="file-input-label me-2">
                        Choose an image
                    </label>
                    <input
                        id="imageUpload"
                        type="file"
                        ref={fileInputRef}
                        accept="image/*"
                        className="form-control-file"
                        onChange={handleFileInputChange}
                    />

                    {/* Display the selected file name, if any */}
                    {selectedFileName && (
                        <span style={{marginLeft: "1rem", fontWeight: 600}}>Selected: {selectedFileName}</span>
                    )}
                </div>
            </div>
            <div className="row justify-content-center mb-4">
                <div className="col-md-6 col-sm-12">
                    <label htmlFor="manualText" style={{fontWeight: "bold"}}>
                        Enter text to summarize:
                    </label>
                    <textarea
                        id="manualText"
                        className="form-control"
                        rows={3}
                        value={manualText}
                        onChange={(e) => setManualText(e.target.value)}
                        placeholder="Type or paste text here..."
                    />
                </div>
            </div>

            {/* Server Card */}
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card mb-4 feature-card">
                        <div className="card-header">
                            <h3 className="section-heading mb-0">1. Server (ASP.NET) Integration</h3>
                        </div>
                        <div className="card-body">
                            <div className="button-row mb-3 d-flex flex-row justify-content-around">
                                <button
                                    className="btn btn-success"
                                    onClick={handleServerOcr}
                                >
                                    OCR (Server)
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={handleServerSummarize}
                                >
                                    Summarize (Server)
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={handleServerOcrAndSummarize}
                                >
                                    OCR + Summarize (Server)
                                </button>
                            </div>

                            {/* Results */}
                            <div className="results-container">
                                {recognizedText.length > 0 && (
                                    <div className="result-box">
                                        <h4 className="result-box-title">Server OCR result:</h4>
                                        <pre className="result-box-content">{recognizedText.join("\n")}</pre>
                                    </div>
                                )}
                                {summaryText && (
                                    <div className="result-box">
                                        <h4 className="result-box-title">Server Summarization result:</h4>
                                        <pre className="result-box-content">{summaryText}</pre>
                                    </div>
                                )}
                                {combinedResult && (
                                    <div className="result-box">
                                        <h4 className="result-box-title">Server OCR+Summarization combined result:</h4>
                                        <pre className="result-box-content">{combinedResult}</pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Local Card */}
            <div className="row justify-content-center">
                <div className="col-md-10">
                    <div className="card feature-card">
                        <div className="card-header">
                            <h3 className="section-heading mb-0">2. Local (Browser) Integration</h3>
                        </div>
                        <div className="card-body">
                            <div className="button-row mb-3 d-flex flex-row justify-content-around">
                                <button
                                    className="btn btn-success"
                                    onClick={handleLocalOcr}
                                >
                                    OCR (Local)
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={handleLocalSummarize}
                                >
                                    Summarize (Local)
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={handleLocalOcrAndSummarize}
                                >
                                    OCR + Summarize (Local)
                                </button>
                            </div>

                            {/* Results */}
                            <div className="results-container">
                                {localOcrText.length > 0 && (
                                    <div className="result-box">
                                        <h4 className="result-box-title">Local OCR result:</h4>
                                        <pre className="result-box-content">{localOcrText.join("\n")}</pre>
                                    </div>
                                )}
                                {localSummaryText && (
                                    <div className="result-box">
                                        <h4 className="result-box-title">Local Summarization result:</h4>
                                        <pre className="result-box-content">{localSummaryText}</pre>
                                    </div>
                                )}
                                {localCombinedText && (
                                    <div className="result-box">
                                        <h4 className="result-box-title">
                                            Local OCR+Summarization combined result:
                                        </h4>
                                        <pre className="result-box-content">{localCombinedText}</pre>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
