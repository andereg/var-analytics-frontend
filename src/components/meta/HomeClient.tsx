"use client";

import React from "react";
import {Card, CardBody, Divider} from "@heroui/react";
import ClubList from "@/components/list/ClubsList";
import {DisclaimerContainer} from "@/components/meta/DisclaimerContainer";
import CompetitionsList from "@/components/list/CompetitionsList";

export default function HomeClient() {
    return (
        <div className="min-h-screen bg-stone-100 p-6">
            <div className="mx-auto w-full max-w-4xl mb-4">
                <Card className="rounded-2xl shadow-xl mb-4">
                    <CardBody className="p-6">
                        <div className="mb-2 text-gray-600 text-lg font-medium">
                            Latest controversies
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