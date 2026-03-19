"use client";

import React from "react";
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

type Topic = {
    id: number;
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

const suggestedTopics: Topic[] = [
    {
        id: 1,
        title: "Human-Computer Interaction for Learning Platforms",
        description:
            "Design and evaluate interactive features that improve engagement, accessibility, and usability in digital study environments.",
        compatibility: 92,
        interestMatch: 90,
        torFit: 94,
        chips: [
            { label: "best overall fit", color: "success", variant: "flat" },
            { label: "strong transcript fit", color: "primary", variant: "flat" },
            { label: "matches your interests", color: "secondary", variant: "flat" },
        ],
    },
    {
        id: 2,
        title: "AI-Based Recommendation System for Thesis Topics",
        description:
            "Build a recommendation engine that maps transcript performance and interests to suitable research directions.",
        compatibility: 87,
        interestMatch: 96,
        torFit: 78,
        chips: [
            { label: "best interest match", color: "secondary", variant: "flat" },
            { label: "innovation potential", color: "warning", variant: "flat" },
        ],
    },
    {
        id: 3,
        title: "Web Platform for Industry–Student Thesis Matching",
        description:
            "Create a platform that connects students, supervisors, and companies around thesis opportunities.",
        compatibility: 84,
        interestMatch: 85,
        torFit: 83,
        chips: [
            { label: "balanced fit", color: "success", variant: "flat" },
            { label: "practical impact", color: "warning", variant: "flat" },
        ],
    },
    {
        id: 4,
        title: "Learning Analytics Dashboard for Student Progress",
        description:
            "Build dashboards that surface useful learning insights for universities using student data.",
        compatibility: 79,
        interestMatch: 74,
        torFit: 85,
        chips: [
            { label: "strong transcript alignment", color: "primary", variant: "flat" },
            { label: "data-driven topic", color: "secondary", variant: "flat" },
        ],
    },
];


function scoreTone(score: number) {
    if (score >= 85) {
        return { label: "excellent fit", color: "success" as const };
    }
    if (score >= 70) {
        return { label: "strong fit", color: "primary" as const };
    }
    if (score >= 55) {
        return { label: "moderate fit", color: "warning" as const };
    }
    return { label: "lower fit", color: "danger" as const };
}

function TopicCard({ topic }: { topic: Topic }) {
    const tone = scoreTone(topic.compatibility);

    return (
        <Card className="rounded-3xl border border-default-200 bg-background/80 shadow-sm transition-transform hover:-translate-y-0.5">
            <CardBody className="p-4">
                <div className="flex gap-3">
                    <div className="shrink-0">
                        <CircleChart
                            pro={topic.compatibility}
                            contra={Math.max(0, 100 - topic.compatibility)}
                            size={56}
                        />
                    </div>

                    <div className="min-w-0 flex-1 space-y-3">
                        <div className="space-y-1">
                            <div className="flex items-start gap-2">
                                <h3 className="min-w-0 flex-1 text-sm font-semibold leading-5 md:text-base">
                                    {topic.title}
                                </h3>
                                <Chip className="shrink-0" color={tone.color} size="sm" variant="flat">
                                    {tone.label}
                                </Chip>
                            </div>

                            <p className="text-xs leading-5 text-default-500 md:text-sm">
                                {topic.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {topic.chips.map((chip, index) => (
                                <Chip
                                    key={`${topic.id}-${chip.label}-${index}`}
                                    color={chip.color}
                                    size="sm"
                                    variant={chip.variant ?? "flat"}
                                >
                                    {chip.label}
                                </Chip>
                            ))}
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="rounded-2xl bg-default-100 px-3 py-2 text-center">
                                <p className="text-[10px] uppercase tracking-wide text-default-500">fit</p>
                                <p className="mt-1 text-sm font-semibold">{topic.compatibility}%</p>
                            </div>
                            <div className="rounded-2xl bg-default-100 px-3 py-2 text-center">
                                <p className="text-[10px] uppercase tracking-wide text-default-500">interests</p>
                                <p className="mt-1 text-sm font-semibold">{topic.interestMatch}%</p>
                            </div>
                            <div className="rounded-2xl bg-default-100 px-3 py-2 text-center">
                                <p className="text-[10px] uppercase tracking-wide text-default-500">tor</p>
                                <p className="mt-1 text-sm font-semibold">{topic.torFit}%</p>
                            </div>
                        </div>

                        <Button
                            className="w-full justify-between rounded-2xl"
                            color="default"
                            endContent={<Icon icon="solar:arrow-right-linear" width={16} />}
                            variant="flat"
                        >
                            Select topic
                        </Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default function ChatbotTheme() {

    return (
        <div className="min-h-screen bg-default-50">
            <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 py-4 lg:px-6 lg:py-6">
                <div className="flex min-w-0 flex-1 flex-col">
                    <Chatbot/>
                 </div>

                <aside className="hidden w-[390px] shrink-0 xl:block">
                    <Card className="sticky top-6 rounded-[2rem] border border-default-200 bg-background/90 shadow-xl">
                        <CardHeader className="flex flex-col items-start gap-2 px-5 py-5">
                            <div className="flex w-full items-center justify-between gap-3">
                                <div>
                                    <h2 className="text-lg font-semibold">Suggested topics</h2>
                                    <p className="text-sm text-default-500">
                                        Ranked from interests and transcript fit
                                    </p>
                                </div>
                                <Chip color="primary" variant="flat">4 matches</Chip>
                            </div>
                        </CardHeader>

                        <Divider />

                        <CardBody className="max-h-[calc(100vh-8rem)] gap-4 overflow-y-auto px-4 py-4">
                            {suggestedTopics.map((topic) => (
                                <TopicCard key={topic.id} topic={topic} />
                            ))}
                        </CardBody>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
