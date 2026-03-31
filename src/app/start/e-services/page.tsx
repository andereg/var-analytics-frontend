"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";

const article: ArticleData = {
    title: "Digitale Verwaltung",
    subtitle: "Alle wichtigen Services online verfügbar",
    author: "Kanton Alpengrün",
    date: "25. März 2026",
    content: (
        <>
            <p>
                Mit den E-Services des Kantons Alpengrün kannst du viele Behördengänge
                vollständig online erledigen.
            </p>

            <p className="mt-3">
                Dazu gehören:
            </p>

            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Adressänderungen</li>
                <li>Steuererklärungen</li>
                <li>Gesuche und Bewilligungen</li>
            </ul>

            <p className="mt-3">
                Zum Portal:{" "}
                <Link href="#" color="primary">
                    E-Services öffnen
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