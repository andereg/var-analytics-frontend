import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import Banner from "@/components/meta/Banner";
import React from "react";
import { TORProvider } from "@/context/TORContext";
import { TopicProvider } from "@/context/TopicContext";


const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Studyond",
    description: "Your interactive helper for your thesis"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} antialiased light min-h-screen overflow-x-hidden`}
        >
        <TopicProvider>
            <TORProvider>
                <Banner/>
                <main className="min-h-screen">
                    {children}
                </main>
            </TORProvider>
        </TopicProvider>
        </body>
        </html>
    );
}
