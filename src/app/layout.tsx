import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import React from "react";


const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Steuererklärung Kanton Alpengrün",
    description: "Your interactive helper for your thesis"
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
        </body>
        </html>
    );
}
