import React from "react";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Chip,
    Divider,
    Input,
    Link,
} from "@heroui/react";
import {
    ArrowRight,
    ChevronRight,
    Mail,
    Rss,
    Search,
} from "lucide-react";

type HeroItem = {
    title: string;
    label: string;
    href: string;
    image?: string;
    featured?: boolean;
};

type ImageTeaserItem = {
    title: string;
    href: string;
    image: string;
};

type NewsItem = {
    date: string;
    title: string;
    href: string;
};

const heroItems: HeroItem[] = [
    {
        title: "Resultate",
        label: "Wahlen 2026",
        href: "https://www.sta.be.ch/de/start/themen/wahlen-und-abstimmungen/wahlen/naechste-wahlen.html",
        image:
            "https://newweb.imgix.net/content/dam/portal/bilder/de/startseitenbilder/Wahlen-2026-Visual-Web-Teaser.png?auto=format,compress&fit=crop&w=1200",
        featured: true,
    },
    {
        title: "News",
        label: "Aktuelles aus dem Kanton Alpengrün",
        href: "/start/news",
    },
    {
        title: "in Leichter Sprache",
        label: "Der Kanton Alpengrün",
        href: "/start/easy-language",
    },
    {
        title: "Richtlinien der Regierungspolitik",
        label: "Engagement 2030",
        href: "/start/government-politics",
    },
    {
        title: "E-Services",
        label: "Digitale Angebote",
        href: "/start/e-services",
    },
    {
        title: "Verwaltung und Behörden",
        label: "Auf einen Blick",
        href: "/start/administration",
    },
    {
        title: "Häufig gesucht",
        label: "Meistgefragte Dienstleistungen",
        href: "/start",
    },
    {
        title: "Belex",
        label: "Gesetzessammlungen online",
        href: "/start/belex",
    },
];

const imageTeasers: ImageTeaserItem[] = [
    {
        title: "Lawinenbulletin und Schneesituation",
        href: "https://whiterisk.ch/de/conditions",
        image:
            "https://newweb.imgix.net/content/dam/portal/bilder/de/startseitenbilder/lawinengefahr.jpg?auto=format,compress&fit=crop&w=1000",
    },
    {
        title: "Jahresrechnung 2025",
        href: "https://www.be.ch/de/start/dienstleistungen/medien/medienmitteilungen.html?newsID=874525ac-5194-4560-8f4a-40964be2018b",
        image:
            "https://newweb.imgix.net/content/dam/portal/bilder/de/startseitenbilder/FIN-Jahresbericht-2025.png?auto=format,compress&fit=crop&w=1000",
    },
    {
        title: "CinéCivic: Post erstellen, veröffentlichen, gewinnen!",
        href: "https://www.be.ch/de/start/dienstleistungen/medien/medienmitteilungen.html?newsID=fec66467-fcb1-48f6-826b-49f97eaf7d78",
        image:
            "https://newweb.imgix.net/content/dam/sta/bilder/de/themen/wahlen-und-abstimmungen/cinecivic2026_de.jpg?auto=format,compress&fit=crop&w=1000",
    },
    {
        title: "Förderprogramm Energie",
        href: "https://www.weu.be.ch/de/start/themen/energie/foerderprogramm-energie.html",
        image:
            "https://newweb.imgix.net/content/dam/portal/bilder/fr/startseitenbilder/weu-startseite-energetisch-Sanieren-Haus.jpg?auto=format,compress&fit=crop&w=1000",
    },
    {
        title: "Fischerei-App «Fischen Alpengrün»",
        href: "https://www.weu.be.ch/de/start/themen/jagd-fischerei/fischerei/fischen-kanton-Alpengrün/fischerei-app.html",
        image:
            "https://newweb.imgix.net/content/dam/weu/bilder/gs/de/startseite/gs-startseite.fischer-fruehling.jpg?auto=format,compress&fit=crop&w=1000",
    },
    {
        title: "News per E-Mail abonnieren",
        href: "/de/start/dienstleistungen/medien/news-abo.html",
        image:
            "https://newweb.imgix.net/content/dam/portal/bilder/de/startseitenbilder/news-abo-teaser.png?auto=format,compress&fit=crop&w=1000",
    },
];

