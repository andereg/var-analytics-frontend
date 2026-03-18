import React from "react";
import { Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";
import CircleChart from "@/components/charts/CircleChart";
import { ArrowRight } from "lucide-react";
import {Button} from "@heroui/button";

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

const recommendedTopics: Topic[] = [
    {
        id: 1,
        title: "Human-Computer Interaction for Learning Platforms",
        description:
            "Design and evaluate interactive features that improve engagement, accessibility, and usability in digital study environments.",
        compatibility: 92,
        interestMatch: 90,
        torFit: 94,
        chips: [
            { label: "best overall fit", color: "secondary", variant: "flat" },
            { label: "strong TOR alignment", color: "secondary", variant: "flat" },
            { label: "matches your interests", color: "secondary", variant: "flat" },
        ],
    },
    {
        id: 2,
        title: "AI-Based Recommendation System for Thesis Topics",
        description:
            "Build a recommendation engine that maps transcript performance and stated interests to suitable research directions and projects.",
        compatibility: 87,
        interestMatch: 96,
        torFit: 78,
        chips: [
            { label: "best interest match", color: "secondary", variant: "flat" },
            { label: "good academic foundation", color: "secondary", variant: "flat" },
            { label: "innovation potential", color: "secondary", variant: "flat" },
        ],
    },
    {
        id: 3,
        title: "Web Platform for Industry–Student Thesis Matching",
        description:
            "Create a scalable web application that connects students, supervisors, and companies around thesis opportunities.",
        compatibility: 84,
        interestMatch: 85,
        torFit: 83,
        chips: [
            { label: "balanced fit", color: "secondary", variant: "flat" },
            { label: "practical impact", color: "secondary", variant: "flat" },
            { label: "strong software focus", color: "secondary", variant: "flat" },
        ],
    },
    {
        id: 4,
        title: "Learning Analytics Dashboard for Student Progress",
        description:
            "Analyze student performance data and build dashboards that surface actionable learning insights for universities.",
        compatibility: 79,
        interestMatch: 74,
        torFit: 85,
        chips: [
            { label: "best TOR-based option", color: "secondary", variant: "flat" },
            { label: "data-driven topic", color: "secondary", variant: "flat" },
        ],
    },
    {
        id: 5,
        title: "Database Optimization for Educational Platforms",
        description:
            "Investigate schema design, query performance, and indexing strategies for high-usage student platforms.",
        compatibility: 58,
        interestMatch: 52,
        torFit: 64,
        chips: [
            { label: "possible stretch topic", color: "secondary", variant: "flat" },
            { label: "needs preparation", color: "secondary", variant: "flat" },
        ],
    },
];

function scoreTone(score: number) {
    if (score >= 85) {
        return {
            label: "excellent fit",
            color: "success" as const,
        };
    }

    if (score >= 70) {
        return {
            label: "strong fit",
            color: "primary" as const,
        };
    }

    if (score >= 55) {
        return {
            label: "moderate fit",
            color: "warning" as const,
        };
    }

    return {
        label: "lower fit",
        color: "danger" as const,
    };
}

export default function RecommendedTopics() {
    return (
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-4 py-6 md:px-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                    Recommended thesis topics
                </h2>
                <p className="max-w-3xl text-sm leading-6 text-default-500 md:text-base">
                    These topics are ranked using a combination of your interests and your transcript of records.
                    Each recommendation highlights where the topic aligns best.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {recommendedTopics.map((topic) => {
                    const tone = scoreTone(topic.compatibility);

                    return (
                        <Card
                            key={topic.id}
                            className="relative rounded-3xl border border-default-200 shadow-sm "
                        >
                            <CardBody className="p-4 md:p-5">
                                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="flex min-w-0 flex-1 gap-4 md:gap-5">
                                        <div className="hidden shrink-0 items-center justify-center sm:flex">
                                            <CircleChart
                                                pro={topic.compatibility}
                                                contra={Math.max(0, 100 - topic.compatibility)}
                                                size={50}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1 space-y-3">
                                            <div className="min-w-0 space-y-1">
                                                <div className="flex items-start gap-2">
                                                    <h3 className="min-w-0 flex-1 text-lg font-semibold md:text-xl">
                                                        {topic.title}
                                                    </h3>

                                                    <Chip
                                                        className="shrink-0"
                                                        color={tone.color}
                                                        variant="flat"
                                                        size="sm"
                                                    >
                                                        {tone.label}
                                                    </Chip>
                                                </div>

                                                <p className="text-sm leading-6 text-default-600 md:text-base">
                                                    {topic.description}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {topic.chips.map((chip, index) => (
                                                    <Chip
                                                        key={`${topic.id}-${chip.label}-${index}`}
                                                        color={chip.color}
                                                        variant={chip.variant ?? "flat"}
                                                        size="sm"
                                                    >
                                                        {chip.label}
                                                    </Chip>
                                                ))}
                                                <Button
                                                    size="sm"
                                                    variant="flat"
                                                    color="default"
                                                    className="ml-auto  rounded-full border border-default-200 bg-default-100/80 backdrop-blur-sm"
                                                    endContent={<ArrowRight size={16} />}
                                                >
                                                    Select
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex shrink-0 items-center justify-between gap-4 sm:hidden">
                                        <div className="w-[92px]">
                                            <CircleChart
                                                pro={topic.compatibility}
                                                contra={Math.max(0, 100 - topic.compatibility)}
                                                size={45}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
