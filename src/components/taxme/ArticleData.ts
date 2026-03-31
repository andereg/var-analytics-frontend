import React from "react";

export type ArticleData = {
    title: string;
    subtitle?: string;
    content: React.ReactNode;
    author?: string;
    date?: string;
    ref?: string;
};