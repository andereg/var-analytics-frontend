import React from "react";
import {Card, CardBody, CardFooter, CardHeader, Link} from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";

interface ArticleProps {
    data: ArticleData;
}


export const Article: React.FC<ArticleProps> = ({ data }) => {
    return (
        <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 px-4 py-4 duration-700 md:px-8">
            <div className="mx-auto max-w-6xl">
                <Card className="rounded-3xl border border-default-200 shadow-lg min-w-200 min-h-200">
                    <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                        <div className="space-y-2">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {data.title}
                            </h1>

                            {data.subtitle && (
                                <p className="max-w-4xl text-sm text-default-500">
                                    {data.subtitle}
                                </p>
                            )}

                            {(data.author || data.date) && (
                                <div className="flex flex-wrap items-center gap-2 text-sm text-default-400">
                                    {data.author && <span>{data.author}</span>}
                                    {data.date && <span>• {data.date}</span>}
                                </div>
                            )}
                        </div>
                    </CardHeader>

                    <CardBody className="px-6 pb-8 pt-2 md:px-8">
                        <article className="space-y-6 text-default-700 leading-7">
                            {data.content}
                        </article>
                    </CardBody>
                    <CardFooter className="ml-2  text-sm text-default-400">
                        {data.author && <span>{data.author}</span>}
                        {data.date && <span>, {data.date}</span>}
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};