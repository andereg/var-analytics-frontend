"use client";

import React from "react";
import {Chip, Avatar, Spinner} from "@heroui/react";
import Link from "next/link";
import {getClubs} from "@/api/clubs";
import type {ClubBase} from "@/api/types";

export default function ClubsList() {
    const [clubs, setClubs] = React.useState<ClubBase[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function loadClubs() {
            try {
                const data = await getClubs();
                setClubs(data);
            } catch (err) {
                console.error("failed to load clubs:", err);
            } finally {
                setLoading(false);
            }
        }

        loadClubs();
    }, []);

    if (loading) {
        return <Spinner label="Loading clubs..."/>;
    }

    return (
        <div className="w-full max-h-[300px] rounded-small overflow-y-auto">
            <div className="flex flex-wrap gap-2">
                {clubs.map((club) => (
                    <Link key={club.id} href={`/club/${club.id}`}>
                        <Chip
                            avatar={
                                <div className="w-10 h-10 flex items-center justify-center">
                                    <img
                                        src={club.logo}
                                        className="max-w-full max-h-full object-contain ml-1"
                                        alt={club.name}
                                    />
                                </div>}
                            variant="flat"
                            className="pl-1"
                        >
                            <span className="text-gray-600 ml-1">
                                {club.name}
                                </span>
                        </Chip>
                    </Link>
                ))}
            </div>
        </div>
    );
}