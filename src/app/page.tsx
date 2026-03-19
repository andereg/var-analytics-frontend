"use client";
import React, { useState } from "react";
import RowSteps from "@/components/steppers/row-steps";
import ThesisForm from "@/components/studyond/ThesisForm";
import ThesisDashboard from "@/components/studyond/ThesisDashboard";
import ChatbotTheme from "@/components/studyond/ChatbotTheme";
import Sidebar from "@/components/studyond/Sidebar";
import ChatbotCompany from "@/components/studyond/ChatbotCompany";
import MyTopic from "@/components/studyond/MyTopic";
import ExecutionDashboard from "@/components/studyond/ExecutionDashboard";
import SubmissionDashboard from "@/components/studyond/SubmissionDashboard";
import LandingPage from "@/components/studyond/LandingPage";

export default function Home() {
    const [step, setStep] = useState<number>(99);
    const [topicDashboard, setTopicDashboard] = useState(true);

    const [searchTopic, setSearchTopic] = useState(false);
    const [hasTopic, setHasTopic] = useState(false);

    const stepsContent = [
        <ThesisForm onContinue={() => setStep(1)} />,
        <ChatbotTheme
            selectTopic={() => {
                setTopicDashboard(true);
                setHasTopic(true);
            }}
        />,
        <ChatbotCompany
            key={`step-2-${topicDashboard}`}
            selectCompany={() => setTopicDashboard(true)}
            initialMessage="I've analyzed your selected topic. Let's find the best industry partner and academic supervisor for it!"
        />,
        <ThesisDashboard key="step-3" />,
        <ExecutionDashboard key="step-4" />,
        <SubmissionDashboard key="step-5" />,
    ];

    // ✅ show landing page first
    if (step === 99) {
        return <LandingPage onStart={() => setStep(0)} />;
    }

    // ✅ otherwise show main app
    return (
        <div className="min-h-screen bg-stone-100 flex">
            <Sidebar />

            <div className="flex flex-col items-center flex-1 p-6">

                {step !== 0 && (
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
                                { title: "Start" },
                                { title: "Choose Topic" },
                                { title: "Choose Company" },
                                { title: "Planning" },
                                { title: "Execution" },
                                { title: "Finalization" },
                            ]}
                        />
                    </div>
                )}

                {
                    (step === 1 || step === 2) && topicDashboard ? (
                        <MyTopic
                            onFindTopic={() => {
                                setStep(1);
                                setTopicDashboard(false);
                            }}
                            hasFoundTopic={hasTopic}
                            selectSupervisor={() => {
                                if (step === 1) setStep(2);
                                setTopicDashboard(false);
                            }}
                            onDefiniteTopicSelect={() => setStep(step + 1)}
                            hasSupervisor={step === 2 && topicDashboard}
                        />
                    ) : (
                        stepsContent[step]
                    )
                }
            </div>
        </div>
    );
}