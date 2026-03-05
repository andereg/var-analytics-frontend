import React from "react";
import {Icon} from "@iconify/react";

import {Card, CardBody, CardHeader} from "@heroui/react";

const featuresCategories = [
    {
        key: "examples",
        title: "Key Insights",
        icon: <Icon icon="solar:football-linear" width={40}/>,
        descriptions: [
            "How many controversial decisions benefited/harmed a club this season?",
            "Which referees made the most disputed calls in crucial matches?",
            "How does a club benefit or get harmed from controversial calls per competition?",
        ],
    },
    {
        key: "capabilities",
        title: "Capabilities",
        icon: <Icon icon="solar:chart-2-linear" width={40}/>,
        descriptions: [
            "Tracks controversial referee decisions across matches and competitions",
            "Calculates a fairness index showing whether decisions favored or harmed a team",
            "Breaks down incidents by type such as offsides, penalties, red cards, and goals",
        ],
    },
    {
        key: "limitations",
        title: "Limitations",
        icon: <Icon icon="solar:shield-warning-outline" width={40}/>,
        descriptions: [
            "Analysis is based on recorded incidents and independent referee assessments",
            "Not an official judgment on refereeing decisions",
            "Incidents are subject to interpretation or incomplete data",
        ],
    },
];

export default function Component() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {featuresCategories.map((category) => (
                <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-200 to-pink-200">
                    <Card
                        key={category.key}
                        className="bg-content1 rounded-[calc(1rem-2px)] shadow-xs h-full"
                    >
                        <CardHeader className="flex flex-col gap-2 px-4 pt-6 pb-4">
                            {category.icon}
                            <p className="text-medium text-content2-foreground ">{category.title}</p>
                        </CardHeader>
                        <CardBody className="flex flex-col gap-2">
                            {category.descriptions.map((description, index) => (
                                <div
                                    key={index}
                                    className="rounded-medium bg-white-100 shadow-2xs text-content3-foreground flex min-h-[50px] px-3 py-2"
                                >
                                    <p className="text-small">{description}</p>
                                </div>
                            ))}
                        </CardBody>
                    </Card>
                </div>
            ))}
        </div>
    );
}