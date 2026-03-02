import React, { useMemo } from "react";
import { Chip } from "@heroui/react";

function Bar({ value, max, color }: { value: number; max: number; color: string }) {
  const width = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full rounded-full"
        style={{
          width: `${width}%`,
          backgroundColor: color,
        }}
      />
    </div>
  );
}

export function DecisionTypeBreakdown({ club }: { club: any }) {
  const data = useMemo(() => {
    const map: Record<
      string,
      { for: number; against: number }
    > = {};

    club?.forControversies?.forEach((c: any) => {
      const key = c.controversyType?.code ?? "Unknown";
      map[key] = map[key] || { for: 0, against: 0 };
      map[key].for++;
    });

    club?.againstControversies?.forEach((c: any) => {
      const key = c.controversyType?.code ?? "Unknown";
      map[key] = map[key] || { for: 0, against: 0 };
      map[key].against++;
    });

    return map;
  }, [club]);

  const maxValue = Math.max(
    1,
    ...Object.values(data).flatMap((d) => [d.for, d.against])
  );

  function StackedBar({
                        forValue,
                        againstValue,
                      }: {
    forValue: number;
    againstValue: number;
  }) {
    const total = forValue + againstValue;
    const forWidth = total > 0 ? (forValue / total) * 100 : 0;
    const againstWidth = total > 0 ? (againstValue / total) * 100 : 0;

    return (
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden flex">
          <div
              style={{ width: `${forWidth}%` }}
              className="bg-[#3F51B5]"
          />
          <div
              style={{ width: `${againstWidth}%` }}
              className="bg-[#FF2E7E]"
          />
        </div>
    );
  }

  return (
    <div className="space-y-4 ml-2 mt-2 mb-2 mr-1">
      {Object.entries(data).map(([decision, counts]) => (
          <div className="grid grid-cols-4 gap-4">
            <span className="text-xs text-gray-600">{decision}
            </span>
            <div className="flex ml-auto text-xs items-center">
              <span className="text-gray-600 flex">for: <span className="text-[#3F51B5]">{counts.for}</span></span>
              <span className="ml-1 text-gray-600 flex">against: <span className="text-[#FF2E7E]">{counts.against}</span></span>
            </div>
            <div className="col-span-2 flex items-center">
              <StackedBar
                  forValue={counts.for}
                  againstValue={counts.against}
              />
            </div>
          </div>
      ))}
    </div>
  );
}