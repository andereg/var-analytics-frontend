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
    Select,
    SelectItem,
    Divider
} from "@heroui/react";
import {ClubPieChart} from "@/components/charts/ClubPieChart";
import {DecisionTypeBreakdown} from "@/components/charts/DecisionTypeBreakdown";
import { Link2 } from "lucide-react";

import {getClubById} from "@/api/clubs";
import {getCompetitions} from "@/api/competitions";
import {getSeasons} from "@/api/seasons";
import type {Club, Competition, Season} from "@/api/types";
import {DIndexKpi} from "@/components/charts/DIndex";

function formatDate(iso: string) {
    // "2025-09-21T00:00:00" -> "2025-09-21"
    return iso?.split("T")?.[0] ?? iso;
}


export default function ClubControversiesList() {
    const CLUB_ID = 36;

    const [club, setClub] = useState<Club | null>(null);
    const [seasons, setSeason] = useState<Season[] | null>(null);
    const [competitions, setCompetition] = useState<Competition[] | null>(null);
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

                const [clubData, seasons, competitions] = await Promise.all([
                    getClubById(CLUB_ID),
                    getSeasons(),
                    getCompetitions(),
                ]);

                if (!mounted) return;

                setClub(clubData);
                setSeason(seasons);
                setCompetition(competitions);

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
            <div className="min-h-screen bg-white p-6 flex items-center justify-center">
                <Spinner />
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
            {/* club card  */}
            <div className="mx-auto w-full max-w-4xl mb-4">
                <Card className="rounded-2xl shadow-xl">
                    <CardBody className="p-6">
                        {/* header */}
                        <div className="flex items-center gap-3">
                            <img
                                src={club.logo}
                                className="w-16 h-16 object-contain"
                            />
                            <div>
                                <div className="flex items-center">
                                    <h2 className="text-xl font-semibold">{club.name}</h2>
                                    <Chip
                                        classNames={{
                                            base: "ml-3 mt-0 bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-400/15",
                                            content: "drop-shadow-xs shadow-white text-white",
                                        }}
                                    >
                                        {club.abbreviation}
                                    </Chip>
                                </div>

                                <p className="text-sm text-gray-500 mt-2">{club.description}</p>
                            </div>


                            <Select variant="bordered" className="ml-auto max-w-30 mr-5" label="Season"
                                    style={{minWidth: "140px"}}>
                                {seasons.map((season) => (
                                    <SelectItem key={season.id}>{season.seasonName}</SelectItem>
                                ))}
                            </Select>

                            <Select variant="bordered" className="max-w-45 mr-10" label="Competition"
                                    style={{minWidth: "220px"}}>

                                {competitions.map((competition) => (
                                    <SelectItem key={competition.id}>{competition.name}</SelectItem>
                                ))}
                            </Select>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* club analytics  */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-4">
                <Card className="rounded-2xl shadow-sm">
                    <CardBody>
                        <h3 className="text-lg font-semibold text-gray-500 ml-2">Fairness Index</h3>
                        <DIndexKpi club={club}/>
                    </CardBody>
                </Card>
                <Card className="rounded-2xl shadow-sm md:col-span-2 md:row-span-2">
                    <CardBody>
                        <h3 className="text-lg font-semibold text-gray-500 ml-2">Decisions by Type</h3>
                        <DecisionTypeBreakdown club={club}/>
                    </CardBody>
                </Card>
                <Card className="rounded-2xl shadow-sm">
                    <CardBody>
                        <div className="relative">
                            <h3 className="absolute left-2 text-lg font-semibold text-gray-500">
                                Ratio
                            </h3>
                        </div>
                        <ClubPieChart club={club}/>
                        <div className="flex items-center gap-3 mb-2">
                            <Chip
                                radius="sm"
                                variant="bordered"
                                className="border-[#3F51B5] text-gray-600 "
                            >
                                {club.forControversies?.length ?? 0} for
                            </Chip>
                            <Chip
                                radius="sm"
                                variant="bordered"
                                className="border-[#FF2E7E] text-gray-600"
                            >
                                {club.againstControversies?.length ?? 0} against
                            </Chip>
                        </div>
                    </CardBody>
                </Card>


            </div>
            {/* list for */}
            <div className="mx-auto w-full max-w-4xl mb-4">
                <Card className="rounded-2xl shadow-xl">
                    <CardBody className="p-6">
                        <div>
                            <div className="mb-2 text-lg font-medium">
                                {club.forControversies?.length ?? 0} benefited decisions
                            </div>
                            <Divider className="my-1"/>

                            <Listbox aria-label="club controversies" variant="bordered">
                                {(club.forControversies ?? []).map((c) => (
                                    <ListboxItem key={c.id} textValue={c.description}>
                                        <div className="flex items-start gap-3">
                                            {/* opponent (victim) */}
                                            <div className="flex items-center">
                                                <img
                                                    src={c.beneficiary?.logo}
                                                    alt="second"
                                                    className="w-10 h-10 border-0 object-contain"
                                                />
                                                <img
                                                    src={c.victim?.logo}
                                                    alt="first"
                                                    className="-ml-5 w-10 h-10 border-0 z-10 object-contain"
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