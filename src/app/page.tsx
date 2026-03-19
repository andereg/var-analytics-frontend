"use client";

import React from "react";
import RowSteps from "@/components/steppers/row-steps";
import ThesisForm from "@/components/studyond/ThesisForm";
import ChatbotTheme from "@/components/studyond/ChatbotTheme";
import TORAnalysis from "@/components/studyond/TORAnalysis";
import RecommendedTopics from "@/components/studyond/RecommendedThemes";
import RecommendedExperts from "@/components/studyond/RecommendedExperts";
import { MyTopic } from "@/components/studyond/MyTopic";

export default function Home() {
    const [step, setStep] = React.useState(0);

    // Make sure this array has exactly 7 items to match your RowSteps array
    const stepsContent = [
        <ThesisForm key="step-0" />,
        <ChatbotTheme key="step-1" />,
        <TORAnalysis key="step-2" />,
        <RecommendedTopics key="step-3" />,
        <RecommendedExperts key="step-4" />,
        <MyTopic key="step-5" onFindTopic={() => setStep(0)} />,
        <div key="step-6" className="p-4 text-center">Writing Step Placeholder</div>
    ];

    return (
        <div className="min-h-screen bg-stone-100 p-6">
            <div className="flex items-center justify-center">
                <RowSteps
                    defaultStep={0}
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
                        { title: "Start" },
                        { title: "Information" },
                        { title: "Topic" },
                        { title: "Resources" },
                        { title: "Planning" },
                        { title: "Execution" },
                        { title: "Writing" }
                    ]}
                />
            </div>

            <div className="mt-8">
                {stepsContent[step]}
            </div>
        </div>
    );
}