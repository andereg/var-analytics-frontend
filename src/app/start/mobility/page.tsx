"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";

const article: ArticleData = {
    title: "Mobilität im Kanton Alpengrün",
    subtitle: "Nachhaltig unterwegs",
    author: "Kanton Alpengrün",
    date: "18. März 2026",
    content: (
        <>
            <p>
                Der Kanton Alpengrün setzt auf nachhaltige Mobilität und unterstützt
                den öffentlichen Verkehr sowie umweltfreundliche Alternativen.
            </p>

            <p className="mt-3">
                Pendelkosten können teilweise steuerlich abgezogen werden.
            </p>

            <p className="mt-3">
                Mehr Infos:{" "}
                <Link href="#" color="primary">
                    Verkehr & Mobilität
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