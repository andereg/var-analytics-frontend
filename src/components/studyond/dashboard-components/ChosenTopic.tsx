// components/dashboard/DeadlineCountdown.tsx
"use client";

import { Card, CardBody } from "@heroui/react";
import {Clock, AlertTriangle, BookOpen, User, Building2, GraduationCap} from "lucide-react";

interface ChosenTopicProps {
    topic: string;
    supervisor: string;
    company: string;
    studyProgram: string;
}

export default function ChosenTopic({
                                              topic,
                                              supervisor,
                                              company,
                                              studyProgram
                                          }: ChosenTopicProps) {

    return (
        <Card className="from-primary-500 to-secondary-500 overflow-hidden h-56 pb-0">
            <CardBody className="py-4 pb-0">
                <div className="flex items-center">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <BookOpen className="w-8 h-8 "/>
                    </div>
                    <div>
                        <p className=" text-sm font-medium opacity-50">Your chosen topic</p>
                        <h1 className="text-md md:text-md font-bold">
                            {topic}
                        </h1>
                    </div>
                </div>
                <div className="flex flex-wrap px-4 pt-1">
                    <p className="text-sm mt-2 flex gap-3 mr-4 items-center">
                        <User className="w-5 h-5 "/>
                        {supervisor}</p>
                    <p className="text-sm mt-2 flex gap-2 items-center">
                        <Building2 className="w-5 h-5 "/>
                        {company}</p>
                    <p className="text-sm mt-2 flex gap-2 items-center">
                        <GraduationCap className="w-5 h-5 "/>
                        {studyProgram}</p>
                </div>
            </CardBody>
        </Card>
    );
}