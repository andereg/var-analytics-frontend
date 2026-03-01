import React, { useMemo } from "react";
import {
    ResponsiveContainer,
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function toTs(iso?: string) {
    const t = iso ? Date.parse(iso) : NaN;
    return Number.isFinite(t) ? t : 0;
}

function formatDate(iso?: string) {
    return iso?.split("T")?.[0] ?? "";
}

type Point = {
    id: number | string;
    x: number; // timestamp
    y: string; // decision type
    side: "for" | "against";
    date: string;
    decision: string;
    description: string;
    referenceLink?: string;
    opponent?: string;
    competition?: string;
    season?: string;
};

const startDate = new Date("2025-07-01").getTime();
const endDate = new Date("2026-06-31").getTime();

export function DecisionsTimeline({ club }: { club: any }) {
    const { pointsFor, pointsAgainst, decisionTypes } = useMemo(() => {
        const ptsFor: Point[] = (club?.forControversies ?? []).map((c: any) => ({
            id: c.id,
            x: toTs(c.date),
            y: c.controversyType?.code ?? "unknown",
            side: "for",
            date: c.date,
            decision: c.controversyType?.code ?? "unknown",
            description: c.description ?? "",
            referenceLink: c.referenceLink,
            opponent: c.victim?.name,
            competition: c.competition?.name,
            season: c.season?.seasonName,
        }));

        const ptsAgainst: Point[] = (club?.againstControversies ?? []).map((c: any) => ({
            id: c.id,
            x: toTs(c.date),
            y: c.controversyType?.code ?? "unknown",
            side: "against",
            date: c.date,
            decision: c.controversyType?.code ?? "unknown",
            description: c.description ?? "",
            referenceLink: c.referenceLink,
            opponent: c.beneficiary?.name,
            competition: c.competition?.name,
            season: c.season?.seasonName,
        }));

        // keep y-axis stable: collect all types, sort by total frequency
        const counts = new Map<string, number>();
        [...ptsFor, ...ptsAgainst].forEach((p) => {
            counts.set(p.y, (counts.get(p.y) ?? 0) + 1);
        });

        const decisionTypes = Array.from(counts.entries())
            .sort((a, b) => b[1] - a[1])
            .map(([k]) => k);

        return { pointsFor: ptsFor, pointsAgainst: ptsAgainst, decisionTypes };
    }, [club]);

    return (
        <div className=" bg-white p-4">
            <div className="mb-2 text-sm text-gray-600">
                timeline (date × decision type) — green = for, red = against
            </div>

            <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis
                            dataKey="x"
                            type="number"
                            domain={[startDate, endDate]}
                            tickFormatter={(ts) => {
                                const d = new Date(ts);
                                return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
                            }}
                            name="date"
                        />

                        <YAxis
                            dataKey="y"
                            type="category"
                            width={160}
                            ticks={decisionTypes}
                            name="decision type"
                        />

                        <Tooltip
                            cursor={{ strokeDasharray: "3 3" }}
                            content={({ active, payload }) => {
                                if (!active || !payload?.length) return null;
                                const p = payload[0].payload as Point;

                                return (
                                    <div className="rounded-xl bg-white p-3 shadow-lg border border-gray-200 max-w-xs">
                                        <div className="text-xs text-gray-500">
                                            {formatDate(p.date)} · {p.side}
                                        </div>
                                        <div className="mt-1 text-sm font-semibold">{p.decision}</div>
                                        <div className="mt-1 text-sm text-gray-700 line-clamp-3">{p.description}</div>
                                        <div className="mt-2 text-xs text-gray-500 space-y-1">
                                            {p.opponent ? <div>opponent: {p.opponent}</div> : null}
                                            {p.competition ? <div>competition: {p.competition}</div> : null}
                                            {p.season ? <div>season: {p.season}</div> : null}
                                        </div>
                                        {p.referenceLink ? (
                                            <div className="mt-2 text-xs text-blue-600">click dot to open source</div>
                                        ) : null}
                                    </div>
                                );
                            }}
                        />

                        {/* AGAINST (red) */}
                        <Scatter
                            name="against"
                            data={pointsAgainst}
                            // don’t specify colors unless asked — but you explicitly want color difference
                            fill="#ef4444"
                            onClick={(data: any) => {
                                const link = data?.referenceLink;
                                if (link) window.open(link, "_blank", "noopener,noreferrer");
                            }}
                        />

                        {/* FOR (green) */}
                        <Scatter
                            name="for"
                            data={pointsFor}
                            fill="#22c55e"
                            onClick={(data: any) => {
                                const link = data?.referenceLink;
                                if (link) window.open(link, "_blank", "noopener,noreferrer");
                            }}
                        />
                    </ScatterChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}