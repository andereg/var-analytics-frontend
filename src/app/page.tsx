"use client";

import React from "react";
import RowSteps from "@/components/steppers/row-steps";
import ThesisForm from "@/components/studyond/ThesisForm";
import ThesisDashboard from "@/components/studyond/ThesisDashboard";
import HomeClient from "@/components/meta/HomeClient";
import ChatbotTheme from "@/components/studyond/ChatbotTheme";
import TORAnalysis from "@/components/studyond/TORAnalysis";
import RecommendedTopics from "@/components/studyond/RecommendedThemes";
import RecommendedExperts from "@/components/studyond/RecommendedExperts";
import ProgressModal from "@/components/charts/ProgressModal";
import MyTopic  from "@/components/studyond/MyTopic";

const stepsContent = [
    <ThesisForm/>,
    <ChatbotTheme/>,
    <TORAnalysis />,
    <RecommendedTopics />,
    <ThesisDashboard />,
    <MyTopic onFindTopic={function(): void {
        throw new Error("Function not implemented.");
    } } />,
    <RecommendedExperts />,
];


export default function Home() {
    const [step, setStep] = React.useState(4);

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