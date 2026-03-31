"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";

const article: ArticleData = {
    title: "Förderprogramm Energie",
    subtitle: "Beiträge für nachhaltiges Wohnen sichern",
    author: "Kanton Alpengrün",
    date: "28. März 2026",
    content: (
        <>
            <p>
                Der Kanton Alpengrün unterstützt energetische Sanierungen und nachhaltige
                Bauprojekte mit finanziellen Beiträgen.
            </p>

            <p className="mt-3">
                Gefördert werden unter anderem:
            </p>

            <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Wärmedämmung von Gebäuden</li>
                <li>Installation von Solaranlagen</li>
                <li>Ersatz fossiler Heizsysteme</li>
            </ul>

            <p className="mt-3">
                Mehr erfahren:{" "}
                <Link href="#" color="primary">
                    Förderprogramm ansehen
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