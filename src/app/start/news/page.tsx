"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";
const article: ArticleData = {
    title: "Aktuelles aus dem Kanton Alpengrün",
    subtitle: "Neuigkeiten und wichtige Mitteilungen",
    author: "Kanton Alpengrün",
    date: "30. März 2026",
    content: (
        <>
            <p>
                Bleibe auf dem Laufenden über aktuelle Entwicklungen im Kanton
                Alpengrün – von politischen Entscheiden bis zu neuen Projekten.
            </p>

            <p className="mt-3">
                Regelmässige Updates informieren dich über relevante Themen aus
                Verwaltung, Wirtschaft und Gesellschaft.
            </p>

            <p className="mt-3">
                <Link href="#" color="primary">
                    Alle News anzeigen
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