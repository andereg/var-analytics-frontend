"use client";

import React from "react";
import { Progress } from "@heroui/react";

export default function ProgressModal({ progress = 50 }) {
    return (
        <div className="pointer-events-none fixed bottom-4 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 px-4">
            <div className="pointer-events-auto rounded-2xl border border-default-200 p-4 shadow-lg backdrop-blur-md">

                {/* header */}
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-default-600">Form completion</span>
                    <span className="font-semibold text-default-600">{progress}%</span>
                </div>

                {/* progress bar */}
                <Progress
                    aria-label="progress"
                    value={progress}
                    size="sm"
                    classNames={{
                        track: "rounded-full bg-default-100",
                        indicator: "bg-gradient-to-r from-purple-500 via-blue-500 to-green-400",
                    }}
                />
            </div>
        </div>
    );
}