"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";
const article: ArticleData = {
    title: "Der Kanton Alpengrün in Leichter Sprache",
    subtitle: "Einfach erklärt für alle",
    author: "Kanton Alpengrün",
    date: "29. März 2026",
    content: (
        <>
            <p>
                Hier findest du wichtige Informationen über den Kanton Alpengrün
                in leicht verständlicher Sprache.
            </p>

            <p className="mt-3">
                Die Inhalte sind klar strukturiert und helfen dir, dich schnell
                zurechtzufinden.
            </p>

            <p className="mt-3">
                <Link href="#" color="primary">
                    Zur Übersicht in Leichter Sprache
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