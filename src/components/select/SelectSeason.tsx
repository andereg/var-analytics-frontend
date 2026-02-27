import {Select, SelectItem} from "@heroui/react";

export const animals = [
  {key: "25", label: "25/26"},
  {key: "24", label: "24/25"},
  {key: "23", label: "23/24"},
  {key: "22", label: "22/23"},
  {key: "21", label: "21/22"},
  {key: "20", label: "20/21"},
];

export default function SelectSeason() {

  return (
    <div className="w-full flex flex-col gap-4 min-w-36">
        <div key="faded" className="flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4">

          <Select className="max-w-xs" label="Select Season" variant="faded">
            {animals.map((animal) => (
                <SelectItem key={animal.key}>{animal.label}</SelectItem>
            ))}
          </Select>
        </div>
    </div>
  );
}