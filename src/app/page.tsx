"use client";
import React, {useState} from "react";
import RowSteps from "@/components/steppers/row-steps";
import ThesisForm from "@/components/studyond/ThesisForm";
import ThesisDashboard from "@/components/studyond/ThesisDashboard";
import ChatbotTheme from "@/components/studyond/ChatbotTheme";
import Sidebar from "@/components/studyond/Sidebar";
import ChatbotCompany from "@/components/studyond/ChatbotCompany";
import MyTopic from "@/components/studyond/MyTopic";


export default function Home() {
    const [step, setStep] = React.useState<number>(1);
    const [topicDashboard, setTopicDashboard] = useState(true)


    const [searchTopic, setSearchTopic] = React.useState(false);
    const [hasTopic, setHasTopic] = React.useState(false);

    const stepsContent = [
        <ThesisForm/>,
        <ChatbotTheme selectTopic={() => {
            setTopicDashboard(true)
            setHasTopic(true)
        }}/>,
        <ChatbotCompany selectCompany={() => setTopicDashboard(true)}/>,
        <ThesisDashboard/>,
    ];

    return (

        <div className="min-h-screen bg-stone-100 flex">

            <div>
                <Sidebar/>
            </div>

            <div className="flex flex-col  items-center flex-1 p-6">


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
                            {
                                title: "Start",
                            },
                            {
                                title: "Choose Topic",
                            },
                            {
                                title: "Choose Supervisor",
                            },
                            {
                                title: "Planning",
                            },
                            {
                                title: "Execution",
                            },
                            {
                                title: "Writing",
                            },
                            {
                                title: "Submission",
                            }
                        ]}
                    />
                </div>


                {
                    (step == 1 || step == 2) && topicDashboard ?
                        <MyTopic onFindTopic={() => setTopicDashboard(false)} hasFoundTopic={hasTopic}
                                 selectSupervisor={() => {
                                     setStep(step + 1)
                                     setTopicDashboard(false)
                                 }}
                                 onDefiniteTopicSelect={() => setStep(step + 1)}
                                 hasSupervisor={step == 2 && topicDashboard}
                        /> : stepsContent[step]
                }




                {/*{step == 1 && searchTopic ?*/}
                {/*    stepsContent[step]*/}
                {/*    :*/}
                {/*    step == 1 ?*/}

                {/*        <MyTopic onFindTopic={() => setSearchTopic(true)} hasFoundTopic={hasTopic}*/}
                {/*                 onDefiniteTopicSelect={() => setStep(step + 1)}*/}
                {/*        /> : ''*/}

                {/*}*/}
                {/*{step != 1 ? stepsContent[step] : ''}*/}
                {/*<LandingPage/>*/}
            </div>

        </div>
    );
}
