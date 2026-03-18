import type {Metadata} from "next";
import "./globals.css";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Link} from "@heroui/link";
import {Button} from "@heroui/button";
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

export const Logo = () => {
    return (
        <svg fill="none" height="28" viewBox="0 0 3333 3333" width="28" className="mb-1">
            <path d="M208 208h2629l41 417H208zM208 1041h417v2084H208zM1041 2708h2042l17 170 7 66v3l16 173h2v5H1041zM1041 1874h1960l41 418H1041zM1041 1041h1878l41 418H1041z" fill="white"/>
        </svg>
    );
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
