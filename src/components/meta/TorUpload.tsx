"use client";

import React from "react";
import { Upload } from "lucide-react";

export default function TorUpload() {
    const [fileName, setFileName] = React.useState("");

    return (
        <div className="w-full">
            <input
                id="tor-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    setFileName(file ? file.name : "");
                }}
            />

            <label
                htmlFor="tor-upload"
                className="flex min-h-[220px] w-full cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-default-300 px-6 py-10 text-center transition hover:border-primary hover:bg-primary/5"
            >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-sm">
                    <Upload className="h-6 w-6 text-default-500" />
                </div>

                <h3 className="text-sm font-semibold">Drop Transcripts of Records (TOR) here</h3>
                <p className="mt-2 text-sm text-default-500">
                    or click to browse files
                </p>
                <p className="mt-1 text-xs text-default-400">
                    PDF, DOC, DOCX
                </p>

                {fileName && (
                    <div className="mt-5 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        {fileName}
                    </div>
                )}
            </label>
        </div>
    );
}