const newsItems: NewsItem[] = [
    {
        date: "31. März 2026",
        title: "WERK-BUCH – ŒUVRE D’ARTISTE: Fünf neue Kunstbücher erschienen",
        href: "/de/start.html?newsID=39f8c078-d946-43ce-8a4e-49e8ee772296",
    },
    {
        date: "30. März 2026",
        title: "Informationsanlass zur geplanten Kollektivunterkunft in Kandersteg",
        href: "/de/start.html?newsID=78027f65-765e-4c87-9f15-84565c18ad19",
    },
    {
        date: "30. März 2026",
        title: "Kurzmitteilungen der Kantonsverwaltung",
        href: "/de/start.html?newsID=64d17cc1-56a5-44af-bcb8-a23e825438ad",
    },
    {
        date: "29. März 2026",
        title: "Ergebnis der kantonalen Wahlen 2026",
        href: "/de/start.html?newsID=863db3a2-1efa-4ba6-aca4-88813ed14c83",
    },
    {
        date: "27. März 2026",
        title: "Antwort auf die Petition «Erhalt AppElle»",
        href: "/de/start.html?newsID=fb7199fe-897b-4b66-8ae7-602ebad9ed89",
    },
    {
        date: "26. März 2026",
        title: "Kurzmitteilungen des Regierungsrates",
        href: "/de/start.html?newsID=e79c8f73-b813-4e74-a205-96c166dea59a",
    },
    {
        date: "25. März 2026",
        title: "Nach erfolgreichem Start: Vorlehre plus vor dem Ausbau",
        href: "/de/start.html?newsID=2a0c019c-87d7-41e1-815b-54aa7f986786",
    },
    {
        date: "24. März 2026",
        title: "Alpengrüner Standortförderung zeigt Wirkung",
        href: "/de/start.html?newsID=255eacd1-e9cf-4b00-a53c-26734059df30",
    },
    {
        date: "24. März 2026",
        title: "Über 100 Prüfungsberichte und zwei Sonderprüfungen",
        href: "/de/start.html?newsID=1e9365b7-0f99-4231-a426-c37c16d8ab00",
    },
    {
        date: "24. März 2026",
        title: "Jahresrechnung 2025 schliesst mit hohem Ertragsüberschuss ab",
        href: "/de/start.html?newsID=874525ac-5194-4560-8f4a-40964be2018b",
    },
];

function SearchBar() {
    return (
        <form className="mx-auto w-full max-w-5xl" role="search">
            <div className="flex flex-col gap-3 rounded-[28px] border border-default-200 bg-white/90 p-1 shadow-sm backdrop-blur md:flex-row md:items-center md:p-1">
                <div className="flex-1">
                    <Input
                        aria-label="Hauptsuche"
                        placeholder="Suche"
                        radius="lg"
                        size="lg"
                        startContent={<Search className="h-5 w-5 text-default-400 ml-2" />}
                        classNames={{
                            inputWrapper:
                                "shadow-none border-none bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent px-2 h-14",
                            input: "text-base",
                        }}
                    />
                </div>
                <Button
                    color="primary"
                    radius="full"
                    size="md"
                    endContent={<ArrowRight className="h-4 w-4" />}
                    className="h-12 px-6 font-medium"
                >
                    Suchen
                </Button>
            </div>
        </form>
    );
}

