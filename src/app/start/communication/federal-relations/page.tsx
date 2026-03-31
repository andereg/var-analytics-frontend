"use client";

import React from "react";
import { Link } from "@heroui/react";
import { Article } from "@/components/taxme/Article";
import type { ArticleData } from "@/components/taxme/ArticleData";

const articleData: ArticleData = {
    title: "Beziehungen zum Bund",
    subtitle: "Mitwirkung an der Bundespolitik",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Der Kanton Alpengrün bringt seine Positionen und Interessen aktiv
                in die nationale Politik ein und arbeitet eng mit Bundesstellen
                zusammen.
            </p>

            <p className="mt-3">
                Dies betrifft insbesondere Gesetzgebungsverfahren,
                Vernehmlassungen und die Koordination bei kantonsübergreifenden
                Themen.
            </p>

            <p className="mt-3">
                Zurück zur Übersicht: {" "}
                <Link href="/start/communication" color="primary">
                    Kommunikation und Aussenbeziehungen
                </Link>
            </p>
        </>
    ),
};

export default function Page() {
    return <Article data={articleData} />;
}