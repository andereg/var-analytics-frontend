// components/dashboard/DeadlineCountdown.tsx
"use client";

import { Card, CardBody } from "@heroui/react";
import { Clock, AlertTriangle } from "lucide-react";

interface DeadlineCountdownProps {
    deadline: Date;
    title?: string;
}

export default function DeadlineCountdown({
                                              deadline,
                                              title = "Submission Deadline"
                                          }: DeadlineCountdownProps) {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const isUrgent = days < 14;

    return (
        <Card className={`overflow-hidden ${isUrgent ? "border-2 border-warning" : ""}`}>
            <CardBody className="flex flex-row items-center gap-4 p-4 overflow-hidden">
                <div className={`
                    p-3 rounded-xl shrink-0
                    ${isUrgent ? "bg-warning-100 text-warning-600" : "bg-primary text-white"}
                `}>
                    {isUrgent ? <AlertTriangle className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm text-default-500">{title}</p>
                    <p className="text-2xl font-bold">{days} days</p>
                    <p className="text-xs text-default-400">{weeks} weeks remaining</p>
                </div>
                <div className="text-right shrink-0">
                    <p className="text-sm font-medium whitespace-nowrap">
                        {deadline.toLocaleDateString("de-DE", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric"
                        })}
                    </p>
                </div>
            </CardBody>
        </Card>
    );
}