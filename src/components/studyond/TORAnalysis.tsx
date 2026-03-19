"use client";

import React from "react";
import { Card, CardBody, CardHeader, Chip, Progress, Skeleton } from "@heroui/react";
import CircleChart from "@/components/charts/CircleChart";
import { useTOR } from "@/context/TORContext";

const MOCK_CATEGORIES = [
    {
        id: 1,
        category: "Mathematics",
        pro: 88,
        contra: 12,
        ects: 24,
        averageGrade: "5.5",
        summary: "Strong mathematical foundation with consistently high grades in core quantitative modules.",
    },
    {
        id: 2,
        category: "Programming",
        pro: 81,
        contra: 19,
        ects: 30,
        averageGrade: "5.1",
        summary: "Good practical programming profile across multiple software engineering and implementation courses.",
    },
    {
        id: 3,
        category: "Machine Learning",
        pro: 72,
        contra: 28,
        ects: 12,
        averageGrade: "4.9",
        summary: "Solid entry-level performance with room to improve for more theory-heavy thesis work.",
    },
    {
        id: 5,
        category: "Human-Computer Interaction",
        pro: 100,
        contra: 0,
        ects: 9,
        averageGrade: "5.8",
        summary: "Excellent fit. Grades indicate strong potential for HCI- or UX-oriented thesis topics.",
    },
];

function ScoreBadge({ pro, contra }: { pro: number; contra: number }) {
    if (contra === 0) return <Chip color="success" variant="bordered">excellent match</Chip>;
    if (pro === 0) return <Chip color="danger" variant="bordered">weak category</Chip>;
    if (pro >= 70) return <Chip color="primary" variant="bordered">strong match</Chip>;
    if (pro >= 50) return <Chip color="warning" variant="bordered">moderate match</Chip>;
    return <Chip color="danger" variant="bordered">risky match</Chip>;
}

