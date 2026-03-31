"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";
const article: ArticleData = {
    title: "Weiterbildung im Kanton Alpengrün",
    subtitle: "Investiere in deine Zukunft",
    author: "Kanton Alpengrün",
    date: "20. März 2026",
    content: (
        <>
            <p>
                Der Kanton Alpengrün fördert lebenslanges Lernen durch verschiedene
                Programme und steuerliche Abzugsmöglichkeiten.
            </p>

            <p className="mt-3">
                Weiterbildungskosten können in vielen Fällen steuerlich geltend gemacht
                werden.
            </p>

            <p className="mt-3">
                Details findest du hier:{" "}
                <Link href="#" color="primary">
                    Weiterbildungsmöglichkeiten
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