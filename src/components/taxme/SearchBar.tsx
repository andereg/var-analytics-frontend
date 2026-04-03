import {useRouter} from "next/navigation";
import React, {useMemo, useState} from "react";
import {Button, Input, Link} from "@heroui/react";
import {ArrowRight, Search as SearchIcon, Search} from "lucide-react";

export default function SearchBar() {

    const router = useRouter();
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.length > 0) {
            router.push("/search" + "?q=" + encodeURIComponent(query.trim()));
        }
    };

    return (
        <form
            className="mx-auto w-full max-w-5xl"
            role="search"
            onSubmit={handleSubmit}
        >
            <h2 className="mb-2 text-xl text-gray-600">Suche</h2>
                    <div className="">
                        <Input
                            size="lg"
                            radius="lg"
                            placeholder="z. B. Steuern, Energie, Mobilität ..."
                            startContent={<SearchIcon size={18} className="text-default-400"/>}
                            endContent={<button
                                onClick={() => captureSearch(query)}
                                className="rounded-xl h-6 w-6 bg-primary px-1 py-1 text-md font-medium text-white transition hover:opacity-90 active:scale-[0.98]"
                            >
                                <ArrowRight className="h-4 w-4"/>
                            </button>}
                            value={query}
                            onValueChange={setQuery}
                            classNames={{
                                inputWrapper:
                                    "border bg-white border-default-100 shadow-none data-[hover=true]:border-default-200 group-data-[focus=true]:border-secondary",
                            }}
                        />
                </div>
        </form>
);
}  