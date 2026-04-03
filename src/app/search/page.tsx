import { Suspense } from "react";
import SearchPageClient from "./SearchPageClient";

function SearchPageFallback() {
    return <div className="min-h-screen bg-white" />;
}

export default function SearchPage() {
    return (
        <Suspense fallback={<SearchPageFallback />}>
            <SearchPageClient />
        </Suspense>
    );
}