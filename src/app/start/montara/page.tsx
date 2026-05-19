"use client";

import {Article} from "@/components/taxme/Article";

import { Link } from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";

function handleCrosssiteClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const id = generateId();

    const link = new URL("http://10.248.11.106:3002");
    link.searchParams.set("anon_id", id);

    if (window.umami) {
        window.umami.identify(id);
    }

    event.currentTarget.href = link.toString();
}

function generateId(): string {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    const bytes = new Uint8Array(16);

    if (
        typeof crypto !== "undefined" &&
        typeof crypto.getRandomValues === "function"
    ) {
        crypto.getRandomValues(bytes);
    } else {
        // last-resort fallback
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = Math.floor(Math.random() * 256);
        }
    }

    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;

    const hex = [...bytes].map((b) => b.toString(16).padStart(2, "0"));

    return [
        hex.slice(0, 4).join(""),
        hex.slice(4, 6).join(""),
        hex.slice(6, 8).join(""),
        hex.slice(8, 10).join(""),
        hex.slice(10, 16).join(""),
    ].join("-");
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