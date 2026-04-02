"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Link } from "@heroui/react";
import { ChevronRight } from "lucide-react";

function formatSegment(segment: string) {
    return decodeURIComponent(segment)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default function Breadcrumb() {
    const pathname = usePathname();

    const segments = pathname.split("/").filter(Boolean);

    const breadcrumbItems = segments.map((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/");
        return {
            label: formatSegment(segment),
            href,
            isLast: index === segments.length - 1,
        };
    });

    return (
        <nav aria-label="Breadcrumb" className="flex items-center flex-wrap gap-1 text-md mb-1">
            <Link
                href="/"
                className="text-default-500 hover:text-foreground transition"
            >
                Home
            </Link>

            {breadcrumbItems.map((item) => (
                <React.Fragment key={item.href}>
                    <ChevronRight size={14} className="text-default-400" />
                    {item.isLast ? (
                        <span className="text-ml font-medium text-foreground">{item.label}</span>
                    ) : (
                        <Link
                            href={item.href}
                            className="text-default-500 hover:text-foreground transition"
                        >
                            {item.label}
                        </Link>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}