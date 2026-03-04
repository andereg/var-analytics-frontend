import type {Metadata} from "next";
import "./globals.css";
import {Navbar, NavbarBrand, NavbarContent, NavbarItem} from "@heroui/navbar";
import {Link} from "@heroui/link";
import {Button} from "@heroui/button";
import {Inter} from "next/font/google";


const inter = Inter({
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "VAR Analytics",
    description: "Explore controversial On-Field and VAR decisions in football with our comprehensive analytics platform. Dive into detailed reports, visualizations, and insights to understand the impact of controversial decisions on the beautiful game."
};

export const Logo = () => {
    return (
        <svg fill="none" height="28" viewBox="0 0 16 16" width="28" className="mb-1">

            <path d="M15 1H1V3H15V1Z" fill="white"/>
            <path d="M1 5H3V15H1V5Z" fill="white"/>
            <path d="M5 13H15V15H5V13Z" fill="white"/>
            <path d="M15 9H5V11H15V9Z" fill="white"/>
            <path d="M5 5H15V7H5V5Z" fill="white"/>

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
        <Navbar className="py-3 bg-gradient-to-r from-blue-900 to-indigo-900 text-white backdrop-blur-xl
  border-b border-white/10 ">
            <NavbarBrand>
                <Link href="/">
                    <Logo/>
                </Link>
                {/*<p className=" text-inherit">VAR Analytics</p>*/}
            </NavbarBrand>
            {/*<div className="border border-gray-600/50 px-8 rounded-3xl sm:block">*/}
            <NavbarContent
                className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Button
                        as={Link}
                        href="/club/36"
                        radius="full"
                        color="primary"
                        variant="light"
                        className="text-white text-base font-medium"
                    >
                        Real Madrid
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        href="/club/40"
                        radius="full"
                        color="primary"
                        variant="light"
                        className="text-white text-base font-medium"
                    >
                        FC Barcelona
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        href="/club/1"
                        radius="full"
                        color="primary"
                        variant="light"
                        className="text-white text-base font-medium"
                    >
                        Arsenal
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        href="/club/15"
                        radius="full"
                        color="primary"
                        variant="light"
                        className="text-white text-base font-medium"
                    >
                        Manchester City
                    </Button>
                </NavbarItem>
                <NavbarItem>
                    <Button
                        as={Link}
                        href="/club/65"
                        radius="full"
                        color="primary"
                        variant="light"
                        className="text-white text-base font-medium"
                    >
                        Bayern Munich
                    </Button>
                </NavbarItem>
            </NavbarContent>

            <NavbarContent justify="end">
                <NavbarItem>
                    <Button
                        as={Link}
                        href="/report"
                        radius="full"
                        color="secondary"
                        variant="ghost"
                        className="text-white text-base font-medium"
                    >
                        Report Decision
                    </Button>
                </NavbarItem>
            </NavbarContent>
        </Navbar>
        <main className="min-h-screen">
            {children}
        </main>
        </body>
        </html>
    );
}
