"use client";

import React from "react";
import { Card, CardBody, Link } from "@heroui/react";
import { ChevronRight } from "lucide-react";

type CommunicationTask = {
    title: string;
    subtitle: string;
    href: string;
    author?: string;
    date?: string;
};

const communicationTasks: CommunicationTask[] = [
    {
        title: "Kommunikation mit der Öffentlichkeit",
        subtitle: "Regierungskommunikation, Medien und Öffentlichkeit",
        href: "/start/communication/publicpress",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
    },
    {
        title: "Barrierefreiheit",
        subtitle: "Digitale Zugänglichkeit für alle",
        href: "/start/communication/accessibility",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
    },
    {
        title: "Indirekte Medienförderung",
        subtitle: "Förderung der Medienvielfalt",
        href: "/start/communication/media-support",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
    },
    {
        title: "Interkantonale Beziehungen",
        subtitle: "Zusammenarbeit mit anderen Kantonen",
        href: "/start/communication/intercantonal",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
    },
    {
        title: "Beziehungen zum Bund",
        subtitle: "Mitwirkung an der Bundespolitik",
        href: "/start/communication/federal-relations",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
    },
    {
        title: "Beziehungen zum Ausland",
        subtitle: "Internationale Zusammenarbeit",
        href: "/start/communication/international-relations",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
    },
];

const CommunicationTaskList: React.FC = () => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {communicationTasks.map((task) => (
                <Link key={task.title} href={task.href} className="block h-full">
                    <Card
                        isPressable
                        className="h-full w-full rounded-3xl border border-default-200 shadow-none transition-shadow hover:shadow-md"
                    >
                        <CardBody className="p-6">
                            <div className="flex h-full flex-col justify-between gap-4">
                                <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-2 text-sm text-default-400">
                                        {task.author && <span>{task.author}</span>}
                                        {task.date && <span>• {task.date}</span>}
                                    </div>

                                    <div>
                                        <h2 className="text-xl font-semibold leading-tight">
                                            {task.title}
                                        </h2>

                                        {task.subtitle && (
                                            <p className="mt-2 text-sm text-default-500">
                                                {task.subtitle}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="ml-auto flex items-center gap-1 text-sm font-medium text-primary">
                                        <span>Öffnen</span>
                                        <ChevronRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export default CommunicationTaskList;