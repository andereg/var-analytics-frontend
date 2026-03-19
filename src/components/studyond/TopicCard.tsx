import React from "react";
import { Card, CardBody, Chip, Button } from "@heroui/react";
import { ArrowRight, Building2, GraduationCap } from "lucide-react";
import CircleChart from "@/components/charts/CircleChart";

export interface Topic {
    id: string;
    title: string;
    description: string;
    type: "topic" | "job";
    degrees: string[];
    companyName?: string;
    compatibility?: number;
    employmentType?: string;
    workplaceType?: string;
}

interface TopicCardProps {
    topic: Topic;
    onSelect?: () => void;
}

export const TopicCard = ({ topic, onSelect }: TopicCardProps) => {
    const compatibility = topic.compatibility ?? 85;

    return (
        <Card className="rounded-[2.5rem] border border-default-200 bg-white shadow-sm transition-all hover:shadow-md">
            <CardBody className="p-8">
                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                    <div className="flex shrink-0 justify-center">
                        <CircleChart
                            pro={compatibility}
                            contra={100 - compatibility}
                            size={80}
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                                {topic.companyName && (
                                    <div className="flex items-center gap-1.5 text-sm font-medium text-default-500">
                                        <Building2 size={14} />
                                        {topic.companyName}
                                    </div>
                                )}
                                <div className="flex items-center gap-1.5 text-sm font-medium text-default-500">
                                    <GraduationCap size={14} />
                                    {topic.degrees.join(", ").toUpperCase()}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight">
                                {topic.title}
                            </h3>
                        </div>

                        <p className="text-sm leading-relaxed text-default-600 line-clamp-2 md:text-base">
                            {topic.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            <Chip size="sm" variant="flat" color="primary" className="capitalize">
                                {topic.type}
                            </Chip>
                            <Chip size="sm" variant="flat" color="secondary">
                                {compatibility}% Match
                            </Chip>
                        </div>
                    </div>

                    {onSelect && (
                        <div className="flex justify-end md:block">
                            <Button
                                isIconOnly
                                radius="full"
                                variant="flat"
                                onPress={onSelect}
                                className="h-12 w-12 bg-default-100"
                            >
                                <ArrowRight size={20} />
                            </Button>
                        </div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
};
