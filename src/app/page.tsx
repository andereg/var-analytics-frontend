"use client";
import React, { useState } from "react";
import RowSteps from "@/components/steppers/row-steps";
import Sidebar from "@/components/studyond/Sidebar";
import LandingPage from "@/components/studyond/LandingPage";
import PersonalDataForm from "@/components/taxme/PersonalDataForm";
import IncomeForm from "@/components/taxme/IncomeForm";
import WealthForm from "@/components/taxme/WealthForm";
import DeductionsForm from "@/components/taxme/DeductionsForm";
import SpecialCasesForm from "@/components/taxme/SpecialCasesForm";
import DocumentsReviewForm from "@/components/taxme/DocumentsReviewForm";
import FinalSummaryPage from "@/components/taxme/FinalSummaryPage";

export default function Home() {
    return <div>home works live</div>;
}

export  function Home2() {
    const [step, setStep] = useState<number>(99);

    const stepsContent = [
        <PersonalDataForm onContinue={() => setStep(1)} />,
        <IncomeForm onContinue={() => setStep(2)} />,
        <WealthForm onContinue={() => setStep(3)} />,
        <DeductionsForm onContinue={() => setStep(4)} />,
        <SpecialCasesForm onContinue={() => setStep(5)} />,
        <DocumentsReviewForm onContinue={() => setStep(6)} />,
        <FinalSummaryPage />,
    ];

    // ✅ show landing page first
    if (step === 99) {
        return <LandingPage onStart={() => setStep(0)} />;
    }

    // ✅ otherwise show main app
    return (
        <div className="min-h-screen flex bg-white">
            <Sidebar />

            <div className="flex flex-col items-center flex-1 p-6">

                    <div className="flex items-center justify-center">
                        <RowSteps
                            currentStep={step}
                            onStepChange={setStep}
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
                {stepsContent[step]}
            </div>
        </div>
    );
}