export default function TORAnalysis() {
    const { analysis, isAnalyzing } = useTOR();

    // Use analysis data or fallback to mock data
    const categories = analysis?.categories || MOCK_CATEGORIES;
    const bestCategory = analysis?.bestCategory || "Human-Computer Interaction";
    const weakestCategory = analysis?.weakestCategory || "Systems";
    const averageFit = analysis?.averageFit || 75;

    if (isAnalyzing) {
        return (
            <div className="min-h-screen bg-default-50 px-4 py-8 md:px-8">
                <div className="mx-auto max-w-7xl space-y-8">
                    <Card className="rounded-[2rem] border border-default-200 p-8">
                        <Skeleton className="h-8 w-48 rounded-lg mb-4" />
                        <Skeleton className="h-12 w-full rounded-lg mb-4" />
                        <Skeleton className="h-24 w-full rounded-lg" />
                    </Card>
                    <div className="grid gap-6 md:grid-cols-4">
                        {[1, 2, 3, 4].map((i) => (
                            <Card key={i} className="h-64 rounded-[2rem] p-6">
                                <Skeleton className="h-full w-full rounded-[2rem]" />
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-default-50 via-background to-default-100 px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                    <Card className="rounded-[2rem] border border-default-200 bg-background/90 shadow-xl">
                        <CardBody className="gap-6 p-8 md:p-10">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Chip color="primary" variant="flat" className="w-fit">
                                        Transcript of Records Analysis
                                    </Chip>
                                    {analysis?.degree && (
                                        <Chip color="secondary" variant="dot" className="w-fit font-bold uppercase">
                                            {analysis.degree} LEVEL
                                        </Chip>
                                    )}
                                </div>
                                <div className="space-y-3">
                                    <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
                                        Thesis topic fit based on TOR categories
                                    </h1>
                                    <p className="max-w-3xl text-base leading-7 text-default-600 md:text-lg">
                                        AI has grouped your transcript performance into topic categories. 
                                        {analysis && " This is live data from your uploaded document."}
                                    </p>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-3">
                                <div className="rounded-3xl border border-default-200 bg-default-50 p-5">
                                    <p className="text-sm text-default-500">overall fit</p>
                                    <p className="mt-2 text-3xl font-bold">{averageFit}%</p>
                                    <Progress aria-label="overall fit" value={averageFit} className="mt-4" />
                                </div>

                                <div className="rounded-3xl border border-default-200 bg-default-50 p-5">
                                    <p className="text-sm text-default-500">best category</p>
                                    <p className="mt-2 text-2xl font-bold">{bestCategory}</p>
                                </div>

                                <div className="rounded-3xl border border-default-200 bg-default-50 p-5">
                                    <p className="text-sm text-default-500">needs support</p>
                                    <p className="mt-2 text-2xl font-bold">{weakestCategory}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>

                    {analysis && (
                        <Card className="rounded-[2rem] border border-default-200 bg-primary-50/30 p-8 shadow-none">
                            <h3 className="text-xl font-bold mb-4 text-primary">AI Extracted Skills</h3>
                            <div className="flex flex-wrap gap-2">
                                {analysis.skills.map((skill, i) => (
                                    <Chip key={i} variant="dot" color="primary">{skill}</Chip>
                                ))}
                            </div>
                            <Divider className="my-6" />
                            <h3 className="text-xl font-bold mb-4 text-secondary">Recommended Fields</h3>
                            <div className="flex flex-wrap gap-2">
                                {analysis.recommendedFields.map((field, i) => (
                                    <Chip key={i} variant="flat" color="secondary">{field}</Chip>
                                ))}
                            </div>
                        </Card>
                    )}
                </section>

                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {categories.map((item) => (
                        <Card key={item.id} className="rounded-[2rem] border border-default-200 shadow-lg transition-transform">
                            <CardHeader className="flex items-start justify-between gap-4 px-6 pb-2 pt-6">
                                <h3 className="text-xl font-bold">{item.category}</h3>
                                <ScoreBadge pro={item.pro} contra={item.contra} />
                            </CardHeader>

                            <CardBody className="space-y-5 px-6 pt-2 min-w-[180px]">
                                <div className="flex justify-center py-2">
                                    <CircleChart pro={item.pro} contra={item.contra} size={200} />
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-default-500">ECTS: {item.ects}</span>
                                        <span className="font-bold">Grade: {item.averageGrade}</span>
                                    </div>
                                    <p className="text-xs text-default-600 line-clamp-3">
                                        {item.summary}
                                    </p>
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </section>

                {analysis && (
                    <section className="mt-12 space-y-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-2xl font-bold">Detailed Analysis Breakdown</h2>
                            <div className="h-px flex-1 bg-default-200" />
                        </div>
                        
                        <div className="grid gap-4">
                            {analysis.categories.map((cat) => (
                                <div key={cat.id} className="flex flex-col gap-2 rounded-2xl border border-default-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                                    <div className="space-y-1">
                                        <p className="font-bold text-lg">{cat.category}</p>
                                        <p className="text-sm text-default-500">{cat.summary}</p>
                                    </div>
                                    <div className="flex items-center gap-4 text-right">
                                        <div className="text-sm">
                                            <p className="text-default-400">ECTS</p>
                                            <p className="font-mono font-bold">{cat.ects}</p>
                                        </div>
                                        <div className="text-sm">
                                            <p className="text-default-400">Grade</p>
                                            <p className="font-mono font-bold">{cat.averageGrade}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Card className="mt-8 border-none bg-default-900 text-default-50">
                            <CardBody className="p-6">
                                <details className="group">
                                    <summary className="flex cursor-pointer list-none items-center justify-between font-mono text-sm font-bold uppercase tracking-widest text-primary-400">
                                        <span>View Raw AI Data (JSON)</span>
                                        <span className="transition-transform group-open:rotate-180">▼</span>
                                    </summary>
                                    <pre className="mt-4 max-h-[400px] overflow-auto rounded-xl bg-black/30 p-4 font-mono text-xs leading-relaxed text-success-300">
                                        {JSON.stringify(analysis, null, 2)}
                                    </pre>
                                </details>
                            </CardBody>
                        </Card>
                    </section>
                )}
            </div>
        </div>
    );
}

const Divider = ({ className }: { className?: string }) => <div className={`h-px bg-default-200 ${className}`} />;
