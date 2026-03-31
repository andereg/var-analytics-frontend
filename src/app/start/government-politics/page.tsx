"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";
const article: ArticleData = {
    title: "Engagement 2030",
    subtitle: "Richtlinien der Regierungspolitik",
    author: "Kanton Alpengrün",
    date: "28. März 2026",
    content: (
        <>
            <p>
                Mit dem Programm „Engagement 2030“ definiert der Kanton Alpengrün
                seine strategischen Ziele für die kommenden Jahre.
            </p>

            <p className="mt-3">
                Im Fokus stehen nachhaltige Entwicklung, Digitalisierung und
                wirtschaftliche Stärke.
            </p>

            <p className="mt-3">
                <Link href="#" color="primary">
                    Richtlinien lesen
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