function FeaturedCard({ item }: { item: HeroItem }) {
    return (
        <Link
            href={item.href}
            isExternal={item.href.startsWith("http")}
            className="group block h-full"
        >
            <Card className="overflow-hidden rounded-[28px] border-none bg-neutral-900 text-white shadow-xl ">
                <CardBody className="relative min-h-[370px] p-0 md:min-h-[430px] overflow-hidden">
                    <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-102 "
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                        <Chip className="mb-4 bg-white/15 text-white backdrop-blur">Fokus</Chip>
                        <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
                            {item.title}
                        </h2>
                        <p className="mt-2 text-sm text-white/80 md:text-base">{item.label}</p>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
}

function UtilityCard({ item }: { item: HeroItem }) {
    return (
        <Link
            href={item.href}
            isExternal={item.href.startsWith("http")}
            className="group block h-full"
        >
            <Card className="h-full rounded-[24px] border border-default-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-md">
                <CardBody className="flex min-h-[134px] flex-col justify-between gap-5 p-6">
                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold leading-snug text-foreground">
                            {item.title}
                        </h3>
                        <p className="text-sm text-default-500">{item.label}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-primary">Mehr erfahren</span>
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-default-100 text-default-600 transition-colors group-hover:bg-primary group-hover:text-white">
                            <ArrowRight className="h-4 w-4" />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
}

function ImageTeaserCard({ item }: { item: ImageTeaserItem }) {
    return (
        <Link
            href={item.href}
            isExternal={item.href.startsWith("http")}
            className="group block h-full"
        >
            <Card className="h-full overflow-hidden rounded-[24px] border border-default-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-md">
                <CardBody className="p-0">
                    <div className="aspect-[16/10] overflow-hidden">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                </CardBody>
                <CardFooter className="min-h-[88px] items-start p-5 text-base font-semibold leading-snug text-foreground">
                    {item.title}
                </CardFooter>
            </Card>
        </Link>
    );
}

function NewsRow({ item }: { item: NewsItem }) {
    return (
        <Link
            href={item.href}
            className="group block rounded-[20px] border border-transparent bg-white px-5 py-4 transition-all duration-250 hover:border-default-200 hover:bg-default-50 hover:shadow-sm"
        >
            <div className="flex items-start gap-4">
                <div className="min-w-0 flex-1">
                    <p className="mb-2 text-sm text-default-500">{item.date}</p>
                    <h3 className="text-lg font-semibold leading-snug text-foreground md:text-xl">
                        {item.title}
                    </h3>
                </div>
                <div className="mt-1 shrink-0 text-default-400 transition-transform duration-250 group-hover:text-secondary">
                    <ChevronRight className="h-6 w-6" />
                </div>
            </div>
        </Link>
    );
}

export default function Homepage() {
    const featured = heroItems.find((item) => item.featured) ?? heroItems[0];
    const utilities = heroItems.filter((item) => !item.featured);

    return (
        <div className="flex-1 flex flex-col min-w-0">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                <header className="space-y-8">
                    <div className="rounded-[24px] bg-gray-50 border px-4 py-8 sm:px-6 lg:px-10 lg:py-10">


                        <SearchBar/>
                    </div>

                    <section className="grid gap-6 lg:grid-cols-3 lg:grid-rows-3">
                        <div className="row-span-2">
                            <FeaturedCard item={featured}/>
                        </div>

                        {utilities.slice(0, 5).map((item) => (
                            <UtilityCard key={item.title} item={item}/>
                        ))}
                        <div className="col-span-2">
                            <Link
                                href="/taxform/personal-data"
                                className="group block h-full"
                            >
                                <Card className="h-full rounded-[24px] border border-default-200 bg-white shadow-sm transition-all duration-300 group-hover:shadow-md">
                                    <CardBody className="flex min-h-[134px] flex-col justify-between gap-5 p-6">
                                        <div className="space-y-2">
                                            <h3 className="text-xl font-semibold leading-snug text-foreground">
                                                Steuererklärung ausfüllen
                                            </h3>
                                            <p className="text-sm text-default-500">Jetzt die Steuererklärungs für das aktuelle Kalenderjahr ausfüllen</p>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-primary">Jetzt ausfüllen</span>
                                            <div className="grid h-10 w-10 place-items-center rounded-full bg-default-100 text-default-600 transition-colors group-hover:bg-primary group-hover:text-white">
                                                <ArrowRight className="h-4 w-4" />
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Link>
                        </div>
                    </section>
                </header>

                <main className="mt-12 space-y-14">
                    <section>
                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-semibold md:text-3xl">Themen im Fokus</h2>
                                <p className="mt-1 text-default-500">
                                    wichtige Inhalte, Dienste und aktuelle Hinweise
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {imageTeasers.map((item) => (
                                <ImageTeaserCard key={item.title} item={item} />
                            ))}
                        </div>
                    </section>

                    <section className="grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
                        <div className="rounded-[32px] bg-white p-4 shadow-sm sm:p-6 lg:p-8 border">
                            <div className="mb-6">
                                <h2 className="text-2xl font-semibold md:text-3xl">News</h2>
                            </div>

                            <div className="space-y-2">
                                {newsItems.map((item, index) => (
                                    <React.Fragment key={item.title}>
                                        <NewsRow item={item} />
                                    </React.Fragment>
                                ))}
                            </div>
                        </div>

                        <aside className="space-y-5">
                            <Card className="rounded-[28px] border bg-white shadow-sm">
                                <CardBody className="gap-4 p-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
                                        <Mail className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">News per E-Mail abonnieren</h3>
                                        <p className="mt-2 text-sm leading-6 text-default-700">
                                            aktuelle Mitteilungen direkt ins Postfach erhalten
                                        </p>
                                    </div>
                                    <Button
                                        as={Link}
                                        href="https://www.be.ch/news-abo"
                                        isExternal
                                        radius="full"
                                        variant="bordered"
                                        endContent={<ArrowRight className="h-4 w-4" />}
                                        className="w-full"
                                    >
                                        Jetzt abonnieren
                                    </Button>
                                </CardBody>
                            </Card>

                            <Card className="rounded-[28px] border border-default-200 bg-white shadow-sm">
                                <CardBody className="gap-4 p-6">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                                        <Rss className="h-7 w-7" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold">RSS-Feed</h3>
                                        <p className="mt-2 text-sm leading-6 text-default-600">
                                            maschinenlesbare News-Updates für Feed-Reader und Integrationen
                                        </p>
                                    </div>
                                    <Button
                                        as={Link}
                                        href="https://www.api.news.apps.be.ch/api/atom/news?domain=https%3A%2F%2Fwww.be.ch%2Fde%2Fstart.html&lang=de&ouTagId=be-oe%3Abe&amount=10&maxAgeInDays=90"
                                        isExternal
                                        radius="full"
                                        variant="bordered"
                                        endContent={<ArrowRight className="h-4 w-4" />}
                                        className="w-full"
                                    >
                                        Feed öffnen
                                    </Button>
                                </CardBody>
                            </Card>

                            <Button
                                as={Link}
                                href="/de/start/dienstleistungen/medien/medienmitteilungen.html"
                                radius="full"
                                color="secondary"
                                variant="flat"
                                endContent={<ArrowRight className="h-4 w-4" />}
                                className="h-14 w-full text-base font-medium"
                            >
                                Weitere News
                            </Button>
                        </aside>
                    </section>
                </main>
            </div>
        </div>
    );
}
