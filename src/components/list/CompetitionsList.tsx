"use client";

import React from "react";
import {Chip, Spinner} from "@heroui/react";
import Link from "next/link";
import {getCompetitions} from "@/api/competitions";
import type {Competition} from "@/api/types";

export default function CompetitionsList() {
    const [competitions, setCompetitions] = React.useState<Competition[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadCompetition() {
            try {
                const data = await getCompetitions();
                setCompetitions(data);
            } catch (err) {
                console.error("failed to load competitions:", err);
            } finally {
                setLoading(false);
            }
        }

        loadCompetition();
    }, []);

    if (loading) {
        return <Spinner label="Loading competitions..."/>;
    }

    return (
        <div className="w-full max-h-[300px] rounded-small overflow-y-auto">
            <div className="flex flex-wrap gap-2">
                {competitions.map((competition) => (
                    <Link key={competition.id} href={`/competition/${competition.id}`}>
                        <Chip
                            avatar={
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <img
                                        src={competition.logo}
                                        className="max-w-full max-h-full object-contain ml-1"
                                        alt={competition.name}
                                    />
                                </div>}
                            variant="flat"
                            className="pl-1"
                        >
                            <span className="text-gray-600 ml-1">
                                {competition.name}
                                </span>
                        </Chip>
                    </Link>
                ))}
            </div>
        </div>
    );
}