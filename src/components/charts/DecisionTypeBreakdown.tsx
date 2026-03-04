import React, { useMemo } from "react";
import {Chip, Progress, Tooltip} from "@heroui/react";
import {Controversy} from "@/api/types";


type Props = {
    currentSeasonForControversies: Controversy[];
    currentSeasonAgainstControversies: Controversy[];
};

export function DecisionTypeBreakdown({
                                          currentSeasonForControversies,
                                          currentSeasonAgainstControversies,
                                      }: Props) {
  const data = useMemo(() => {
    const map: Record<
      string,
      { for: number; against: number }
    > = {};

      currentSeasonForControversies?.forEach((c: any) => {
      const key = c.controversyType?.code ?? "Unknown";
      map[key] = map[key] || { for: 0, against: 0 };
      map[key].for++;
    });

      currentSeasonAgainstControversies?.forEach((c: any) => {
      const key = c.controversyType?.code ?? "Unknown";
      map[key] = map[key] || { for: 0, against: 0 };
      map[key].against++;
    });

    return map;
  }, [currentSeasonForControversies, currentSeasonAgainstControversies]);


  return (
    <div className="space-y-4 ml-0 mt-2 mb-0 mr-0">
      {Object.entries(data).map(([decision, counts]) => (
          <div className="grid grid-cols-3 mb-1 gap-2 border-2 border-gray-300/10 rounded-md p-2">
              <Chip
                   size="sm"
                   variant="bordered"
                   radius="sm"
                >
                  {decision}
              </Chip>
              <div className="col-span-2 flex items-center">
                  <Tooltip
                      content={`${counts.for} for | ${counts.for + counts.against} against`}
                      placement="top"
                  >
                      <div className="w-full">
                          <Progress
                              aria-label={decision}
                              maxValue={counts.for + counts.against}
                              value={counts.for}
                              color="warning"
                              size="sm"
                              classNames={{
                                  track: "bg-emerald-500"
                              }}
                          />
                          <div className="flex justify-between mt-1">
                            <span className="text-gray-500 text-xs ml-1">
                              {counts.for}
                            </span>
                              <span className="text-gray-500 text-xs mr-1">
                              {counts.against}
                            </span>
                          </div>
                      </div>
                  </Tooltip>
              </div>
          </div>
      ))}
    </div>
  );
}