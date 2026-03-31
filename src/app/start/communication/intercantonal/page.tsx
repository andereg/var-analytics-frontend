"use client";

import React from "react";
import { Link } from "@heroui/react";
import { Article } from "@/components/taxme/Article";
import type { ArticleData } from "@/components/taxme/ArticleData";

const articleData: ArticleData = {
    title: "Interkantonale Beziehungen",
    subtitle: "Zusammenarbeit mit anderen Kantonen",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Der Kanton Alpengrün arbeitet in vielen Bereichen aktiv mit
                anderen Kantonen zusammen, etwa in Bildung, Infrastruktur,
                Sicherheit und Digitalisierung.
            </p>

            <p className="mt-3">
                Ziel ist es, gemeinsame Herausforderungen effizient zu lösen und
                Synergien im Interesse der Bevölkerung zu nutzen.
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