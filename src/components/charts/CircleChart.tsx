"use client";

import type { ButtonProps, CardProps } from "@heroui/react";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import {
    Card,
    Button,
    Select,
    SelectItem,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    cn,
} from "@heroui/react";
import { Icon } from "@iconify/react";

type ChartData = {
    name: string;
    value: number;
};

type CircleChartProps = {
    title: string;
    color: ButtonProps["color"];
    categories: string[];
    chartData: ChartData[];
};

const formatTotal = (total: number) => {
    return total >= 1000 ? `${(total / 1000).toFixed(1)}K` : total;
};

const CircleChartCard = React.forwardRef<
    HTMLDivElement,
    Omit<CardProps, "children"> & CircleChartProps
>(({ className, title, categories, color, chartData, ...props }, ref) => {
    return (

            <div className="flex flex-col items-center justify-center">
                <ResponsiveContainer
                className="[&_.recharts-surface]:outline-hidden" height={200} width="100%">
                    <PieChart accessibilityLayer margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Tooltip
                            content={({ label, payload }) => (
                                <div className="rounded-medium bg-background text-tiny shadow-small flex h-8 min-w-[120px] items-center gap-x-2 px-1">
                                    <span className="text-foreground font-medium">{label}</span>
                                    {payload?.map((p) => {
                                        const name = String(p.name);
                                        const value = Number(p.value ?? 0);
                                        const idx = chartData.findIndex((c) => c.name === name);
                                        const category = categories[idx] ?? name;

                                        return (
                                            <div key={`${idx}-${name}`} className="flex w-full items-center gap-x-2">
                                                <div
                                                    className="h-2 w-2 flex-none rounded-full"
                                                    style={{
                                                        backgroundColor: `hsl(var(--heroui-${color}-${(idx + 1) * 200}))`,
                                                    }}
                                                />
                                                <div className="text-default-700 flex w-full items-center justify-between gap-x-2 pr-1 text-xs">
                                                    <span className="text-default-500">{category}</span>
                                                    <span className="text-default-700 font-mono font-medium">
                                                    {formatTotal(value)}
                                                  </span>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                            cursor={false}
                        />

                        <Pie
                            animationDuration={1500}
                            animationEasing="ease"
                            data={chartData}
                            dataKey="value"
                            innerRadius="68%"
                            nameKey="name"
                            paddingAngle={-20}
                            strokeWidth={0}
                        >
                            {chartData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={`hsl(var(--heroui-${color}-${(index + 2) * 200}))`}
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>

                <div className="text-tiny text-default-500 flex w-full flex-col justify-center gap-2 p-4 lg:p-0 ml-3">
                    {categories.map((category, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span
                              className="h-2 w-2 rounded-full"
                              style={{
                                  backgroundColor: `hsl(var(--heroui-${color}-${(index + 2) * 200}))`,
                              }}
                          />
                            <span className="capitalize">{category}</span>
                        </div>
                    ))}
                </div>
            </div>
    );
});

CircleChartCard.displayName = "CircleChartCard";

export default function ControversyCircleChart({ club }: { club: any }) {
    const forCount = club?.forControversies?.length ?? 0;
    const againstCount = club?.againstControversies?.length ?? 0;

    const categories = ["for controversies", "against controversies"];
    const chartData: ChartData[] = [
        { name: categories[0], value: forCount },
        { name: categories[1], value: againstCount },
    ];

    return (
            <CircleChartCard
                title="controversies"
                color="primary"
                categories={categories}
                chartData={chartData}
            />
    );
}