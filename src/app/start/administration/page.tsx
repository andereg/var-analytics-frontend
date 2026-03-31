"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";
const article: ArticleData = {
    title: "Verwaltung und Behörden",
    subtitle: "Struktur und Organisation im Überblick",
    author: "Kanton Alpengrün",
    date: "26. März 2026",
    content: (
        <>
            <p>
                Der Kanton Alpengrün ist in verschiedene Direktionen und Behörden
                gegliedert, die gemeinsam die öffentliche Verwaltung bilden.
            </p>

            <p className="mt-3">
                Hier findest du alle wichtigen Informationen zu Zuständigkeiten,
                Organisation und Ansprechpartnern.
            </p>

            <p className="mt-3">
                <Link href="#" color="primary">
                    Zur Übersicht der Behörden
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