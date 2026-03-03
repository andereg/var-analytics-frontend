import {Avatar, AvatarIcon, Chip, Link, Listbox, ListboxItem} from "@heroui/react";
import {Link2} from "lucide-react";
import React from "react";

function formatDate(iso: string) {
    // "2025-09-21T00:00:00" -> "2025-09-21"
    return iso?.split("T")?.[0] ?? iso;
}


export function ListBoxControversies({ controversies }: { controversies: any }) {
        return (
            <Listbox aria-label="club controversies" variant="flat" selectionMode={"none"}
                     shouldFocusOnHover={false}
            >
                {(controversies ?? []).map((c) => (
                    <ListboxItem key={c.id} textValue={c.description}
                    >
                        <div className="flex items-start gap-4 mt-2 mb-2">
                            <div className="flex items-center">
                                <img
                                    src={c.beneficiary?.logo}
                                    alt="first"
                                    className="mt-5 w-10 h-10 border-0 z-10 object-contain"
                                />
                                <img
                                    src={c.victim?.logo}
                                    alt="second"
                                    className="-ml-5 mt-5 w-10 h-10 border-0 object-contain"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-semibold">
                                        {c.beneficiary?.name} vs {c.victim?.name}
                                    </span>

                                    <Chip className="ml-auto" size="sm"
                                          variant="bordered"
                                          color="secondary">
                                        {c.controversyType?.code}
                                    </Chip>
                                    <Chip size="sm" variant="bordered">
                                        {formatDate(c.date)}
                                    </Chip>
                                </div>

                                <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                                    {c.description}
                                </p>

                                <div className="mt-2 flex items-center gap-2">
                                    <div className="flex gap-4">
                                        <Chip
                                            avatar={<Avatar
                                                src={c.competition?.logo}
                                                name={c.competition?.name}
                                            />}
                                            variant="bordered"
                                        >
<span className="text-xs text-gray-600 ml-1">
    {c.competition?.name}
    </span>
                                        </Chip>
                                    </div>


                                    <Link href={c.referenceLink} isExternal>
                                        <Chip className="pl-2" color="primary"
                                              startContent={<Link2 size={18}/>}
                                              variant="faded">
<span className="text-xs text-gray-600">
    ArchivoVar
    </span>
                                        </Chip>
                                    </Link>

                                    <Link href={"/referee/" + c.mainReferee?.id}>
                                        <div className="flex gap-4">
                                            <Chip
                                                avatar={
                                                    <Avatar
                                                        classNames={{
                                                            base: "bg-white",
                                                            icon: "text-default-400",
                                                        }}
                                                        icon={<AvatarIcon/>}
                                                    />}
                                                variant="bordered"
                                            >
<span className="text-xs text-gray-600 ml-1">
    {c.mainReferee?.name} {c.mainReferee?.surname}
</span>
                                            </Chip>
                                        </div>
                                    </Link>
                                    <Link href={"/referee/" + c.varReferee?.id}>
                                        <div className="flex gap-4">
                                            <Chip
                                                avatar={
                                                    <Avatar
                                                        classNames={{
                                                            base: "bg-white",
                                                            icon: "text-default-400",
                                                        }}
                                                        icon={<AvatarIcon/>}
                                                    />}
                                                variant="bordered"
                                            >
<span className="text-xs text-gray-600 ml-1">
    {c.varReferee?.name} {c.varReferee?.surname} (VAR)
</span>
                                            </Chip>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ListboxItem>
                ))}
            </Listbox>
        )
}
