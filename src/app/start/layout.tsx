"use client";

import React from "react";
import Sidebar from "@/components/studyond/Sidebar";



export default function StartLayout({
                                        children,
                                    }: {
    children: React.ReactNode;
}) {



    return (
        <div className="min-h-screen flex bg-white">
            <Sidebar />

            <div className="flex flex-col items-center flex-1 p-6">
                { /*route dependant */}
                {children}
            </div>
        </div>
    );
}