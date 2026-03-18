"use client";
import FeaturesCards from "@/components/meta/features-cards";
import React from "react";
import RowSteps from "@/components/steppers/row-steps";
import ThesisForm from "@/components/studyond/ThesisForm";
import HomeClient from "@/components/meta/HomeClient";
import TORAnalysis from "@/components/studyond/TORAnalysis";
import RecommendedTopics from "@/components/studyond/RecommendedThemes";
import RecommendedExperts from "@/components/studyond/RecommendedExperts";

const stepsContent = [
    <ThesisForm/>,
    <TORAnalysis />,
    <RecommendedTopics />,
    <RecommendedExperts />
];


export default function Home() {
    const [step, setStep] = React.useState(0);

    return (

        <div className="min-h-screen bg-stone-100 p-6">
            <div className="flex items-center justify-center">

                <RowSteps
                    defaultStep={0}
                    currentStep={step}
                    onStepChange={setStep}
                    steps={[
                        {
                            title: "Start",
                        },
                        {
                            title: "Information",
                        },
                        {
                            title: "Topic",
                        },
                        {
                            title: "Resources",
                        },
                        {
                            title: "Planning",
                        },
                        {
                            title: "Execution",
                        },
                        {
                            title: "Writing",
                        }
                    ]}
                />
            </div>
            {stepsContent[step]}
        </div>
    );
}
