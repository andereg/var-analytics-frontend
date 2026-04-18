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

import {getCompetitionById} from "@/api/competitions";
import {getSeasons} from "@/api/seasons";
import {Competition, Season} from "@/api/types";
import {DIndexKpi} from "@/components/charts/DIndex";

import KPIStats from "@/components/charts/KPIStats";
import ControversyCircleChart from "@/components/charts/CircleChart";
import {ListBoxControversies} from "@/components/list/ListBoxControversies";
import { useParams } from "next/navigation";


export default function ClubPage() {
    const params = useParams<{ id: string }>();

    const COMPETITION_ID = params.id;

    const [competition, setCompetition] = useState<Competition | null>(null);
    const [seasons, setSeason] = useState<Season[] | null>(null);
    const [selectedSeason, setSelectedSeason] = React.useState<string>("all");

    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const currentSeasonControversies = React.useMemo(() => {
        const all = competition?.controversies ?? [];

        if (selectedSeason === "all") return all;

        const seasonId = Number(selectedSeason);

        return all.filter(
            c => c.season?.id === seasonId
        );
    }, [competition, selectedSeason]);


    const onSeasonChange = (keys: any) => {
        const key = Array.from(keys)[0] as string;
        if (typeof key === "undefined") setSelectedSeason("all");
        else setSelectedSeason(key);
    };

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                setErrorMsg(null);

                const [competitionData, seasons] = await Promise.all([
                    getCompetitionById(COMPETITION_ID),
                    getSeasons(),
                ]);

                if (!mounted) return;


                // collect ids that exist in the controversies
                const seasonIds = new Set<number>(
                    competitionData?.controversies.map(c => c.season?.id).filter((id): id is number => typeof id === "number")
                );

                // filter dropdown options
                const seasonsWithData = (seasons ?? []).filter(s => seasonIds.has(s.id));


                setCompetition(competitionData);
                setSeason(seasonsWithData);

            } catch (e: any) {
                if (!mounted) return;
                setErrorMsg(e?.message ?? "failed to load competition");
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

    if (!competition) return null;

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
                                    src={competition.logo}
                                    className="w-20 h-20 object-contain"
                                />
                                <div>
                                    <div className="flex items-center">
                                        <h2 className="text-xl font-semibold">{competition.name}</h2>
                                        <Chip
                                            classNames={{
                                                base: "ml-3 mt-0 bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-400/15",
                                                content: "drop-shadow-xs shadow-white text-white",
                                            }}
                                        >
                                            {competition.abbreviation}
                                        </Chip>
                                    </div>

                                    <p className="text-sm text-gray-300 mt-2">{competition.description}</p>
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
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* club analytics  */}
                <div className="grid grid-cols-3 md:grid-cols-3 gap-3 max-w-4xl mx-auto mb-4">
                    <Card className="rounded-2xl shadow-sm">
                        <CardBody>
                            <h3 className="text-lg font-semibold text-gray-500 ml-2">Fairness Index</h3>
                            <DIndexKpi currentSeasonAgainstControversies={currentSeasonControversies}
                                       currentSeasonForControversies={currentSeasonControversies}/>
                        </CardBody>
                    </Card>
                    <div className="md:col-span-2 md:row-span-2">
                        <Card className="rounded-2xl shadow-sm h-fit mb-2">
                            <CardBody>
                                <h3 className="text-lg font-semibold text-gray-500 ml-2">Decisions by Type</h3>
                                <DecisionTypeBreakdown currentSeasonAgainstControversies={currentSeasonControversies}
                                                       currentSeasonForControversies={currentSeasonControversies}/>
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
                                currentSeasonAgainstControversies={currentSeasonControversies}
                                currentSeasonForControversies={currentSeasonControversies}/>
                        </CardBody>
                    </Card>
                    {/*<Card className="rounded-2xl shadow-sm md:col-span-3 md:row-span-1">*/}
                    {/*    <CardBody>*/}
                    {/*        {club && <DecisionsTimeline club={club} />}*/}
                    {/*    </CardBody>*/}
                    {/*</Card>*/}

                </div>

                <div className="mx-auto w-full max-w-4xl mb-4">
                    <KPIStats currentSeasonAgainstControversies={currentSeasonControversies}
                              currentSeasonForControversies={currentSeasonControversies}/>
                </div>
                {/* list for */}
                {currentSeasonControversies?.length > 0 && (
                    <div className="mx-auto w-full max-w-4xl mb-4">
                        <Card className="rounded-2xl shadow-xl">
                            <CardBody className="p-6">
                                <div>
                                    <div className="mb-2 text-lg font-medium">
                                        {currentSeasonControversies?.length ?? 0} controversial {currentSeasonControversies?.length == 1 ? "decision" : "decisions"}
                                    </div>
                                    <Divider className="my-1 opacity-30" />
                                    <ListBoxControversies controversies={currentSeasonControversies}  />
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