// components/dashboard/ThesisSummary.tsx
"use client";

import { Card, CardBody, CardHeader, Chip, Divider } from "@heroui/react";
import {
    FileText,
    User,
    Building2,
    Calendar,
    Target,
    BookOpen,
    GraduationCap
} from "lucide-react";

interface ThesisSummaryProps {
    topic: string;
    supervisor: string;
    company: string;
    studyProgram: string;
    startDate: Date;
    endDate: Date;
    methodology: string;
    status: "planning" | "writing" | "review" | "submitted";
    keywords: string[];
}

export default function ThesisSummary({
                                          topic,
                                          supervisor,
                                          company,
                                          studyProgram,
                                          startDate,
                                          endDate,
                                          methodology,
                                          status,
                                          keywords
                                      }: ThesisSummaryProps) {
    const statusColors = {
        planning: "warning",
        writing: "primary",
        review: "secondary",
        submitted: "success"
    } as const;

    const statusLabels = {
        planning: "Planning Phase",
        writing: "Writing Phase",
        review: "Under Review",
        submitted: "Submitted"
    };

    return (
        <Card className="h-150">
            <CardHeader className="flex justify-between items-center">
                <h3 className="font-semibold flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Thesis Summary
                </h3>
                <Chip color={statusColors[status]} variant="flat" size="sm">
                    {statusLabels[status]}
                </Chip>
            </CardHeader>
            <Divider />
            <CardBody className="space-y-4 p-4">
                {/* Topic */}
                <div>
                    <p className="text-xs text-default-400 uppercase tracking-wide">Topic</p>
                    <p className="font-medium mt-1">{topic}</p>
                </div>

                <Divider />

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-default-400 mt-0.5" />
                        <div>
                            <p className="text-xs text-default-400">Supervisor</p>
                            <p className="text-sm font-medium">{supervisor}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 text-default-400 mt-0.5" />
                        <div>
                            <p className="text-xs text-default-400">Company</p>
                            <p className="text-sm font-medium">{company}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <GraduationCap className="w-4 h-4 text-default-400 mt-0.5" />
                        <div>
                            <p className="text-xs text-default-400">Study Program</p>
                            <p className="text-sm font-medium">{studyProgram}</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Calendar className="w-4 h-4 text-default-400 mt-0.5" />
                        <div>
                            <p className="text-xs text-default-400">Duration</p>
                            <p className="text-sm font-medium">
                                {startDate.toLocaleDateString("de-DE", { month: "short", year: "numeric" })} - {endDate.toLocaleDateString("de-DE", { month: "short", year: "numeric" })}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-2">
                        <Target className="w-4 h-4 text-default-400 mt-0.5" />
                        <div>
                            <p className="text-xs text-default-400">Methodology</p>
                            <p className="text-sm font-medium">{methodology}</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}