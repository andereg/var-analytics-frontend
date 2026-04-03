// app/page.tsx oder components/Dashboard.tsx
"use client";

import React from "react";
import Homepage from "@/components/taxme/Homepage";
import AlpengrunHeader from "@/components/taxme/alpengrün-header";


type LandingPageProps = {
    onStart: () => void;
};

export default function LandingPage({ onStart }: LandingPageProps) {
    return (
        <div className="flex min-h-screen w-full bg-white">

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <AlpengrunHeader />
                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <Homepage/>
                </main>
            </div>
        </div>
    );
}