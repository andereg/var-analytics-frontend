"use client";

import React from "react";
import { Card, CardBody, CardHeader, Link } from "@heroui/react";
import { ChevronRight } from "lucide-react";
import type { ArticleData } from "@/components/taxme/ArticleData";

const articles: ArticleData[] = [
    {
        title: "Steuererklärung 2026",
        subtitle: "Jetzt online im Kanton Alpengrün erledigen",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
        content: (
            <>
                <p>
                    Im Kanton Alpengrün kannst du deine Steuererklärung bequem online ausfüllen
                    und einreichen.
                </p>
            </>
        ),
        ref: "/start/taxform",
    },
    {
        title: "Förderprogramm Energie",
        subtitle: "Beiträge für nachhaltiges Wohnen sichern",
        author: "Kanton Alpengrün",
        date: "28. März 2026",
        content: (
            <>
                <p>
                    Der Kanton Alpengrün unterstützt energetische Sanierungen und nachhaltige
                    Bauprojekte mit finanziellen Beiträgen.
                </p>
            </>
        ),
        ref: "/start/greenenergy",
    },
    {
        title: "Digitale Verwaltung",
        subtitle: "Alle wichtigen Services online verfügbar",
        author: "Kanton Alpengrün",
        date: "25. März 2026",
        content: (
            <>
                <p>
                    Mit den E-Services des Kantons Alpengrün kannst du viele Behördengänge
                    vollständig online erledigen.
                </p>
            </>
        ),
        ref: "/start/e-services",
    },
    {
        title: "Weiterbildung im Kanton Alpengrün",
        subtitle: "Investiere in deine Zukunft",
        author: "Kanton Alpengrün",
        date: "20. März 2026",
        content: (
            <>
                <p>
                    Der Kanton Alpengrün fördert lebenslanges Lernen durch verschiedene
                    Programme und steuerliche Abzugsmöglichkeiten.
                </p>
            </>
        ),
        ref: "/start/education",
    },
    {
        title: "Mobilität im Kanton Alpengrün",
        subtitle: "Nachhaltig unterwegs",
        author: "Kanton Alpengrün",
        date: "18. März 2026",
        content: (
            <>
                <p>
                    Der Kanton Alpengrün setzt auf nachhaltige Mobilität und unterstützt
                    den öffentlichen Verkehr sowie umweltfreundliche Alternativen.
                </p>
            </>
        ),
        ref: "/start/mobility",
    },
    {
        title: "Kommunikation Kanton Alpengrün",
        subtitle: "Aktuelle Informationen und Dienstleistungen",
        author: "Kanton Alpengrün",
        date: "18. März 2026",
        content: (
            <>
                <p>
                    Internationale und nationale Beziehungen, Medienarbeit, Öffentlichkeitsarbeit sowie die Pflege der digitalen Kanäle.
                </p>
            </>
        ),
        ref: "/start/communication",
    },
];

interface ArticleOverviewCardProps {
    article: ArticleData;
    href: string;
}

const ArticleOverviewCard: React.FC<ArticleOverviewCardProps> = ({ article, href }) => {
    return (
        <Link href={href} className="block h-full">
            <Card
                isPressable
                className="h-full w-full rounded-3xl border border-default-200 shadow-none transition-shadow hover:shadow-md"
            >
                <CardBody className="p-6">
                    <div className="flex h-full flex-col justify-between gap-4">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2 text-sm text-default-400">
                                {article.author && <span>{article.author}</span>}
                                {article.date && <span>• {article.date}</span>}
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold leading-tight">
                                    {article.title}
                                </h2>

                                {article.subtitle && (
                                    <p className="mt-2 text-sm text-default-500">
                                        {article.subtitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">

                            <div className="flex items-center gap-1 text-sm font-medium text-primary ml-auto">
                                <span>Öffnen</span>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
};

export default function ArticlesOverviewPage() {
    return (
        <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 px-4 py-4 duration-700 md:px-8">
            <div className="mx-auto max-w-6xl">
                <Card className="rounded-3xl border border-default-200 shadow-lg">
                    <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                Häufig gesuchte Informationen und Dienstleistungen
                            </h1>

                            <p className="max-w-4xl text-sm text-default-500">
                                Hier findest du aktuelle Informationen, Hinweise und Dienstleistungen
                                des Kantons Alpengrün.
                            </p>
                        </div>
                    </CardHeader>

                    <CardBody className="px-6 pb-8 pt-2 md:px-8">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {articles.map((article, index) => (
                                <ArticleOverviewCard
                                    key={article.title}
                                    article={article}
                                    href={`${article.ref}`}                                />
                            ))}
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}