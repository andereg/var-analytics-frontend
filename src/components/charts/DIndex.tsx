import React, { useMemo } from "react";
import { Chip } from "@heroui/react";
import {Controversy} from "@/api/types";

function clamp(n: number, min: number, max: number) {
    return Math.min(max, Math.max(min, n));
}

// maps dindex [-1..1] -> hue [0..120] (red -> green)
function dindexToColor(dindex: number) {
    const t = (clamp(dindex, -1, 1) + 1) / 2; // 0..1
    const hue = 0 + t * 120; // 0=red, 120=green
    return `hsl(${hue} 85% 45%)`;
}

function dindexLabel(dindex: number) {
    if (dindex >= 0.6) return "strongly benefited";
    if (dindex >= 0.4) return "mostly benefited";
    if (dindex >= 0.2) return "slightly benefited";
    if (dindex <= -0.6) return "strongly disadvantaged";
    if (dindex <= -0.4) return "mostly disadvantaged";
    if (dindex <= -0.2) return "slightly disadvantaged";
    return "balanced";
}
type Props = {
    currentSeasonForControversies: Controversy[];
    currentSeasonAgainstControversies: Controversy[];
};

export function DIndexKpi({
                                                   currentSeasonForControversies,
                                                   currentSeasonAgainstControversies,
                                               }: Props) {
    const { forCount, againstCount, total, dindex } = useMemo(() => {
        const forCount = currentSeasonForControversies?.length ?? 0;
        const againstCount = currentSeasonAgainstControversies?.length ?? 0;
        const total = forCount + againstCount;
        const dindex = total > 0 ? (forCount - againstCount) / total : 0; // [-1..1]
        return { forCount, againstCount, total, dindex };
    }, [currentSeasonForControversies, currentSeasonAgainstControversies]);

    const color = dindexToColor(dindex);
    const markerLeftPct = ((clamp(dindex, -1, 1) + 1) / 2) * 100; // 0..100
    const label = dindexLabel(dindex);

    return (
        <div className=" bg-white p-4">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="mt-1 flex items-baseline gap-2">
                        <div className="text-3xl font-semibold">
                            {dindex.toFixed(2)}
                        </div>
                    </div>
                </div>

                {/* colored chip */}
                <Chip
                    variant="flat"
                    className="self-start text-xs mt-1"
                    style={{backgroundColor: `${color}20`, color}}
                >
                    {label}
                </Chip>
            </div>

            {/* gauge */}
            <div className="mt-4">
                <div className="relative h-3 w-full rounded-full bg-gray-200 overflow-hidden">
                    {/* colored fill - full width tint */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to right, hsl(2020 85% 55%), hsl(120 100% 55%))`,
                            opacity: 0.9,
                        }}
                    />
                    {/* marker */}
                    <div
                        className="absolute top-1/2 h-5 w-[2px] -translate-y-1/2 bg-gray-900"
                        style={{left: `calc(${markerLeftPct}% - 1px)`}}
                    />
                </div>

                <div className="mt-2 flex justify-between text-xs text-gray-500">
                    <span>-1 (against)</span>
                    <span>0 (balanced)</span>
                    <span>(for) +1</span>
                </div>
            </div>
        </div>
    );
}