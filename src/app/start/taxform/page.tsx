"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";

const article: ArticleData = {
    title: "Steuererklärung 2026",
    subtitle: "Jetzt online im Kanton Alpengrün erledigen",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Im Kanton Alpengrün kannst du deine Steuererklärung bequem online ausfüllen
                und einreichen. Der digitale Prozess spart Zeit und reduziert Fehler.
            </p>

            <p className="mt-3">
                Starte hier:{" "}
                <Link href="/taxform/personal-data" color="primary">
                    Steuerformular öffnen
                </Link>
            </p>

            <p className="mt-3">
                Achte darauf, alle Abzüge korrekt zu erfassen, um dein steuerbares Einkommen
                zu optimieren.
            </p>
        </>
    ),
};

export default function Page() {
    return (
        <Article data={article} />
    );
}