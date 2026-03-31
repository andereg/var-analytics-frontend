"use client";

import React from "react";
import { Link } from "@heroui/react";
import { Article } from "@/components/taxme/Article";
import type { ArticleData } from "@/components/taxme/ArticleData";

const articleData: ArticleData = {
    title: "Indirekte Medienförderung",
    subtitle: "Förderung der Medienvielfalt im Kanton Alpengrün",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Eine vielfältige Medienlandschaft ist wichtig für Demokratie,
                Transparenz und die öffentliche Meinungsbildung.
            </p>

            <p className="mt-3">
                Der Kanton Alpengrün unterstützt deshalb indirekte Massnahmen,
                die unabhängige Information und regionale Medienangebote stärken.
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