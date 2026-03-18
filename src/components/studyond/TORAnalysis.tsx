import React from "react";
import { Card, CardBody, CardHeader, Chip, Divider, Progress } from "@heroui/react";
import CircleChart from "@/components/charts/CircleChart";

const torCategories = [
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
        id: 4,
        category: "Systems",
        pro: 41,
        contra: 59,
        ects: 15,
        averageGrade: "4.2",
        summary: "Mixed performance in systems-oriented modules, suggesting weaker alignment for low-level topics.",
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
    {
        id: 6,
        category: "Databases",
        pro: 0,
        contra: 100,
        ects: 6,
        averageGrade: "3.7",
        summary: "Not a strong category based on the transcript. Database-heavy topics may be risky without extra preparation.",
    },
];

function ScoreBadge({ pro, contra }) {
    if (contra === 0) {
        return <Chip color="success" variant="bordered">excellent match</Chip>;
    }
    if (pro === 0) {
        return <Chip color="danger" variant="bordered">weak category</Chip>;
    }
    if (pro >= 70) {
        return <Chip color="primary" variant="bordered">strong match</Chip>;
    }
    if (pro >= 50) {
        return <Chip color="warning" variant="bordered">moderate match</Chip>;
    }
    return <Chip color="danger" variant="bordered">risky match</Chip>;
}

export default function TORAnalysis() {
    const bestCategory = [...torCategories].sort((a, b) => b.pro - a.pro)[0];
    const weakestCategory = [...torCategories].sort((a, b) => a.pro - b.pro)[0];
    const averageFit = Math.round(
        torCategories.reduce((sum, item) => sum + item.pro, 0) / torCategories.length
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-default-50 via-background to-default-100 px-4 py-8 md:px-8 lg:px-12">
            <div className="mx-auto max-w-7xl space-y-8">
                <section className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
                    <Card className="rounded-[2rem] border border-default-200 bg-background/90 shadow-xl">
                        <CardBody className="gap-6 p-8 md:p-10">
                            <div className="space-y-4">
                                <Chip color="primary" variant="flat" className="w-fit">
                                    Transcript of Records Analysis
                                </Chip>
                                <div className="space-y-3">
                                    <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-5xl">
                                        Thesis topic fit based on TOR categories
                                    </h1>
                                    <p className="max-w-3xl text-base leading-7 text-default-600 md:text-lg">
                                        This dashboard groups transcript performance into topic categories and converts them into
                                        a simple <span className="font-semibold text-foreground">pro / contra</span> signal.
                                        A topic is especially promising when <span className="font-semibold text-primary">contra = 0</span>,
                                        and a category is weak when <span className="font-semibold text-danger">pro = 0</span>.
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
                                    <p className="mt-2 text-2xl font-bold">{bestCategory.category}</p>
                                    <p className="mt-2 text-sm text-default-600">pro {bestCategory.pro} · contra {bestCategory.contra}</p>
                                </div>

                                <div className="rounded-3xl border border-default-200 bg-default-50 p-5">
                                    <p className="text-sm text-default-500">needs support</p>
                                    <p className="mt-2 text-2xl font-bold">{weakestCategory.category}</p>
                                    <p className="mt-2 text-sm text-default-600">pro {weakestCategory.pro} · contra {weakestCategory.contra}</p>
                                </div>
                            </div>
                        </CardBody>
                    </Card>


                </section>

                <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {torCategories.map((item) => (
                        <Card key={item.id} className="rounded-[2rem] border border-default-200 shadow-lg transition-transform">
                            <CardHeader className="flex items-start justify-between gap-4 px-6 pb-2 pt-6">
                                    <h3 className="text-xl font-bold">{item.category}</h3>
                                    <ScoreBadge pro={item.pro} contra={item.contra} />

                            </CardHeader>

                            <CardBody className="space-y-5 px-6  pt-2 min-w-[180px]">
                                <div className="flex justify-center py-2">
                                    <CircleChart pro={item.pro} contra={item.contra} size={200} />
                                </div>
                            </CardBody>
                        </Card>
                    ))}
                </section>
            </div>
        </div>
    );
}
