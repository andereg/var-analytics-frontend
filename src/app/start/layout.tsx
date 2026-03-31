"use client";

import React from "react";
import Sidebar from "@/components/studyond/Sidebar";
import {Button, Link, Tooltip} from "@heroui/react";
import {Bell, Menu, PanelLeft, UserPlus} from "lucide-react";

const AiChatIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
            d="M21 9.5V7C21 6.20435 20.6839 5.44129 20.1213 4.87868C19.5587 4.31607 18.7956 4 18 4H6C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V15C3 15.7956 3.31607 16.5587 3.87868 17.1213C4.44129 17.6839 5.20435 18 6 18H8V21L13 18H14.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M19.5 19C19.7053 18.1513 20.1406 17.3755 20.7581 16.7581C21.3755 16.1406 22.1513 15.7053 23 15.5C22.1513 15.2947 21.3755 14.8594 20.7581 14.2419C20.1406 13.6245 19.7053 12.8487 19.5 12C19.2947 12.8487 18.8594 13.6245 18.2419 14.2419C17.6245 14.8594 16.8487 15.2947 16 15.5C16.8487 15.7053 17.6245 16.1406 18.2419 16.7581C18.8594 17.3755 19.2947 18.1513 19.5 19Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default function StartLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex bg-white">
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header
                    className="sticky top-0 z-40 flex h-14 items-center justify-between bg-background/80 bg-white px-4">
                    <div className="flex items-center gap-2">
                        <Link href="/" className="md:hidden">

                        </Link>

                        <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            className="hidden lg:flex"

                        >
                            <PanelLeft size={18}/>
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        <Tooltip content="Benachrichtigungen">
                            <Button isIconOnly variant="light" size="sm">
                                <Bell size={18}/>
                            </Button>
                        </Tooltip>

                        <Button variant="bordered" size="sm" startContent={<UserPlus size={16}/>}>
                            <span className="hidden sm:inline">Vertretung hinzufügen</span>
                        </Button>

                        <Tooltip content="Steuer-Assistent">
                            <Button isIconOnly variant="bordered" size="sm">
                                <AiChatIcon size={18}/>
                            </Button>
                        </Tooltip>

                        <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            className="md:hidden"
                        >
                            <Menu size={18}/>
                        </Button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}