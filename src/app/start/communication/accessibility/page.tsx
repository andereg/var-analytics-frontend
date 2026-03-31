"use client";

import React from "react";
import { Link } from "@heroui/react";
import { Article } from "@/components/taxme/Article";
import type { ArticleData } from "@/components/taxme/ArticleData";

const articleData: ArticleData = {
    title: "Barrierefreiheit",
    subtitle: "Digitale Zugänglichkeit für alle Menschen",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Der Kanton Alpengrün setzt sich dafür ein, dass digitale Angebote
                für alle Menschen zugänglich sind – unabhängig von körperlichen
                oder technischen Einschränkungen.
            </p>

            <p className="mt-3">
                Dazu gehören klare Strukturen, gute Lesbarkeit, alternative
                Beschreibungen sowie technische Standards für barrierefreie
                Web-Angebote.
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