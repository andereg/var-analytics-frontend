"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardBody, CardHeader, Input, Link } from "@heroui/react";
import {Search as SearchIcon, ChevronRight, ArrowRight} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ArticleData } from "@/components/taxme/ArticleData";
import Breadcrumb from "@/components/steppers/Breadcrumb";
import AlpengrunHeader from "@/components/taxme/alpengrün-header";
import posthog from "posthog-js";
import {usePostHog} from "posthog-js/react";

const articles: ArticleData[] = [
    {
        title: "Steuererklärung 2026",
        subtitle: "Jetzt online im Kanton Alpengrün erledigen",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
        content: (
            <>
                <p>
                    Im Kanton Alpengrün kannst du deine Steuererklärung bequem online ausfüllen
                    und einreichen.
                </p>
            </>
        ),
        ref: "/start/taxform",
    },
    {
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
            </>
        ),
        ref: "/start/greenenergy",
    },
    {
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
            </>
        ),
        ref: "/start/e-services",
    },
    {
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
            </>
        ),
        ref: "/start/education",
    },
    {
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
            </>
        ),
        ref: "/start/mobility",
    },
    {
        title: "Kommunikation Kanton Alpengrün",
        subtitle: "Aktuelle Informationen und Dienstleistungen",
        author: "Kanton Alpengrün",
        date: "18. März 2026",
        content: (
            <>
                <p>
                    Internationale und nationale Beziehungen, Medienarbeit,
                    Öffentlichkeitsarbeit sowie die Pflege der digitalen Kanäle.
                </p>
            </>
        ),
        ref: "/start/communication",
    },
    {
        title: "Verwaltung und Behörden",
        subtitle: "Struktur und Organisation im Überblick",
        author: "Kanton Alpengrün",
        date: "26. März 2026",
        content: (
            <>
                <p>
                    Der Kanton Alpengrün ist in verschiedene Direktionen und Behörden
                    gegliedert, die gemeinsam die öffentliche Verwaltung bilden.
                </p>

                <p className="mt-3">
                    Hier findest du alle wichtigen Informationen zu Zuständigkeiten,
                    Organisation und Ansprechpartnern.
                </p>

                <p className="mt-3">
                    <Link href="#" color="primary">
                        Zur Übersicht der Behörden
                    </Link>
                </p>
            </>
        ),
        ref: "/start/communication/administration",
    },
    {
        title: "Barrierefreiheit",
        subtitle: "Digitale Zugänglichkeit für alle Menschen",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
        content: (
            <>
                <p>
                    Der Kanton Alpengrün setzt sich dafür ein, dass digitale Angebote
                    für alle Menschen zugänglich sind – unabhängig von körperlichen
                    oder technischen Einschränkungen.
                </p>

                <p className="mt-3">
                    Dazu gehören klare Strukturen, gute Lesbarkeit, alternative
                    Beschreibungen sowie technische Standards für barrierefreie
                    Web-Angebote.
                </p>

                <p className="mt-3">
                    Zurück zur Übersicht: {" "}
                    <Link href="/start/communication" color="primary">
                        Kommunikation und Aussenbeziehungen
                    </Link>
                </p>
            </>
        ),
        ref: "/start/communication/accessibility",
    },
    {
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
        ref: "/start/communication/federal-relations",
    },{
        title: "Interkantonale Beziehungen",
        subtitle: "Zusammenarbeit mit anderen Kantonen",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
        content: (
            <>
                <p>
                    Der Kanton Alpengrün arbeitet in vielen Bereichen aktiv mit
                    anderen Kantonen zusammen, etwa in Bildung, Infrastruktur,
                    Sicherheit und Digitalisierung.
                </p>

                <p className="mt-3">
                    Ziel ist es, gemeinsame Herausforderungen effizient zu lösen und
                    Synergien im Interesse der Bevölkerung zu nutzen.
                </p>

                <p className="mt-3">
                    Zurück zur Übersicht: {" "}
                    <Link href="/start/communication" color="primary">
                        Kommunikation und Aussenbeziehungen
                    </Link>
                </p>
            </>
        ),
            ref: "/start/communication/intercantonal-relations",
    },
    {
        title: "Beziehungen zum Ausland",
        subtitle: "Internationale Zusammenarbeit und Partnerschaften",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
        content: (
            <>
                <p>
                    Der Kanton Alpengrün pflegt internationale Beziehungen zu
                    Partnerregionen, Botschaften und Organisationen.
                </p>

                <p className="mt-3">
                    Im Fokus stehen Wissenstransfer, Standortpflege, kultureller
                    Austausch und die Zusammenarbeit bei globalen Themen.
                </p>

                <p className="mt-3">
                    Zurück zur Übersicht: {" "}
                    <Link href="/start/communication" color="primary">
                        Kommunikation und Aussenbeziehungen
                    </Link>
                </p>
            </>
        ),
        ref: "/start/communication/international-relations",
    },
    {
        title: "Indirekte Medienförderung",
        subtitle: "Förderung der Medienvielfalt im Kanton Alpengrün",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
        content: (
            <>
                <p>
                    Eine vielfältige Medienlandschaft ist wichtig für Demokratie,
                    Transparenz und die öffentliche Meinungsbildung.
                </p>

                <p className="mt-3">
                    Der Kanton Alpengrün unterstützt deshalb indirekte Massnahmen,
                    die unabhängige Information und regionale Medienangebote stärken.
                </p>

                <p className="mt-3">
                    Zurück zur Übersicht: {" "}
                    <Link href="/start/communication" color="primary">
                        Kommunikation und Aussenbeziehungen
                    </Link>
                </p>
            </>
        ),
        ref: "/start/communication/media-support",
    },
    {
        title: "Kommunikation mit der Öffentlichkeit",
        subtitle: "Regierungskommunikation, Medien und Öffentlichkeitsarbeit",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
        content: (
            <>
                <p>
                    Der Kanton Alpengrün informiert die Öffentlichkeit transparent,
                    verständlich und aktuell über politische Entscheide, Projekte und
                    Dienstleistungen.
                </p>

                <p className="mt-3">
                    Dazu gehören Regierungskommunikation, Medienarbeit,
                    Öffentlichkeitsarbeit, Corporate Design sowie die Pflege der
                    digitalen Kanäle.
                </p>

                <p className="mt-3">
                    Zurück zur Übersicht: {" "}
                    <Link href="/start/communication" color="primary">
                        Kommunikation und Aussenbeziehungen
                    </Link>
                </p>
            </>
        ),
        ref: "/start/communication/publicpress",
    },
    {
        title: "Kanton Montara Portal",
        subtitle: "Das Portal des Kantons Montara, Partnerkantone, Informationen und Dienstleistungen",
        author: "Kanton Alpengrün",
        date: "31. März 2026",
        content: (
            <>
                <p>
                    Der Kanton Montara ist ein Partnerkanton von Alpengrün, der ebenfalls eine benutzerfreundliche Online-Steuererklärung anbietet. Wenn du in Montara wohnst oder dort steuerpflichtig bist, kannst du deine Steuererklärung direkt über die Plattform von Montara ausfüllen und einreichen.
                </p>
            </>
        ),
        ref: "/start/montara",
    }
];

