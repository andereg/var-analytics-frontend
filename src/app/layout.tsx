import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import Banner from "@/components/meta/Banner";
import React from "react";
import { TORProvider } from "@/context/TORContext";


const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Studyond Thesis Lifecycle",
    description: "Your interactive helper for your thesis"
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} antialiased light min-h-screen overflow-x-hidden`}
        >
        <TORProvider>
            <Banner/>
            <main className="min-h-screen">
                {children}
            </main>
        </TORProvider>
        </body>
        </html>
    );
}
