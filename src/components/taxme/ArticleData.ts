import React from "react";

export type ArticleData = {
    title: string;
    subtitle?: string;
    content: React.ReactNode; // 🔥 key change
    author?: string;
    date?: string;
};