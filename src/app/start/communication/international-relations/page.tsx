"use client";

import React from "react";
import { Link } from "@heroui/react";
import { Article } from "@/components/taxme/Article";
import type { ArticleData } from "@/components/taxme/ArticleData";

const articleData: ArticleData = {
    title: "Beziehungen zum Ausland",
    subtitle: "Internationale Zusammenarbeit und Partnerschaften",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Der Kanton Alpengrün pflegt internationale Beziehungen zu
                Partnerregionen, Botschaften und Organisationen.
            </p>

            <p className="mt-3">
                Im Fokus stehen Wissenstransfer, Standortpflege, kultureller
                Austausch und die Zusammenarbeit bei globalen Themen.
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