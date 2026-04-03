// app/taxme/layout.tsx
"use client";

import React from "react";
import Sidebar from "@/components/studyond/Sidebar";
import RowSteps from "@/components/steppers/row-steps";
import { usePathname, useRouter } from "next/navigation";
import AlpengrunHeader from "@/components/taxme/alpengrün-header";

const stepRoutes = [
    "/taxform/personal-data",
    "/taxform/income",
    "/taxform/wealth",
    "/taxform/deductions",
    "/taxform/special-cases",
    "/taxform/documents-review",
    "/taxform/final-summary",
    "/taxform/submission-success",
];

export default function TaxmeLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const pathname = usePathname();

    const currentStep = stepRoutes.indexOf(pathname);

    return (
        <div className="min-h-screen flex bg-white">
            <div className="flex flex-col items-center flex-1">
                <AlpengrunHeader />
                <div className="flex items-center justify-center mb-2 pt-4">
                    <RowSteps
                        currentStep={Math.max(currentStep, 0)}
                        onStepChange={(index) => router.push(stepRoutes[index])}
                        className="
              [--active-color:black]
              [--active-border-color:black]
              [--active-fg-color:white]
              [--complete-background-color:black]
              [--complete-border-color:black]
            "
                        steps={[
                            { title: "Persönliche Daten" },
                            { title: "Inkommen" },
                            { title: "Vermögen" },
                            { title: "Abzüge" },
                            { title: "Verschiedenes" },
                            { title: "Finalisation" },
                            { title: "Überprüfung" },
                        ]}
                    />
                </div>

                { /*route dependant */}
                {children}
            </div>
        </div>
    );
}