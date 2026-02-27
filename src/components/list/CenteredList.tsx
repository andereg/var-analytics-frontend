import React, {useMemo} from "react";
import {
    Card,
    CardBody,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    Link,
    Avatar,
} from "@heroui/react";
import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend} from "recharts";

const PIE_COLORS = ["#ef4444", "#22c55e"]; // red, green

function formatPct(value: number, total: number) {
    if (!total) return "0%";
    return `${Math.round((value / total) * 100)}%`;
}

type Competition = "UCL" | "LaLiga";
type Decision =
    | "Penalty"
    | "Missed Penalty"
    | "Wrong Penalty"
    | "Missed Red Card"
    | "Wrong Red Card"
    | "Wrong Second Yellow Card";

type RowItem = {
    id: string;
    versus: { name: string; logoUrl: string }[];
    competition: { name: Competition; logoUrl: string };
    against: boolean;
    decision: Decision;
    description: string;
    sourceUrl: string;
};

const REAL_MADRID = {
    name: "Real Madrid",
    logoUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSacb0QKDUxLdHSz5Gqx-kxLt2bOPMU-poZ_g&s",
};

const rows: RowItem[] = [
    {
        id: "1",
        versus: [
            REAL_MADRID,
            {
                name: "FC Barcelona",
                logoUrl: "https://upload.wikimedia.org/wikipedia/de/a/aa/Fc_barcelona.svg",
            },
        ],
        competition: {
            name: "LaLiga",
            logoUrl:
                "https://assets.laliga.com/assets/logos/LL_RGB_h_color/LL_RGB_h_color.png",
        },
        against: true,
        decision: "Wrong Penalty",
        description:
            "leichter kontakt im strafraum – elfmeter gepfiffen, viele experten sehen keinen klaren foulkontakt.",
        sourceUrl: "https://example.com/source-1",
    },
    {
        id: "2",
        versus: [
            REAL_MADRID,
            {
                name: "Atletico Madrid",
                logoUrl: "https://static.ligaportal.at/images/club/club-2060-large.png",
            },
        ],
        competition: {
            name: "LaLiga",
            logoUrl:
                "https://assets.laliga.com/assets/logos/LL_RGB_h_color/LL_RGB_h_color.png",
        },
        against: false,
        decision: "Missed Red Card",
        description: "hartes einsteigen gegen vini jr – var greift nicht ein, kein platzverweis.",
        sourceUrl: "https://example.com/source-2",
    },
    {
        id: "3",
        versus: [
            REAL_MADRID,
            {
                name: "Bayern Munich",
                logoUrl:
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg/960px-Logo_FC_Bayern_M%C3%BCnchen_%282002%E2%80%932017%29.svg.png",
            },
        ],
        competition: {
            name: "UCL",
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/UEFA_Champions_League_logo_no_text.svg/960px-UEFA_Champions_League_logo_no_text.svg.png",
        },
        against: true,
        decision: "Wrong Red Card",
        description: "zweikampf im mittelfeld – direkte rote karte, viele fordern nur gelb.",
        sourceUrl: "https://example.com/source-3",
    },
    {
        id: "4",
        versus: [
            REAL_MADRID,
            {
                name: "Manchester City",
                logoUrl:
                    "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1280px-Manchester_City_FC_badge.svg.png",
            },
        ],
        competition: {
            name: "UCL",
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/UEFA_Champions_League_logo_no_text.svg/960px-UEFA_Champions_League_logo_no_text.svg.png",
        },
        against: false,
        decision: "Missed Penalty",
        description: "klarer kontakt im strafraum gegen rodrygo – kein elfmeter trotz var-check.",
        sourceUrl: "https://example.com/source-4",
    },
    {
        id: "5",
        versus: [
            REAL_MADRID,
            {
                name: "Manchester City",
                logoUrl:
                    "https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/Manchester_City_FC_badge.svg/1280px-Manchester_City_FC_badge.svg.png",
            },
        ],
        competition: {
            name: "UCL",
            logoUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/UEFA_Champions_League_logo_no_text.svg/960px-UEFA_Champions_League_logo_no_text.svg.png",
        },
        against: false,
        decision: "Wrong Penalty",
        description: "schwalbe vini – elfmeter trotz var-check.",
        sourceUrl: "https://example.com/source-4",
    },
];

