import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import Banner from "@/components/meta/Banner";
import React from "react";


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
            //className={`${geistSans.variable} ${geistMono.variable} antialiased light min-h-screen overflow-x-hidden`}
            className={`${inter.className} antialiased light min-h-screen overflow-x-hidden`}
        >
        <Banner/>
        <main className="min-h-screen">
            {children}
        </main>
        </body>
        </html>
    );
}
