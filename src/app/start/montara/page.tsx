"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";

function handleCrosssiteClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const id = crypto.randomUUID();

    const link = new URL("http://10.248.11.106:3002");
    link.searchParams.set("anon_id", id);

    if (window.umami) {
        window.umami.identify(id);
    }

    event.currentTarget.href = link.toString();
}

const article: ArticleData = {
    title: "Kanton Montara",
    subtitle: "Partnerkantone",
    author: "Kanton Alpengrün",
    date: "31. März 2026",
    content: (
        <>
            <p>
                Der Kanton Montara ist ein Partnerkanton von Alpengrün, der ebenfalls eine benutzerfreundliche Online-Steuererklärung anbietet. Wenn du in Montara wohnst oder dort steuerpflichtig bist, kannst du deine Steuererklärung direkt über die Plattform von Montara ausfüllen und einreichen.
            </p>

            <p className="mt-3">
                Weitere Infos hier:{" "}
                <Link
                    href="https://site-b.com/signup"
                    target="_blank"
                    color="primary"
                    onClick={handleCrosssiteClick}
                >
                    Portal des Kantons Montara
                </Link>
            </p>

            <p className="mt-3">
                Der digitale Prozess in Montara ist ähnlich benutzerfreundlich wie in Alpengrün, mit klaren Anleitungen
                und Unterstützung, um sicherzustellen, dass du deine Steuererklärung korrekt und effizient einreichen
                kannst.
            </p>
        </>
    ),
};

export default function Page() {

    return (
        <Article data={article} />
    );
}