interface ArticleOverviewCardProps {
    article: ArticleData;
    href: string;
}

const ArticleOverviewCard: React.FC<ArticleOverviewCardProps> = ({ article, href }) => {
    // Helper used in both submit and click to capture posthog article_search

    return (
        <Link href={href} className="block h-full">
            <Card
                isPressable
                className="h-full w-full rounded-3xl border border-default-200 shadow-none transition-shadow hover:shadow-md"
            >
                <CardBody className="p-6">
                    <div className="flex h-full flex-col justify-between gap-4">
                        <div className="space-y-3">
                            <div className="flex flex-wrap items-center gap-2 text-sm text-default-400">
                                {article.author && <span>{article.author}</span>}
                                {article.date && <span>• {article.date}</span>}
                            </div>

                            <div>
                                <h2 className="text-xl font-semibold leading-tight">
                                    {article.title}
                                </h2>

                                {article.subtitle && (
                                    <p className="mt-2 text-sm text-default-500">
                                        {article.subtitle}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div className="ml-auto flex items-center gap-1 text-sm font-medium text-primary">
                                <span>Öffnen</span>
                                <ChevronRight size={16} />
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
};

export default function SearchPage() {
    const posthog = usePostHog();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentQuery = searchParams.get("q") ?? "";
    const [searchValue, setSearchValue] = useState(currentQuery);

    useEffect(() => {
        setSearchValue(currentQuery);
    }, [currentQuery]);

    const filteredArticles = useMemo(() => {
        const query = currentQuery.trim().toLowerCase();


        if (!query) {
            return articles;
        }


        const filteredArticles = articles.filter((article) => {
            const searchableText = [
                article.title,
                article.subtitle,
                article.author,
                article.date,
                typeof article.content === "string" ? article.content : "",
            ]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();

            return searchableText.includes(query);
        });

        posthog.capture('article_search', {
            query: query.trim(),
            result_count: filteredArticles.length
        })

        return filteredArticles;
    }, [currentQuery]);

    const updateSearchInUrl = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());

        if (value.trim()) {
            params.set("q", value.trim());
        } else {
            params.delete("q");
        }

        router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
    };

    return (
    <div className="min-h-screen bg-white ">
        <AlpengrunHeader />
        <div className="mx-auto max-w-6xl pt-6">
                <Card className="rounded-3xl border border-default-200 shadow-lg">
                    <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                        <Breadcrumb />

                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">Search</h1>

                            <p className="max-w-4xl text-sm text-default-500">
                                Suche nach Informationen, Dienstleistungen und aktuellen Themen
                                des Kantons Alpengrün.
                            </p>
                        </div>
                    </CardHeader>

                    <CardBody className="px-6 pb-8 pt-2 md:px-8">
                        <div className="mb-8">
                            <Input
                                size="lg"
                                radius="lg"
                                placeholder="z. B. Steuern, Energie, Mobilität ..."
                                startContent={<SearchIcon size={18} className="text-default-400" />}
                                endContent={<button
                                    onClick={() => updateSearchInUrl(searchValue)}
                                    className="rounded-xl h-6 w-6 bg-primary px-1 py-1 text-md font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
                                >
                                    <ArrowRight className="h-4 w-4" />
                                </button>}
                                value={searchValue}
                                onValueChange={setSearchValue}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        updateSearchInUrl(searchValue);
                                    }
                                }}
                                classNames={{
                                    inputWrapper:
                                        "border bg-white border-default-100 shadow-none data-[hover=true]:border-default-200 group-data-[focus=true]:border-secondary",
                                }}
                            />
                        </div>

                        {filteredArticles.length > 0 ? (
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                                {filteredArticles.map((article) => (
                                    <ArticleOverviewCard
                                        key={article.title}
                                        article={article}
                                        href={`${article.ref}`}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="rounded-2xl border border-dashed border-default-300 px-6 py-10 text-center">
                                <h2 className="text-lg font-semibold">Keine Treffer gefunden</h2>
                                <p className="mt-2 text-sm text-default-500">
                                    Für deine Suche nach{" "}
                                    <span className="font-medium text-foreground">
                                        {currentQuery}
                                    </span>{" "}
                                    wurden keine passenden Inhalte gefunden.
                                </p>
                            </div>
                        )}
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}