"use client";
import React, {useEffect} from "react";
import LandingPage from "@/components/taxme/LandingPage";


import { useRouter } from 'next/navigation'

export default function Home() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const id = params.get("anon_id");

        if (!id) return;

        window.umami?.identify(id);

        window.umami?.track("partner_redirect_landed", {
            anon_id: id,
            source: "montara",
        });

        params.delete("anon_id");

        const clean =
            window.location.pathname +
            (params.toString() ? `?${params.toString()}` : "") +
            window.location.hash;

        window.history.replaceState({}, "", clean);
    }, []);

    const router = useRouter();
    return <LandingPage onStart={() => router.push('/taxform')} />;
}

