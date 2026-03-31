"use client";

import React from "react";
import { Link } from "@heroui/react";
import { Article } from "@/components/taxme/Article";
import type { ArticleData } from "@/components/taxme/ArticleData";

const articleData: ArticleData = {
    title: "Kommunikation mit der Öffentlichkeit",
    subtitle: "Regierungskommunikation, Medien und Öffentlichkeitsarbeit",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Der Kanton Alpengrün informiert die Öffentlichkeit transparent,
                verständlich und aktuell über politische Entscheide, Projekte und
                Dienstleistungen.
            </p>

            <p className="mt-3">
                Dazu gehören Regierungskommunikation, Medienarbeit,
                Öffentlichkeitsarbeit, Corporate Design sowie die Pflege der
                digitalen Kanäle.
            </p>

            <p className="mt-3">
                Zurück zur Übersicht: {" "}
                <Link href="/start/communication" color="primary">
                    Kommunikation und Aussenbeziehungen
                </Link>
            </p>
        </>
    ),
};

export default function Page() {
    return <Article data={articleData} />;
}