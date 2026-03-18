import React from "react";
import { Card, CardBody, Chip, Button } from "@heroui/react";
import { Mail, ArrowRight } from "lucide-react";
import CircleChart from "@/components/charts/CircleChart";

type RecommendedExperts = {
    id: number;
    name: string;
    role: string;
    institution: string;
    matchScore: number;
    researchAlignment: number;
    responseRate: number;
    experience: number;
    chips: Array<{
        label: string;
        color:
            | "default"
            | "primary"
            | "secondary"
            | "success"
            | "warning"
            | "danger";
    }>;
};

const experts: RecommendedExperts[] = [
    {
        id: 1,
        name: "Dr. Anna Keller",
        role: "Professor of HCI",
        institution: "ETH Zurich",
        matchScore: 94,
        researchAlignment: 96,
        responseRate: 88,
        experience: 92,
        chips: [
            { label: "best supervisor match", color: "success" },
            { label: "strong research overlap", color: "primary" },
            { label: "high response rate", color: "secondary" },
        ],
    },
    {
        id: 2,
        name: "Prof. Markus Weber",
        role: "Machine Learning Lab",
        institution: "University of Zurich",
        matchScore: 88,
        researchAlignment: 91,
        responseRate: 72,
        experience: 95,
        chips: [
            { label: "top ML expert", color: "primary" },
            { label: "high experience", color: "warning" },
        ],
    },
    {
        id: 3,
        name: "Dr. Sofia Lang",
        role: "Industry Research Lead",
        institution: "Google Research",
        matchScore: 81,
        researchAlignment: 85,
        responseRate: 60,
        experience: 89,
        chips: [
            { label: "industry connection", color: "secondary" },
            { label: "practical focus", color: "warning" },
        ],
    },
    {
        id: 4,
        name: "Dr. Luca Meier",
        role: "Distributed Systems",
        institution: "EPFL",
        matchScore: 69,
        researchAlignment: 72,
        responseRate: 55,
        experience: 78,
        chips: [
            { label: "moderate match", color: "warning" },
        ],
    },
];

function scoreTone(score: number) {
    if (score >= 90) return { label: "excellent match", color: "success" as const };
    if (score >= 75) return { label: "strong match", color: "primary" as const };
    if (score >= 60) return { label: "good match", color: "warning" as const };
    return { label: "low match", color: "danger" as const };
}

export default function RecommendedExperts() {
    return (
        <div className="mx-auto w-full max-w-6xl space-y-4 px-4 py-6">
            <div>
                <h2 className="text-2xl font-bold md:text-3xl">
                    Recommended experts to contact
                </h2>
                <p className="text-sm text-default-500">
                    Based on your interests and transcript, these experts are the best fit for your thesis.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {experts.map((expert) => {
                    const tone = scoreTone(expert.matchScore);

                    return (
                        <Card key={expert.id} className="relative rounded-3xl border border-default-200">
                            <CardBody className="p-4 pb-16">
                                <div className="flex gap-4">

                                    {/* chart */}
                                    <div className="hidden sm:flex">
                                        <CircleChart
                                            pro={expert.matchScore}
                                            contra={100 - expert.matchScore}
                                            size={60}
                                        />
                                    </div>

                                    {/* content */}
                                    <div className="flex-1 space-y-3">

                                        {/* header */}
                                        <div className="flex items-start gap-2">
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold text-lg">
                                                    {expert.name}
                                                </h3>
                                                <p className="text-sm text-default-500">
                                                    {expert.role} · {expert.institution}
                                                </p>
                                            </div>

                                            <Chip color={tone.color} variant="flat" size="sm">
                                                {tone.label}
                                            </Chip>
                                        </div>

                                        {/* chips */}
                                        <div className="flex flex-wrap gap-2">
                                            {expert.chips.map((chip, i) => (
                                                <Chip key={i} color={chip.color} variant="flat" size="sm">
                                                    {chip.label}
                                                </Chip>
                                            ))}
                                        </div>

                                        {/* metrics */}
                                        <div className="grid grid-cols-3 gap-2 text-center">
                                            <div className="rounded-xl bg-default-100 p-2">
                                                <p className="text-xs text-default-500">alignment</p>
                                                <p className="font-bold">{expert.researchAlignment}%</p>
                                            </div>

                                            <div className="rounded-xl bg-default-100 p-2">
                                                <p className="text-xs text-default-500">response</p>
                                                <p className="font-bold">{expert.responseRate}%</p>
                                            </div>

                                            <div className="rounded-xl bg-default-100 p-2">
                                                <p className="text-xs text-default-500">experience</p>
                                                <p className="font-bold">{expert.experience}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* button */}
                                <Button
                                    size="sm"
                                    variant="flat"
                                    className="absolute bottom-3 right-3"
                                    endContent={<ArrowRight size={16} />}
                                >
                                    Contact
                                </Button>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}