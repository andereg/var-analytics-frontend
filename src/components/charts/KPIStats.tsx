"use client";

import React from "react";
import { Card, Chip, cn } from "@heroui/react";
import { Icon } from "@iconify/react";
import {Controversy, Referee} from "@/api/types";

type TrendCardProps = {
    title: string;
    value: string;
    change: number;
    changeType: "positive" | "neutral" | "negative";
    trendType: "up" | "neutral" | "down";
    trendChipPosition?: "top" | "bottom";
    trendChipVariant?: "flat" | "light";
};

const TrendCard = ({
                       title,
                       value,
                       change,
                       changeType,
                       trendType,
                       trendChipPosition = "top",
                       trendChipVariant = "light",
                   }: TrendCardProps) => {
    return (
        <Card className="dark:border-default-100 border border-transparent">
            <div className="flex p-4">
                <div className="flex flex-col gap-y-2">
                    <dt className="text-xs text-default-500 font-medium">{title}</dt>
                    <dd className="text-default-700 text-xl font-semibold">{value}</dd>
                </div>

                <Chip
                    className={cn("absolute right-4", {
                        "top-4": trendChipPosition === "top",
                        "bottom-4": trendChipPosition === "bottom",
                    })}
                    classNames={{ content: "font-medium text-[1.1rem]" }}
                    color={changeType === "positive" ? "success" : changeType === "neutral" ? "warning" : "danger"}
                    radius="sm"
                    size="sm"
                    startContent={
                        trendType === "up" ? (
                            <Icon height={16} width={16} icon="solar:arrow-right-up-linear" />
                        ) : trendType === "neutral" ? (
                            <Icon height={16} width={16} icon="solar:arrow-right-linear" />
                        ) : (
                            <Icon height={16} width={16} icon="solar:arrow-right-down-linear" />
                        )
                    }
                    variant={trendChipVariant}
                >
                    {change}
                </Chip>
            </div>
        </Card>
    );
};

function formatMoney(n?: number) {
    if (typeof n !== "number") return "—";
    return n.toLocaleString(undefined, { style: "currency", currency: "usd", maximumFractionDigits: 0 });
}
function formatInt(n?: number) {
    if (typeof n !== "number") return "—";
    return n.toLocaleString();
}
function toTrendType(changePct?: number): TrendCardProps["trendType"] {
    if (typeof changePct !== "number") return "neutral";
    if (changePct > 0) return "up";
    if (changePct < 0) return "down";
    return "neutral";
}
function toChangeType(changePct?: number): TrendCardProps["changeType"] {
    if (typeof changePct !== "number") return "neutral";
    if (changePct > 0) return "positive";
    if (changePct < 0) return "negative";
    return "neutral";
}
function formatPct(changePct?: number) {
    if (typeof changePct !== "number") return "—";
    const sign = changePct > 0 ? "+" : "";
    return `${sign}${changePct.toFixed(1)}%`;
}

function getMostFrequentMainReferee(controversies: Controversy[]) {
    const countMap = new Map<number, { referee: Referee; count: number }>();

    for (const c of controversies) {
        const referees = [
            c.mainReferee
        ];

        for (const referee of referees) {
            if (!referee?.id) continue;

            if (!countMap.has(referee.id)) {
                countMap.set(referee.id, { referee, count: 1 });
            } else {
                countMap.get(referee.id)!.count++;
            }
        }
    }

    let top: { referee: Referee | null; count: number } = {
        referee: null,
        count: 0,
    };

    for (const entry of countMap.values()) {
        if (entry.count > top.count) {
            top = entry;
        }
    }

    return top;
}

function getMostFrequentVarReferee(controversies: Controversy[]) {
    const countMap = new Map<number, { referee: Referee; count: number }>();

    for (const c of controversies) {
        const referees = [
            c.varReferee
        ];

        for (const referee of referees) {
            if (!referee?.id) continue;

            if (!countMap.has(referee.id)) {
                countMap.set(referee.id, { referee, count: 1 });
            } else {
                countMap.get(referee.id)!.count++;
            }
        }
    }

    let top: { referee: Referee | null; count: number } = {
        referee: null,
        count: 0,
    };

    for (const entry of countMap.values()) {
        if (entry.count > top.count) {
            top = entry;
        }
    }

    return top;
}

type Props = {
    currentSeasonForControversies: Controversy[];
    currentSeasonAgainstControversies: Controversy[];
};

export default function KPIStats({
                                     currentSeasonForControversies,
                                     currentSeasonAgainstControversies,
                                 }: Props) {
    const mostFrequentAdvantagousReferee = getMostFrequentMainReferee(currentSeasonForControversies ?? []);
    const mostFrequentDisadvantagousReferee = getMostFrequentMainReferee(currentSeasonAgainstControversies ?? []);

    const mostFrequentAdvantagousVARReferee = getMostFrequentVarReferee(currentSeasonForControversies ?? []);
    const mostFrequentDisadvantagousVARReferee = getMostFrequentVarReferee(currentSeasonAgainstControversies ?? []);

    const cards: TrendCardProps[] = [];
    if (mostFrequentAdvantagousReferee.referee !== null){
        cards.push({
            title: "Most for (On-Field)",
            value:
                mostFrequentAdvantagousReferee.referee?.name +
                " " +
                mostFrequentAdvantagousReferee.referee?.surname,
            change: mostFrequentAdvantagousReferee.count,
            changeType: toChangeType(1),
            trendType: toTrendType(1),
        });
    }
    if (mostFrequentDisadvantagousReferee.referee !== null){
        cards.push({
            title: "Most against (On-Field)",
            value:
                mostFrequentDisadvantagousReferee.referee?.name +
                " " +
                mostFrequentDisadvantagousReferee.referee?.surname,
            change: mostFrequentDisadvantagousReferee.count,
            changeType: toChangeType(-1),
            trendType: toTrendType(-1),
        });
    }
    if (mostFrequentAdvantagousVARReferee.referee !== null){
        cards.push({
            title: "Most for (VAR)",
            value:
                mostFrequentAdvantagousVARReferee.referee?.name +
                " " +
                mostFrequentAdvantagousVARReferee.referee?.surname,
            change: mostFrequentAdvantagousVARReferee.count,
            changeType: toChangeType(1),
            trendType: toTrendType(1),
        });
    }
    if (mostFrequentDisadvantagousVARReferee.referee !== null){
        cards.push({
            title: "Most against (VAR)",
            value:
                mostFrequentDisadvantagousVARReferee.referee?.name +
                " " +
                mostFrequentDisadvantagousVARReferee.referee?.surname,
            change: mostFrequentDisadvantagousVARReferee.count,
            changeType: toChangeType(-1),
            trendType: toTrendType(-1),
        });
    }

    return (
        <dl className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cards.map((props, index) => (
                <TrendCard key={index} {...props} />
            ))}
        </dl>
    );
}