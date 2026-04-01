import {useRouter} from "next/navigation";
import React, {useMemo, useState} from "react";
import {Button, Input, Link} from "@heroui/react";
import {ArrowRight, Search} from "lucide-react";
import { usePostHog } from 'posthog-js/react'

const SEARCH_PAGES = [
    { label: "Administration", href: "/start/administration" },
    { label: "Kommunikation", href: "/start/communication" },
    { label: "Barrierefreiheit", href: "/start/communication/accessibility" },
    { label: "Beziehungen zum Bund", href: "/start/communication/federal-relations" },
    { label: "Interkantonale Beziehungen", href: "/start/communication/intercantonal" },
    { label: "Beziehungen zum Ausland", href: "/start/communication/international-relations" },
    { label: "Indirekte Medienförderung", href: "/start/communication/media-support" },
    { label: "Kommunikation mit der Öffentlichkeit", href: "/start/communication/publicpress" },
    { label: "E-Services", href: "/start/e-services" },
    { label: "Leichte Sprache", href: "/start/easy-language" },
    { label: "Bildung", href: "/start/education" },
    { label: "Wahlen 2026", href: "/start/elections" },
    { label: "Regierungspolitik", href: "/start/government-politics" },
    { label: "Förderprogramm Energie", href: "/start/greenenergy" },
    { label: "Mobilität", href: "/start/mobility" },
    { label: "News", href: "/start/news" },
    { label: "Steuerformular", href: "/start/taxform" },
];

export default function SearchBar() {
    const posthog = usePostHog()

    const router = useRouter();
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const suggestions = useMemo(() => {
        const q = query.trim().toLowerCase();

        if (!q) return SEARCH_PAGES.slice(0, 6);

        return SEARCH_PAGES.filter((page) => {
            const haystack = `${page.label} ${page.href}`.toLowerCase();
            return haystack.includes(q);
        }).slice(0, 8);
    }, [query]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (suggestions.length > 0) {
            router.push(suggestions[0].href);
        }
    };

    return (
        <form
            className="mx-auto w-full max-w-5xl"
            role="search"
            onSubmit={handleSubmit}
        >
            <div className="relative">
                <div className="flex flex-col gap-3 rounded-[28px] border border-default-200 bg-white/90 p-1 shadow-sm backdrop-blur md:flex-row md:items-center md:p-1">
                    <div className="flex-1">
                        <Input
                            aria-label="Hauptsuche"
                            placeholder="Suche"
                            radius="lg"
                            size="lg"
                            value={query}
                            onValueChange={setQuery}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => {
                                setTimeout(() => setIsFocused(false), 150);
                            }}
                            startContent={
                                <Search className="ml-2 h-5 w-5 text-default-400" />
                            }
                            classNames={{
                                inputWrapper:
                                    "shadow-none border-none bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-2 h-14",
                                input: "text-base",
                            }}
                        />
                    </div>

                    <Button
                        type="submit"
                        color="primary"
                        radius="full"
                        size="md"
                        endContent={<ArrowRight className="h-4 w-4" />}
                        className="h-12 px-6 font-medium"
                    >
                        Suchen
                    </Button>
                </div>

                {isFocused && suggestions.length > 0 && (
                    <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-3xl border border-default-200 bg-white shadow-lg">
                        <div className="max-h-96 overflow-y-auto p-2">
                            {suggestions.map((suggestion) => (
                                <Link
                                    key={suggestion.href}
                                    href={suggestion.href}
                                    className="block rounded-2xl px-4 py-3 text-foreground transition-colors hover:bg-default-100"
                                >
                                    <div className="flex items-center justify-between gap-4">
                                        <div className="min-w-0">
                                            <p className="truncate text-sm font-medium">
                                                {suggestion.label}
                                            </p>

                                        </div>

                                        <ArrowRight className="h-4 w-4 flex-shrink-0 text-default-400" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </form>
    );
}