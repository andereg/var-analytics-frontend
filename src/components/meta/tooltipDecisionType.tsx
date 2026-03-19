import React from "react";
import { Tooltip, Progress } from "@heroui/react";

interface TooltipDecisionTypeProps {
    counts: {
        for: number;
        against: number;
    };
    decision: string;
}

export default function TooltipDecisionType({ counts, decision }: TooltipDecisionTypeProps) {
    const total = (counts?.for || 0) + (counts?.against || 0) || 1;

    return (
        <Tooltip
            content={`${counts?.for || 0} of ${total} votes`}
            placement="top"
            showArrow
        >
            <div className="w-full">
                <Progress
                    aria-label={decision}
                    maxValue={total}
                    value={counts?.for || 0}
                    color="success"
                    size="sm"
                    classNames={{
                        track: "bg-default-200"
                    }}
                />
            </div>
        </Tooltip>
    );
}
