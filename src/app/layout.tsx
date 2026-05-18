import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import React from "react";
import Script from "next/script";
import PageExitTracker from "@/components/taxme/PageExitTracker";


const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Portal Kanton Alpengrün",
    description: "Das Alpengrün Hub"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body
            className={`${inter.className} antialiased light min-h-screen overflow-x-hidden`}
        >
            <main className="min-h-screen">
                {children}
            </main>
            {/* Umami Analytics — privacy-first, no cookies, no IDs */}
            <Script
                src="http://10.248.11.106:3000/script.js"
                data-website-id="196ce4c0-1ff4-442d-bb46-0e558ecef659"
                strategy="afterInteractive"
            />
            <PageExitTracker />
        </body>
        </html>
    );
}
