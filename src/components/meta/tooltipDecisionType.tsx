import { Tooltip, Progress } from "@heroui/react";

const total = counts.for + counts.against;

<Tooltip
    content={`${counts.for} of ${total} votes`}
    placement="top"
    showArrow
>
    <div className="w-full">
        <Progress
            aria-label={decision}
            maxValue={total}
            value={counts.for}
            color="success"
            size="sm"
            classNames={{
                track: "bg-default-200"
            }}
        />
    </div>
</Tooltip>