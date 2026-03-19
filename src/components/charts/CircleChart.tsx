"use client";

import type { ButtonProps, CardProps } from "@heroui/react";

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

type ChartData = {
    name: string;
    value: number;
};

type CircleChartProps = {
    title: string;
    color: ButtonProps["color"];
    categories: string[];
    chartData: ChartData[];
    size?: number;
};

type Props = {
    pro: number;
    contra: number;
    size?: number;
};

function getColorFromScore(score: number): string {
    if (score >= 85) return "success";   // green
    if (score >= 70) return "primary";   // blue
    if (score >= 55) return "warning";   // yellow/orange
    return "danger";                     // red
}

const formatTotal = (total: number) => {
    return total >= 1000 ? `${(total / 1000).toFixed(1)}K` : total;
};
const CircleChartCard = React.forwardRef<
    HTMLDivElement,
    Omit<CardProps, "children"> & CircleChartProps
>(({ className, title, categories, color, chartData, size = 90, ...props }, ref) => {
    return (
        <div
            ref={ref}
            className="flex items-center justify-center overflow-hidden"
            style={{ width: size, height: size }}
            {...props}
        >
            <ResponsiveContainer
                className="[&_.recharts-surface]:outline-hidden"
                width="100%"
                height="100%"
            >
                <PieChart accessibilityLayer margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Pie
                        animationDuration={1500}
                        animationEasing="ease"
                        data={chartData}
                        dataKey="value"
                        innerRadius="80%"
                        outerRadius="100%"
                        nameKey="name"
                        paddingAngle={0}
                        strokeWidth={0}
                        startAngle={90}
                        endAngle={-270}
                    >
                        {chartData.map((_, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={
                                    index === 0
                                        ? `black`
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
                                        size = 90,
                                    }: Props & { size?: number }) {
    const forCount = pro ?? 0;
    const againstCount = contra ?? 0;

    const chartData: ChartData[] = [
        { name: "for", value: forCount },
        { name: "contra", value: againstCount },
    ];

    const dynamicColor = getColorFromScore(forCount) as ButtonProps["color"];

    return (
        <CircleChartCard
            categories={["for", "contra"]}
            title="controversies"
            color={dynamicColor}
            chartData={chartData}
            size={size}
        />
    );
}