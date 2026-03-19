// components/dashboard/UpcomingTasks.tsx
"use client";

import { Card, CardBody, CardHeader, Chip } from "@heroui/react";
import { ListTodo, Clock } from "lucide-react";

interface Task {
    id: string;
    title: string;
    deadline: Date;
    priority: "low" | "medium" | "high";
}

interface UpcomingTasksProps {
    tasks: Task[];
}

export default function UpcomingTasks({ tasks }: UpcomingTasksProps) {
    const priorityColors = {
        low: "default",
        medium: "warning",
        high: "danger"
    } as const;

    const getDaysUntil = (date: Date) => {
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    };

    return (
        <Card>
            <CardHeader className="pb-0">
                <h3 className="font-semibold flex items-center gap-2">
                    <ListTodo className="w-5 h-5" />
                    Upcoming Tasks
                </h3>
            </CardHeader>
            <CardBody className="space-y-3">
                {tasks.map((task) => {
                    const daysUntil = getDaysUntil(task.deadline);

                    return (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-3 bg-default-50 rounded-lg"
                        >
                            <div className="flex-1">
                                <p className="font-medium text-sm">{task.title}</p>
                                <div className="flex items-center gap-1 mt-1 text-xs text-default-400">
                                    <Clock className="w-3 h-3" />
                                    <span>
                    {daysUntil === 0
                        ? "Today"
                        : daysUntil === 1
                            ? "Tomorrow"
                            : `${daysUntil} days`
                    }
                  </span>
                                </div>
                            </div>
                            <Chip
                                size="sm"
                                color={priorityColors[task.priority]}
                                variant="flat"
                            >
                                {task.priority}
                            </Chip>
                        </div>
                    );
                })}

                {tasks.length === 0 && (
                    <p className="text-center text-default-400 py-4">
                        No upcoming tasks 🎉
                    </p>
                )}
            </CardBody>
        </Card>
    );
}