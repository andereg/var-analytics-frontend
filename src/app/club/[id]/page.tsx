"use client";
import React, {useEffect, useState} from "react";
import {
    Card,
    CardBody,
    Chip,
    Spinner,
    Select,
    SelectItem,
    Divider
} from "@heroui/react";
import {DecisionTypeBreakdown} from "@/components/charts/DecisionTypeBreakdown";

import {getClubById} from "@/api/clubs";
import {getCompetitions} from "@/api/competitions";
import {getSeasons} from "@/api/seasons";
import {Club, Competition, Controversy, Season} from "@/api/types";
import {DIndexKpi} from "@/components/charts/DIndex";
import {DecisionsTimeline} from "@/components/charts/DecisionsTimeline";
import KPIStats from "@/components/charts/KPIStats";
import ControversyCircleChart from "@/components/charts/CircleChart";
import {ListBoxControversies} from "@/components/list/ListBoxControversies";
import { useParams } from "next/navigation";


export default function ClubPage() {
    const params = useParams<{ id: string }>();

    const CLUB_ID = params.id;

    const [club, setClub] = useState<Club | null>(null);
    const [seasons, setSeason] = useState<Season[] | null>(null);
    const [selectedSeason, setSelectedSeason] = React.useState<string>("all");

    const [competitions, setCompetition] = useState<Competition[] | null>(null);
    const [selectedCompetition, setSelectedCompetition] = React.useState<string>("all");

    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const currentSeasonForControversies = React.useMemo(() => {
        const all = club?.forControversies ?? [];

        if (selectedSeason === "all" && selectedCompetition === "all") return all;

        const seasonId = Number(selectedSeason);
        const competitionId = Number(selectedCompetition);

        if (selectedSeason === "all") {
            return all.filter(c => c.competition?.id === competitionId);
        }
        if (selectedCompetition === "all") {
            return all.filter(c => c.season?.id === seasonId);
        }

        return all.filter(
            c => c.season?.id === seasonId && c.competition?.id === competitionId
        );
    }, [club, selectedSeason, selectedCompetition]);

    const currentSeasonAgainstControversies = React.useMemo(() => {
        const all = club?.againstControversies ?? [];

        if (selectedSeason === "all" && selectedCompetition === "all") return all;

        const seasonId = Number(selectedSeason);
        const competitionId = Number(selectedCompetition);

        if (selectedSeason === "all") {
            return all.filter(c => c.competition?.id === competitionId);
        }
        if (selectedCompetition === "all") {
            return all.filter(c => c.season?.id === seasonId);
        }

        return all.filter(
            c => c.season?.id === seasonId && c.competition?.id === competitionId
        );
    }, [club, selectedSeason, selectedCompetition]);

    const onSeasonChange = (keys: any) => {
        const key = Array.from(keys)[0] as string;
        if (typeof key === "undefined") setSelectedSeason("all");
        else setSelectedSeason(key);
    };

    const onCompetitionChange = (keys: any) => {
        const key = Array.from(keys)[0] as string;
        if (typeof key === "undefined") setSelectedCompetition("all");
        else setSelectedCompetition(key);
    };

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                setErrorMsg(null);

                const [clubData, seasons, competitions] = await Promise.all([
                    getClubById(CLUB_ID),
                    getSeasons(),
                    getCompetitions(),
                ]);

                if (!mounted) return;

                const forC = clubData?.forControversies ?? [];
                const againstC = clubData?.againstControversies ?? [];
                const allC = [...forC, ...againstC];
                // collect ids that exist in the controversies
                const seasonIds = new Set<number>(
                    allC.map(c => c.season?.id).filter((id): id is number => typeof id === "number")
                );

                const competitionIds = new Set<number>(
                    allC.map(c => c.competition?.id).filter((id): id is number => typeof id === "number")
                );

                // filter your dropdown options
                const seasonsWithData = (seasons ?? []).filter(s => seasonIds.has(s.id));
                const competitionsWithData = (competitions ?? []).filter(c => competitionIds.has(c.id));


                setClub(clubData);
                setSeason(seasonsWithData);
                setCompetition(competitionsWithData);

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
                <Spinner/>
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
        <div className="min-h-screen bg-stone-100 p-6">
            <div className="">
                {/* club card  */}
                <div className="mx-auto w-full max-w-4xl mb-4">
                    <Card className="rounded-2xl shadow-xl">
                        <CardBody className="p-6">
                            {/* header */}
                            <div className="flex items-center gap-3">
                                <img
                                    src={club.logo}
                                    className="w-20 h-20 object-contain"
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

                                    <p className="text-sm text-gray-300 mt-2">{club.description}</p>
                                </div>


                                <Select variant="bordered" className="ml-auto max-w-30 mr-5" label="Season"
                                        style={{minWidth: "140px"}}
                                        onSelectionChange={onSeasonChange}
                                        placeholder="All Seasons"
                                >
                                    {seasons.map((season) => (
                                        <SelectItem key={season.id.toString()}>{season.seasonName}</SelectItem>
                                    ))}
                                </Select>

                                <Select variant="bordered" className="max-w-45 mr-10" label="Competition"
                                        style={{minWidth: "220px"}}
                                        onSelectionChange={onCompetitionChange}
                                        placeholder="All Competitions"
                                >
                                    {competitions.map((competition) => (
                                        <SelectItem key={competition.id.toString()}>{competition.name}</SelectItem>
                                    ))}
                                </Select>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* club analytics  */}
                <div className="grid grid-cols-3 md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-4">
                    <Card className="rounded-2xl shadow-sm">
                        <CardBody>
                            <h3 className="text-lg font-semibold text-gray-500 ml-2">Fairness Index</h3>
                            <DIndexKpi currentSeasonAgainstControversies={currentSeasonAgainstControversies}
                                       currentSeasonForControversies={currentSeasonForControversies}/>
                        </CardBody>
                    </Card>
                    <div className="md:col-span-2 md:row-span-2">
                        <Card className="rounded-2xl shadow-sm h-fit mb-2">
                            <CardBody>
                                <h3 className="text-lg font-semibold text-gray-500 ml-2">Decisions by Type</h3>
                                <DecisionTypeBreakdown currentSeasonAgainstControversies={currentSeasonAgainstControversies}
                                                       currentSeasonForControversies={currentSeasonForControversies}/>
                            </CardBody>
                        </Card>
                        {/*<Card className="rounded-2xl shadow-sm h-fit">*/}
                        {/*    <CardBody>*/}
                        {/*        <h3 className="text-sm font-semibold text-gray-500 ml-2">Controversies per Competition</h3>*/}

                        {/*    </CardBody>*/}
                        {/*</Card>*/}
                    </div>
                    <Card className="rounded-2xl shadow-sm">
                        <CardBody>
                            <div className="relative">
                                <h3 className="absolute left-2 text-lg font-semibold text-gray-500">
                                    Ratio
                                </h3>
                            </div>
                            <ControversyCircleChart
                                currentSeasonAgainstControversies={currentSeasonAgainstControversies}
                                currentSeasonForControversies={currentSeasonForControversies}/>
                        </CardBody>
                    </Card>
                    {/*<Card className="rounded-2xl shadow-sm md:col-span-3 md:row-span-1">*/}
                    {/*    <CardBody>*/}
                    {/*        {club && <DecisionsTimeline club={club} />}*/}
                    {/*    </CardBody>*/}
                    {/*</Card>*/}

                </div>

                <div className="mx-auto w-full max-w-4xl mb-4">
                    <KPIStats currentSeasonAgainstControversies={currentSeasonAgainstControversies}
                              currentSeasonForControversies={currentSeasonForControversies}/>
                </div>
                {/* list for */}
                {currentSeasonForControversies?.length > 0 && (
                    <div className="mx-auto w-full max-w-4xl mb-4">
                        <Card className="rounded-2xl shadow-xl">
                            <CardBody className="p-6">
                                <div>
                                    <div className="mb-2 text-lg font-medium">
                                        {currentSeasonForControversies?.length ?? 0} benefited {currentSeasonForControversies?.length == 1 ? "decision" : "decisions"}
                                    </div>
                                    <Divider className="my-1"/>
                                    <ListBoxControversies controversies={currentSeasonForControversies}/>

                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
                {/* list against */}
                {currentSeasonAgainstControversies?.length > 0 && (
                    <div className="mx-auto w-full max-w-4xl mb-4" >
                        <Card className="rounded-2xl shadow-xl">
                            <CardBody className="p-6">
                                <div>
                                    <div className="mb-2 text-lg font-medium">
                                        {currentSeasonAgainstControversies?.length ?? 0} {currentSeasonAgainstControversies?.length == 1 ? "decision" : "decisions"} against
                                    </div>
                                    <Divider className="my-1"/>

                                    <ListBoxControversies controversies={currentSeasonAgainstControversies}/>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    )
        ;
}