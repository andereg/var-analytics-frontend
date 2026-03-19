"use client";

import React, { useState, useEffect } from "react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    ScrollShadow,
    Tooltip,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { cn } from "@heroui/react";

import CircleChart from "@/components/charts/CircleChart";
import PromptInput from "@/components/meta/PromptInput";
import Chatbot from "@/components/meta/Chatbot";
import allTopics from "@/mock-data/topics.json";
import { useTopics } from "@/context/TopicContext";

type Topic = {
    id: string;
    title: string;
    description: string;
    compatibility: number;
    interestMatch: number;
    torFit: number;
    chips: Array<{
        label: string;
        color:
            | "default"
            | "primary"
            | "secondary"
            | "success"
            | "warning"
            | "danger";
        variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot";
    }>;
};

const INITIAL_TOPICS: Topic[] = [
    {
        id: "topic-01",
        title: "AI-Driven Demand Forecasting for Perishable Goods",
        description:
            "Develop a machine learning model to predict demand for short-shelf-life products across Nestle's European distribution network.",
        compatibility: 92,
        interestMatch: 90,
        torFit: 94,
        chips: [
            { label: "best overall fit", color: "success", variant: "flat" },
        ],
    },
    {
        id: "topic-03",
        title: "Biomarker Discovery Using Multi-Omics Data Integration",
        description:
            "Apply computational biology methods to integrate transcriptomic, proteomic, and metabolomic datasets for identifying novel biomarkers.",
        compatibility: 87,
        interestMatch: 96,
        torFit: 78,
        chips: [
            { label: "best interest match", color: "secondary", variant: "flat" },
        ],
    },
];


interface MyTopicProps {
    topic: Topic;
    selectTopic?: () => void;
}

function TopicCard({ topic, selectTopic = () => {} }: MyTopicProps) {
    return (
        <Card className="h-auto overflow-visible rounded-3xl border border-default-200 shadow-sm">
            <CardBody className="h-auto overflow-visible p-4">
                <div className="flex gap-3">
                    <div className="min-w-0 space-y-3">
                        <div className="space-y-1">
                            <div className="flex items-center gap-3">
                                <div className="shrink-0">
                                    <CircleChart
                                        pro={topic.compatibility}
                                        contra={Math.max(0, 100 - topic.compatibility)}
                                        size={25}
                                    />
                                </div>

                                <h3 className="min-w-0 font-semibold leading-5 md:text-base">
                                    {topic.title}
                                </h3>
                            </div>

                            <p className="break-words text-xs leading-5 text-default-500 md:text-sm">
                                {topic.description}
                            </p>
                        </div>

                        <Button
                            className="w-full justify-between rounded-2xl"
                            color="default"
                            endContent={<Icon icon="solar:arrow-right-linear" width={16} />}
                            variant="flat"
                            onClick={() => selectTopic()}
                        >
                            Select topic
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
interface ChatbotThemeProps {
    selectTopic?: () => void;
}

export default function ChatbotTheme(props: ChatbotThemeProps) {
    const [suggestedTopics, setSuggestedTopics] = useState<Topic[]>(INITIAL_TOPICS);
    const { addTopic } = useTopics();

    const handleTopicsRecommended = (topicIds: string[]) => {
        // Filter allTopics by IDs and map to our UI Topic format
        const matches = allTopics.filter(t => topicIds.includes(t.id));
        const mapped = matches.map(t => ({
            id: t.id,
            title: t.title,
            description: t.description,
            compatibility: 70 + Math.floor(Math.random() * 25), // Mock scores
            interestMatch: 70 + Math.floor(Math.random() * 25),
            torFit: 70 + Math.floor(Math.random() * 25),
            chips: [
                { label: "AI recommendation", color: "primary" as const, variant: "flat" as const }
            ]
        }));
        
        if (mapped.length > 0) {
            setSuggestedTopics(mapped);
        }
    };

    return (
        <div className="min-h-screen">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl gap-6 px-4 py-4 lg:px-6 lg:py-6">
                <div className="flex min-w-0 flex-1 flex-col">
                    <Chatbot
                        showChips={true}
                        showTopics={true}
                        onTopicsRecommended={handleTopicsRecommended}
                    />
                </div>

                <aside className="hidden w-[390px] shrink-0 xl:block">
                    <Card
                        className="sticky top-6 flex max-h-[calc(100vh-3rem)] flex-col overflow-hidden rounded-[2rem] border border-default-200 shadow-xl">
                        <CardHeader className="flex shrink-0 flex-col items-start gap-2 px-5 py-5">
                            <div className="flex w-full items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold">Suggested topics</h2>
                                    <p className="text-sm text-default-500">
                                        Ranked from interests and TOR
                                    </p>
                                </div>
                                <Chip color="secondary" variant="flat">{suggestedTopics.length} matches</Chip>
                            </div>
                        </CardHeader>

                        <Divider className="shrink-0"/>

                        <CardBody className="min-h-0 flex-1 overflow-hidden p-0">
                            <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                                <div className="space-y-4">
                                    {suggestedTopics.map((topic) => (
                                        <TopicCard key={topic.id} topic={topic} selectTopic={() => {
                                            addTopic(topic.id);
                                            props.selectTopic?.();
                                        }}/>
                                    ))}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
