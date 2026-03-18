"use client";

import type { ButtonProps, CardProps } from "@heroui/react";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";
import { Controversy } from "@/api/types";

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

type Props = {
    pro: number;
    contra: number;
};

const formatTotal = (total: number) => {
    return total >= 1000 ? `${(total / 1000).toFixed(1)}K` : total;
};

const CircleChartCard = React.forwardRef<
    HTMLDivElement,
    Omit<CardProps, "children"> & CircleChartProps
>(({ className, title, categories, color, chartData, ...props }, ref) => {
    return (

        <div className="flex w-full min-w-[230px] flex-col items-center justify-center overflow-hidden">
            <ResponsiveContainer
                className="[&_.recharts-surface]:outline-hidden" height={230} width="100%">
                    <PieChart accessibilityLayer margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Pie
                            animationDuration={1500}
                            animationEasing="ease"
                            data={chartData}
                            dataKey="value"
                            innerRadius="68%"
                            nameKey="name"
                            paddingAngle={0}
                            strokeWidth={0}
                        >
                            {chartData.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={
                                        index === 0
                                            ? `hsl(var(--heroui-${color}-500))`
                                            : "#ffffff"
                                    }
                                />
                            ))}
                        </Pie>
                    </PieChart>
                </ResponsiveContainer>


            </div>
    );
});

CircleChartCard.displayName = "CircleChartCard";

export default function CircleChart({
                                                   pro,
                                                   contra,
                                               }: Props) {
    const forCount = pro ?? 0;
    const againstCount = contra ?? 0;

    const chartData: ChartData[] = [
        { name: "for", value: forCount },
        { name: "contra", value: againstCount },
    ];

    return (
            <CircleChartCard
                categories={["for", "contra"]}
                title="controversies"
                color="secondary"
                chartData={chartData}
            />
    );
}
