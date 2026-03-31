"use client";


import React from "react";
import {
    Link,
} from "@heroui/react";
import type { ArticleData } from "@/components/taxme/ArticleData";
import {Article} from "@/components/taxme/Article";
import CommunicationTaskList from "@/app/start/communication/communicationTasks";

type CommunicationTask = {
    title: string;
    description: string;
    href: string;
};

const communicationTasks: CommunicationTask[] = [
    {
        title: "Kommunikation mit der Öffentlichkeit",
        description:
            "Regierungskommunikation, Medien, Öffentlichkeitsarbeit, Corporate Design, Internet und Social Media.",
        href: "/start/communication/publicpress",
    },
    {
        title: "Barrierefreiheit",
        description:
            "Barrierefreier Zugang für Menschen mit Behinderung zu Web-Angeboten. Infos für Lieferantinnen und Lieferanten.",
        href: "/start/communication/accessibility",
    },
    {
        title: "Indirekte Medienförderung",
        description:
            "Massnahmen zur Unterstützung der Medienvielfalt im Kanton Alpengrün.",
        href: "/start/communication/media-support",
    },
    {
        title: "Interkantonale Beziehungen",
        description:
            "Der Kanton Alpengrün arbeitet aktiv mit anderen Kantonen zusammen.",
        href: "/start/communication/intercantonal",
    },
    {
        title: "Beziehungen zum Bund",
        description:
            "Der Kanton Alpengrün wirkt an der Bundespolitik mit.",
        href: "/start/communication/federal-relations",
    },
    {
        title: "Beziehungen zum Ausland",
        description:
            "Europapolitik, Kontakte zu Botschaften und internationalen Organisationen sowie internationale Partnerschaften.",
        href: "/start/communication/international-relations",
    },
];

const article: ArticleData = {
    title: "Kommunikation und Aussenbeziehungen",
    subtitle: "Amt für Kommunikation des Kantons Alpengrün",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Das Amt für Kommunikation (KomAG) ist verantwortlich für die
                Regierungskommunikation, Öffentlichkeitsarbeit sowie die Medien-
                und Onlinekommunikation im Kanton Alpengrün.
            </p>

            <p className="mt-3">
                Zudem koordiniert das Amt die Aussenbeziehungen des Kantons auf
                nationaler und internationaler Ebene.
            </p>

            <div className="mt-6">
                <CommunicationTaskList/>
            </div>

            <div className="mt-6 rounded-2xl border border-default-200 p-4 space-y-2">
                <h2 className="text-md font-semibold">Kontakt</h2>

                <p className="text-sm text-default-600">
                    Amt für Kommunikation
                    <br/>
                    Postgasse 68
                    <br/>
                    Postfach
                    <br/>
                    3000 Alpengrün
                </p>

                <p className="text-sm text-default-600">
                    Tel. +41 31 633 75 91
                </p>
            </div>

            <div className="mt-6">
                <Link href="/start/communication/beinfo" color="primary">
                    Weitere Informationen (beinfo)
                </Link>
            </div>

        </>
    ),
};

export default function Page() {
    return (
        <Article data={article}/>
    );
}