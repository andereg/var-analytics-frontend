"use client";

import React, { useState } from "react";
import { Upload, Loader2, CheckCircle2 } from "lucide-react";
import { analyzeTORAction } from "@/app/actions/analyze-tor";
import { useTOR, TORAnalysisData } from "@/context/TORContext";

export default function TorUpload() {
    const [fileName, setFileName] = useState("");
    const { setAnalysis, isAnalyzing, setIsAnalyzing } = useTOR();
    const [isComplete, setIsComplete] = useState(false);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        setIsAnalyzing(true);
        setIsComplete(false);

        try {
            const text = await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (event) => resolve(event.target?.result as string || "");
                reader.onerror = (error) => reject(error);
                reader.readAsText(file);
            });
            
            // Call the AI Server Action
            const result = await analyzeTORAction(text || "Sample TOR Content: Advanced Math 6.0, ML 5.5, DB 4.0");
            
            if (result.success && result.data) {
                setAnalysis(result.data as TORAnalysisData);
                setIsComplete(true);
            } else {
                console.error("Analysis failed:", result.error);
                // Optionally show a toast or error message to the user here
            }
        } catch (error) {
            console.error("Upload error:", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="w-full">
            <input
                id="tor-upload"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                disabled={isAnalyzing}
                onChange={handleFileChange}
            />

            <label
                htmlFor="tor-upload"
                className={`flex min-h-[220px] w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed px-6 py-10 text-center transition ${
                    isAnalyzing 
                    ? "border-primary/50 bg-primary/5 cursor-wait" 
                    : isComplete
                    ? "border-success/50 bg-success/5 hover:border-success"
                    : "border-default-300 hover:border-primary hover:bg-primary/5"
                }`}
            >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-sm ${
                    isAnalyzing ? "animate-pulse" : ""
                }`}>
                    {isAnalyzing ? (
                        <Loader2 className="h-6 w-6 text-primary animate-spin" />
                    ) : isComplete ? (
                        <CheckCircle2 className="h-6 w-6 text-success" />
                    ) : (
                        <Upload className="h-6 w-6 text-default-500" />
                    )}
                </div>

                <h3 className="text-sm font-semibold">
                    {isAnalyzing ? "AI analyzing your transcript..." : isComplete ? "Analysis complete!" : "Drop TOR here"}
                </h3>
                <p className="mt-2 text-sm text-default-500">
                    {isAnalyzing ? "We're mapping your skills to thesis topics." : "or click to browse files"}
                </p>

                {fileName && (
                    <div className={`mt-5 rounded-full px-4 py-2 text-sm font-medium ${
                        isComplete ? "bg-success/10 text-success" : "bg-primary/10 text-primary"
                    }`}>
                        {fileName}
                    </div>
                )}
            </label>
        </div>
    );
}