function decisionChipLabel(decision: Decision) {
    return decision.toLowerCase();
}

function pct(n: number, d: number) {
    if (d <= 0) return 0;
    return Math.round((n / d) * 100);
}

function ProgressBar({value}: { value: number }) {
    // value: 0..100
    return (
        <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full bg-gray-900" style={{width: `${Math.min(100, Math.max(0, value))}%`}}/>
        </div>
    );
}

export default function DecisionsTable() {
    const stats = useMemo(() => {
        const total = rows.length;
        const againstCount = rows.filter((r) => r.against).length;
        const forCount = total - againstCount;

        const decisionCounts = rows.reduce<Record<Decision, number>>((acc, r) => {
            acc[r.decision] = (acc[r.decision] ?? 0) + 1;
            return acc;
        }, {} as Record<Decision, number>);

        const decisionsInOrder: Decision[] = [
            "Penalty",
            "Missed Penalty",
            "Wrong Penalty",
            "Missed Red Card",
            "Wrong Red Card",
            "Wrong Second Yellow Card",
        ];

        const maxDecisionCount = Math.max(
            1,
            ...decisionsInOrder.map((d) => decisionCounts[d] ?? 0)
        );

        const pieData = [
            {name: "against", value: againstCount},
            {name: "for", value: forCount},
        ];

        return {
            total,
            againstCount,
            forCount,
            againstPct: pct(againstCount, total),
            forPct: pct(forCount, total),
            decisionCounts,
            decisionsInOrder,
            maxDecisionCount,
            pieData,
        };
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="mx-auto w-full max-w-5xl">
                <Card className="rounded-2xl shadow-xl">
                    <CardBody className="p-0">
                        <div className="px-6 pt-6 pb-3">
                            <div className="flex items-center gap-3">
                                <Avatar src={REAL_MADRID.logoUrl} name={REAL_MADRID.name} className="h-10 w-10"/>
                                <div>
                                    <h2 className="text-xl font-semibold">real madrid – controversial decisions</h2>
                                    <p className="text-sm text-gray-600">nur laliga und ucl spiele</p>
                                </div>
                            </div>
                        </div>

                        {/* stats */}
                        <div className="px-6 pb-6">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {/* total */}
                                <div className="rounded-2xl bg-white p-4 shadow-sm">
                                    <div className="text-sm text-gray-600">kontroverse entscheidungen (total)</div>
                                    <div className="mt-1 text-3xl font-semibold">{stats.total}</div>
                                    <div className="mt-2 text-xs text-gray-500">datengrundlage: rows.length</div>
                                </div>

                                {/* against vs for */}
                                <div className="rounded-2xl bg-white p-4 shadow-sm md:col-span-2">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="text-sm text-gray-600">
                                            kontrovers gegen real madrid vs für real madrid
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Chip size="sm" variant="flat" className="bg-red-50 text-red-700">
                                                against: {stats.againstCount}
                                            </Chip>
                                            <Chip size="sm" variant="flat" className="bg-green-50 text-green-700">
                                                for: {stats.forCount}
                                            </Chip>
                                        </div>
                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {/* pie */}
                                        <div className="h-56">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={stats.pieData}
                                                        dataKey="value"
                                                        nameKey="name"
                                                        innerRadius={45}
                                                        outerRadius={80}
                                                        paddingAngle={2}
                                                    >
                                                        {stats.pieData.map((_, idx) => (
                                                            <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]}/>
                                                        ))}
                                                    </Pie>
                                                    <Tooltip
                                                        formatter={(value: any) => {
                                                            const v = Number(value) || 0;
                                                            return [`${v} (${formatPct(v, stats.total)})`, "count"];
                                                        }}
                                                    />
                                                    <Legend/>
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>

                                        {/* quick numbers */}
                                        <div className="flex flex-col justify-center gap-3">
                                            <div className="rounded-xl bg-gray-50 p-3">
                                                <div className="text-xs text-gray-600">against</div>
                                                <div className="text-lg font-semibold">
                                                    {stats.againstCount}{" "}
                                                    <span className="text-sm font-normal text-gray-600">
                                                        ({stats.againstPct}%)
                                                      </span>
                                                </div>
                                            </div>

                                            <div className="rounded-xl bg-gray-50 p-3">
                                                <div className="text-xs text-gray-600">for</div>
                                                <div className="text-lg font-semibold">
                                                    {stats.forCount}{" "}
                                                    <span className="text-sm font-normal text-gray-600">
                                                        ({stats.forPct}%)
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* decision breakdown */}
                            <div className="mt-4 rounded-2xl bg-white p-4 shadow-sm">
                                <div className="flex items-center justify-between gap-3">
                                    <div className="text-sm text-gray-600">anzahl pro decision-type</div>
                                    <div className="text-xs text-gray-500">grafisch als anteil relativ zum größten
                                        wert
                                    </div>
                                </div>

                                <div className="mt-3 space-y-3">
                                    {stats.decisionsInOrder.map((d) => {
                                        const count = stats.decisionCounts[d] ?? 0;
                                        const rel = Math.round((count / stats.maxDecisionCount) * 100);
                                        return (
                                            <div key={d} className="grid grid-cols-12 gap-3 items-center">
                                                <div className="col-span-5 md:col-span-3">
                                                    <Chip size="sm" variant="flat"
                                                          className="bg-gray-100 text-gray-800">
                                                        {decisionChipLabel(d)}
                                                    </Chip>
                                                </div>

                                                <div className="col-span-5 md:col-span-8">
                                                    <ProgressBar value={rel}/>
                                                </div>

                                                <div
                                                    className="col-span-2 md:col-span-1 text-right text-sm font-medium">
                                                    {count}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* table */}
                        <div className="px-2 pb-4">
                            <Table
                                aria-label="real madrid controversial decisions"
                                removeWrapper
                                classNames={{
                                    table: "border-separate border-spacing-y-2",
                                    th: "text-xs uppercase tracking-wide text-gray-600",
                                }}
                            >
                                <TableHeader>
                                    <TableColumn>versus</TableColumn>
                                    <TableColumn>competition</TableColumn>
                                    <TableColumn>against</TableColumn>
                                    <TableColumn>controversial decision</TableColumn>
                                    <TableColumn>description</TableColumn>
                                    <TableColumn>source</TableColumn>
                                </TableHeader>

                                <TableBody items={rows}>
                                    {(item) => (
                                        <TableRow key={item.id} className="bg-white">
                                            <TableCell className="rounded-l-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex -space-x-2">
                                                        {item.versus.map((club) => (
                                                            <Avatar
                                                                key={club.name}
                                                                src={club.logoUrl}
                                                                name={club.name}
                                                                className="h-8 w-8 ring-2 ring-white"
                                                            />
                                                        ))}
                                                    </div>
                                                    <div className="truncate text-sm font-medium">
                                                        {item.versus.map((c) => c.name).join(" vs ")}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Avatar
                                                        src={item.competition.logoUrl}
                                                        name={item.competition.name}
                                                        className="h-8 w-8"
                                                    />
                                                    <span className="text-sm">{item.competition.name}</span>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <Chip
                                                    size="sm"
                                                    variant="flat"
                                                    className={
                                                        item.against ? "bg-red-50 text-red-700" : "bg-green-50 text-green-700"
                                                    }
                                                >
                                                    {item.against ? "against" : "for"}
                                                </Chip>
                                            </TableCell>

                                            <TableCell>
                                                <Chip size="sm" variant="flat" className="bg-gray-100 text-gray-800">
                                                    {decisionChipLabel(item.decision)}
                                                </Chip>
                                            </TableCell>

                                            <TableCell className="max-w-md">
                                                <p className="line-clamp-2 text-sm text-gray-700">{item.description}</p>
                                            </TableCell>

                                            <TableCell className="rounded-r-xl">
                                                <Link href={item.sourceUrl} isExternal>
                                                    link
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}