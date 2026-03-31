"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";
const article: ArticleData = {
    title: "Wahlen 2026 – Resultate",
    subtitle: "Die aktuellen Ergebnisse im Kanton Alpengrün",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Die kantonalen Wahlen 2026 im Kanton Alpengrün sind abgeschlossen.
                Hier findest du die offiziellen Resultate sowie detaillierte Auswertungen.
            </p>

            <p className="mt-3">
                Informiere dich über Wahlbeteiligung, Sitzverteilungen und regionale
                Unterschiede.
            </p>

            <p className="mt-3">
                <Link href="#" color="primary">
                    Resultate ansehen
                </Link>
            </p>
        </>
    ),
};
export default function Page() {
    return (
        <Article data={article} />
    );
}