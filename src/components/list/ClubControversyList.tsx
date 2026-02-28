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
import { Link2 } from "lucide-react";

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
            {/* club analytics card  */}
            <div className="mx-auto w-full max-w-3xl mb-4">
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

                    </CardBody>
                </Card>
            </div>
            {/* list for */}
            <div className="mx-auto w-full max-w-3xl mb-4">
                <Card className="rounded-2xl shadow-xl">
                    <CardBody className="p-6">
                        <div className="mt-6">
                            <div className="mb-2 text-lg font-medium">
                                {club.forControversies?.length ?? 0} benefited decisions
                            </div>

                            <Listbox aria-label="club controversies" variant="bordered">
                                {(club.forControversies ?? []).map((c) => (
                                    <ListboxItem key={c.id} textValue={c.description}>
                                        <div className="flex items-start gap-3">
                                            {/* opponent (victim) */}
                                            <div className="flex items-center">
                                                <img
                                                    src={c.beneficiary?.logo}
                                                    alt="second"
                                                    className="w-10 h-10 rounded-full border-0"
                                                />
                                                <img
                                                    src={c.victim?.logo}
                                                    alt="first"
                                                    className="-ml-5 w-10 h-10 rounded-full border-0 z-10"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <span className="text-sm font-semibold">
                                                       {c.beneficiary?.name} vs {c.victim?.name}
                                                    </span>

                                                    <Chip className="ml-auto" size="sm" variant="bordered"
                                                          color="secondary">
                                                        {c.controversyType?.code}
                                                    </Chip>
                                                    <Chip size="sm" variant="bordered">
                                                        {formatDate(c.date)}
                                                    </Chip>
                                                </div>

                                                <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                                                    {c.description}
                                                </p>

                                                <div className="mt-2 flex items-center gap-2">
                                                    <div className="flex gap-4">
                                                        <Chip
                                                            avatar={<Avatar
                                                                src={c.competition?.logo}
                                                                name={c.competition?.name}
                                                            />}
                                                            variant="bordered"
                                                        >
                                                            <span className="text-xs text-gray-600 ml-1">
                                                            {c.competition?.name}
                                                            </span>
                                                        </Chip>
                                                    </div>


                                                    <Link href={c.referenceLink} isExternal>
                                                        <Chip className="pl-2" color="primary"
                                                              startContent={<Link2 size={18}/>}
                                                              variant="faded">
                                                            <span className="text-xs text-gray-600">
                                                            ArchivoVar
                                                            </span>
                                                        </Chip>
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
            {/* list against */}

        </div>
    )
        ;
}