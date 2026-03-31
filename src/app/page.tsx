"use client";
import React from "react";
import LandingPage from "@/components/taxme/LandingPage";


import { useRouter } from 'next/navigation'

export default function Home() {
    const router = useRouter();
    return <LandingPage onStart={() => router.push('/taxform')} />;
}