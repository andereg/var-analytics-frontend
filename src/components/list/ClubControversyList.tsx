import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    Avatar,
    Listbox,
    ListboxItem,
    Chip,
    Link,
    Spinner,
} from "@heroui/react";

// adjust these paths
import {getClubById} from "@/api/clubs";
import type {Club} from "@/api/types";

function formatDate(iso: string) {
    // "2025-09-21T00:00:00" -> "2025-09-21"
    return iso?.split("T")?.[0] ?? iso;
}

export default function ClubControversiesList() {
    const CLUB_ID = 36;

    const [club, setClub] = useState<Club | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                setErrorMsg(null);

                const data = await getClubById(CLUB_ID);
                if (!mounted) return;

                setClub(data);
            } catch (e: any) {
                if (!mounted) return;
                setErrorMsg(e?.message ?? "failed to load club");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
                <Spinner label="loading..."/>
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div className="min-h-screen bg-gray-100 p-6">
                <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow">
                    <p className="text-sm text-red-700">error: {errorMsg}</p>
                </div>
            </div>
        );
    }

    if (!club) return null;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto w-full max-w-3xl">
                <Card className="rounded-2xl shadow-xl">
                    <CardBody className="p-6">
                        {/* header */}
                        <div className="flex items-center gap-3">
                            <Avatar src={club.logo} name={club.name} className="h-10 w-10"/>
                            <div>
                                <h2 className="text-xl font-semibold">{club.name}</h2>
                                <p className="text-sm text-gray-600">{club.description}</p>
                            </div>

                            <Chip
                                classNames={{
                                    base: "ml-auto bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                                    content: "drop-shadow-xs shadow-black text-white",
                                }}
                                variant="shadow"
                            >
                                {club.abbreviation}
                            </Chip>
                        </div>

                        {/* list */}
                        <div className="mt-6">
                            <div className="mb-2 text-sm text-gray-600">
                                Benefited decisions ({club.forControversies?.length ?? 0})
                            </div>

                            <Listbox aria-label="club controversies" variant="bordered">
                                {(club.forControversies ?? []).map((c) => (
                                    <ListboxItem key={c.id} textValue={c.description}>
                                        <div className="flex items-start gap-3">
                                            {/* opponent (victim) */}
                                            <Avatar
                                                src={c.victim?.logo}
                                                name={c.victim?.name}
                                                className="h-9 w-9"
                                            />

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
    <span className="text-sm font-semibold">
       {c.beneficiary?.name} vs {c.victim?.name}
    </span>

                                                    <Chip className="ml-auto" size="sm" variant="bordered" color="secondary">
                                                        {c.controversyType?.code}
                                                    </Chip>

                                                    {/*<Chip size="sm" variant="bordered">*/}
                                                    {/*    {c.season?.seasonName}*/}
                                                    {/*</Chip>*/}
                                                    <Chip size="sm" variant="bordered">
                                                        {formatDate(c.date)}
                                                    </Chip>
                                                </div>

                                                <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                                                    {c.description}
                                                </p>

                                                <div className="mt-2 flex items-center gap-2">
                                                    <Avatar
                                                        src={c.competition?.logo}
                                                        name={c.competition?.name}
                                                        className="h-6 w-6"
                                                    />
                                                    <span className="text-xs text-gray-600">
                                                    {c.competition?.name}
                                                    </span>
                                                    <span className="mx-2 text-xs text-gray-300">•</span>
                                                    <Link href={c.referenceLink} isExternal size="sm">
                                                        source
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </ListboxItem>
                                ))}
                            </Listbox>
                        </div>

                        {/* list */}
                        <div className="mt-6">
                            <div className="mb-2 text-sm text-gray-600">
                                Adverse decisions ({club.againstControversies?.length ?? 0})
                            </div>

                            <Listbox aria-label="club controversies" variant="bordered">
                                {(club.againstControversies ?? []).map((c) => (
                                    <ListboxItem key={c.id} textValue={c.description}>
                                        <div className="flex items-start gap-3">
                                            {/* opponent (victim) */}
                                            <Avatar
                                                src={c.beneficiary?.logo}
                                                name={c.beneficiary?.name}
                                                className="h-9 w-9"
                                            />

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
    <span className="text-sm font-semibold">
        {c.victim?.name} vs {c.beneficiary?.name}
    </span>

                                                    <Chip size="sm" variant="bordered"
                                                          className="bg-gray-100 text-gray-800">
                                                        {c.controversyType?.code}
                                                    </Chip>

                                                    <Chip size="sm" variant="bordered">
                                                        {c.season?.seasonName}
                                                    </Chip>

                                                    <span className="text-xs text-gray-500">
        {formatDate(c.date)}
    </span>
                                                </div>

                                                <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                                                    {c.description}
                                                </p>

                                                <div className="mt-2 flex items-center gap-2">
                                                    <Avatar
                                                        src={c.competition?.logo}
                                                        name={c.competition?.name}
                                                        className="h-6 w-6"
                                                    />
                                                    <span className="text-xs text-gray-600">
        {c.competition?.name}
        </span>

                                                    <span className="mx-2 text-xs text-gray-300">•</span>

                                                    <Link href={c.referenceLink} isExternal size="sm">
                                                        source
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </ListboxItem>
                                ))}
                            </Listbox>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}