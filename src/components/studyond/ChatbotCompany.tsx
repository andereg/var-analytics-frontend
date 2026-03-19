"use client";

import React, {useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
} from "@heroui/react";
import { Icon } from "@iconify/react";

import CircleChart from "@/components/charts/CircleChart";
import Chatbot from "@/components/meta/Chatbot";
import {BookOpen, Building2, GraduationCap, User} from "lucide-react";

type Company = {
    id: number;
    name: string;
    description: string;
    compatibility: number;
    location: string;
    industry: string;
    logo?: string;
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

const suggestedCompanies: Company[] = [
    {
        id: 1,
        name: "InnovateX Labs",
        description:
            "A product-focused software company building modern learning and collaboration platforms for universities and businesses.",
        compatibility: 92,
        location: "Zurich, Switzerland",
        industry: "EdTech / SaaS",
        logo: "https://i.pravatar.cc/100?img=12",
        chips: [
            { label: "best overall fit", color: "success", variant: "flat" },
            { label: "strong technical match", color: "primary", variant: "flat" },
            { label: "high growth team", color: "secondary", variant: "flat" },
        ],
    },
    {
        id: 2,
        name: "DataBridge Systems",
        description:
            "A data-driven company focused on analytics platforms, dashboards, and intelligent decision-support systems.",
        compatibility: 87,
        location: "Basel, Switzerland",
        industry: "Data / Analytics",
        logo: "https://i.pravatar.cc/100?img=22",
        chips: [
            { label: "best data fit", color: "secondary", variant: "flat" },
            { label: "innovation potential", color: "warning", variant: "flat" },
        ],
    },
    {
        id: 3,
        name: "CloudForge AG",
        description:
            "A cloud software company helping organizations build scalable internal tools and enterprise platforms.",
        compatibility: 84,
        location: "Bern, Switzerland",
        industry: "Cloud / Enterprise Software",
        logo: "https://i.pravatar.cc/100?img=31",
        chips: [
            { label: "balanced fit", color: "success", variant: "flat" },
            { label: "practical projects", color: "warning", variant: "flat" },
        ],
    },
    {
        id: 4,
        name: "NextWave Digital",
        description:
            "A digital solutions company creating interactive web products, user experiences, and business applications.",
        compatibility: 79,
        location: "Lucerne, Switzerland",
        industry: "Web / Product Design",
        logo: "https://i.pravatar.cc/100?img=45",
        chips: [
            { label: "strong UX alignment", color: "primary", variant: "flat" },
            { label: "product-focused", color: "secondary", variant: "flat" },
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

function CompanyCard({ company }: { company: Company }) {
    const tone = scoreTone(company.compatibility);


    return (
          <Card className="h-auto overflow-visible rounded-3xl border border-default-200 shadow-sm">
            <CardBody className="h-auto overflow-visible p-4">
                <div className="space-y-4">
                    <div className="flex items-start gap-3">

                        <div className="min-w-0 flex-1 space-y-2">
                            <div className="flex items-start gap-3">
                                <div className="shrink-0 pt-0.5">
                                    <div className="relative h-12 w-12 shrink-0">
                                        {/* circle chart (background ring) */}
                                        <CircleChart
                                            pro={company.compatibility}
                                            contra={Math.max(0, 100 - company.compatibility)}
                                            size={48} // match container size
                                        />

                                        {/* avatar centered inside */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Avatar
                                                className="h-9 w-9"
                                                name={company.name}
                                                src={company.logo}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="min-w-0 flex-1">
                                    <div className="flex items-start justify-between gap-2">
                                        <h3 className="min-w-0 text-sm font-semibold leading-5 md:text-base">
                                            {company.name}
                                        </h3>
                                    </div>

                                    <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-default-500">
                                        <div className="flex items-center gap-1">
                                            <Icon icon="solar:buildings-2-linear" width={14} />
                                            <span>{company.industry}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Icon icon="solar:map-point-linear" width={14} />
                                            <span>{company.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <p className="break-words text-xs leading-5 text-default-500 md:text-sm">
                                {company.description}
                            </p>
                        </div>
                    </div>

                    <Button
                        className="w-full justify-between rounded-2xl"
                        color="default"
                        endContent={<Icon icon="solar:arrow-right-linear" width={16} />}
                        variant="flat"
                    >
                        View company
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
}

export default function ChatbotCompany() {
    const [thesisTopic, setThesisTopic] = useState(
        "Machine Learning Applications in Healthcare Diagnostics"
    );

    return (
        <div className="min-h-screen">

            {/* Topic Banner */}
           <div className="px-4 py-4 lg:px-6 lg:py-6 w-full max-w-[1600px]">
                <Card className=" from-primary-500  to-secondary-500">
                    <CardBody className="py-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <BookOpen className="w-8 h-8 "/>
                            </div>
                            <div>
                                <p className=" text-sm font-medium opacity-50">Your chosen topic</p>
                                <h1 className="text-2xl md:text-2xl font-bold">
                                    {thesisTopic}
                                </h1>
                                <div className="flex gap-4">
                                    <p className="text-sm mt-2 flex gap-2 items-center">
                                        <User className="w-5 h-5 "/>
                                        Dr. Michael Müller</p>
                                    <p className="text-sm mt-2 flex gap-2 items-center">
                                        <Building2 className="w-5 h-5 "/>
                                        SBB Swiss Railways</p>
                                    <p className="text-sm mt-2 flex gap-2 items-center">
                                        <GraduationCap className="w-5 h-5 "/>
                                        MSc. in Artificial Intelligence</p>
                                </div>

                            </div>
                        </div>
                    </CardBody>
                </Card>
           </div>

                <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 lg:px-6 ">
                    <div className="flex min-w-0 flex-1 flex-col">
                        <Chatbot/>
                    </div>

                    <aside className="hidden w-[390px] shrink-0 xl:block">
                        <Card
                            className="sticky top-6 flex max-h-[calc(100vh-3rem)] flex-col overflow-hidden rounded-[2rem] border border-default-200 shadow-xl">
                            <CardHeader className="flex shrink-0 flex-col items-start gap-2 px-5 py-5">
                                <div className="flex w-full items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg font-semibold">Suggested companies</h2>
                                        <p className="text-sm text-default-500">
                                            Ranked from your profile, skills, and interests
                                        </p>
                                    </div>
                                    <Chip color="secondary" variant="flat">
                                        {suggestedCompanies.length} matches
                                    </Chip>
                                </div>
                            </CardHeader>

                            <Divider className="shrink-0"/>

                            <CardBody className="min-h-0 flex-1 overflow-hidden p-0">
                                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                                    <div className="space-y-4">
                                        {suggestedCompanies.map((company) => (
                                            <CompanyCard key={company.id} company={company}/>
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