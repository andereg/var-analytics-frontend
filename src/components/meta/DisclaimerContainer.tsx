"use client";

import React from "react";
import {Avatar, Tab, Tabs} from "@heroui/react";

import FeaturesCards from "./features-cards";

export function DisclaimerContainer() {
    return (
        <div className="flex w-full max-w-full flex-col gap-8">
            <div className="flex h-full flex-col justify-center gap-10">
                <FeaturesCards />
            </div>
        </div>
    );
}
