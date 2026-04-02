import React, {useEffect} from "react";
import {Card, CardBody, CardFooter, CardHeader} from "@heroui/react";
import {ArticleData} from "@/components/taxme/ArticleData";
import { usePostHog } from 'posthog-js/react'
import Breadcrumb from "@/components/steppers/Breadcrumb";

interface ArticleProps {
    data: ArticleData;
}


export const Article: React.FC<ArticleProps> = ({ data }) => {
    const posthog = usePostHog()

    useEffect(() => {
        const startTime = Date.now()

        const timer = setTimeout(() => {
            posthog.capture('article_engaged', {
                article_id: data.ref,
                article_title: data.title,
                time_on_page: Math.round((Date.now() - startTime) / 1000), // seconds
            })
        }, 30_000) // 30 seconds

        return () => clearTimeout(timer) // user left before 30s – cancel
    }, [data.ref])


    return (
        <div className="min-h-screen  px-4 py-4 md:px-8">
            <div className="mx-auto max-w-6xl">
                <Card className="rounded-3xl border border-default-200 shadow-lg min-w-200 min-h-200">
                    <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                        <Breadcrumb/>
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