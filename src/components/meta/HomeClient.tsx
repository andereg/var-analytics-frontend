"use client";

import React from "react";
import {Card, CardBody, Divider, Spinner} from "@heroui/react";
import ClubList from "@/components/list/ClubsList";
import {DisclaimerContainer} from "@/components/meta/DisclaimerContainer";
import CompetitionsList from "@/components/list/CompetitionsList";
import type {Controversy} from "@/api/types";
import {getControversies} from "@/api/controversies";
import {ListBoxControversies} from "@/components/list/ListBoxControversies";

export default function HomeClient() {
    const [controversies, setControversies] = React.useState<Controversy[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadControversies() {
            try {
                const data = await getControversies();
                setControversies(data);
            } catch (err) {
                console.error("failed to load data:", err);
            } finally {
                setLoading(false);
            }
        }

        loadControversies();
    }, []);

    if (loading) {
        return <Spinner label="Loading data..."/>;
    }

    return (
        <div className="min-h-screen bg-stone-100 p-6">
            <div className="mx-auto w-full max-w-4xl mb-4">
                <Card className="rounded-2xl shadow-xl mb-4">
                    <CardBody className="p-6">
                        <div className="mb-2 text-gray-600 text-lg font-medium">
                            Latest controversies
                                <div className="w-full rounded-small overflow-y-auto">
                                    <ListBoxControversies
                                        controversies={controversies.sort((b, a) => new Date(a.date) - new Date(b.date)).slice(0, 5)}
                                    />                                </div>
                            </div>
                    </CardBody>
                </Card>
                <Card className="rounded-2xl shadow-xl mb-4">
                    <CardBody className="p-6">
                        <DisclaimerContainer/>
                    </CardBody>
                </Card>

                <Card className="rounded-2xl shadow-xl mb-4">
                    <CardBody className="p-6">
                        <div className="mb-2 text-gray-600 text-lg font-medium">
                            Clubs
                        </div>
                        <ClubList/>
                    </CardBody>
                </Card>
                <Card className="rounded-2xl shadow-xl mb-4">
                    <CardBody className="p-6">
                        <div className="mb-2 text-gray-600 text-lg font-medium">
                            Competitions
                        </div>
                        <CompetitionsList/>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}