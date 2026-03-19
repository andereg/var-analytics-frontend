"use client";

import React, {useState, useMemo, useEffect} from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { Plus, Sparkles } from "lucide-react";
import { TopicCard } from "./TopicCard";
import { getHydratedTopic } from "@/api/mockData";

interface MyTopicProps {
    onFindTopic?: () => void;
    selectSupervisor?: () => void;
    onDefiniteTopicSelect?: () => void;
    hasFoundTopic?: boolean;
    hasSupervisor?: boolean;
}

export default function MyTopic({
                                    hasFoundTopic = false,
                                    onFindTopic = () => {},
                                    selectSupervisor = () => {},
                                    onDefiniteTopicSelect = () => {},
    hasSupervisor = false
}: MyTopicProps) {
    const [hasTopic, setHasTopic] = useState(false);

    // Get mock data for a specific topic (e.g., 'topic-01')
    const savedTopicData = useMemo(() => {
        return getHydratedTopic("topic-01");
    }, []);

    useEffect(() => {
        setHasTopic(hasFoundTopic)
    }, [hasFoundTopic])

    const companyName = savedTopicData?.company?.name || "Partner Company";

    return (
        <div className="mx-auto w-full max-w-4xl px-4 py-12 md:py-24">
            
            {/* Dev Toggle */}
            <div className="fixed bottom-4 right-4 z-50">
                <Button 
                    size="sm" 
                    variant="flat" 
                    onPress={() => setHasTopic(!hasTopic)}
                    className="bg-default-100/50 backdrop-blur-md text-[10px]"
                >
                    Toggle Saved Topic
                </Button>
            </div>

            {!hasTopic || !savedTopicData ? (
                /* Empty State: Pretty Blank */
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-8 flex h-17 w-17 items-center justify-center rounded-[2rem] bg-primary-50 text-primary shadow-sm">
                        <Sparkles size={48} />
                    </div>
                    <h1 className="mb-4 text-3xl font-black tracking-tight md:text-5xl">
                        Start your journey.
                    </h1>
                    <p className="mb-12 max-w-md text-lg text-default-500">
                        Find the perfect industry-backed topic matched to your academic profile.
                    </p>
                    <Button 
                        color="primary" 
                        size="lg"
                        radius="full"
                        onPress={onFindTopic}
                        className="h-16 px-12 text-xl font-bold shadow-xl shadow-primary/20"
                    >
                        Find My Topic
                    </Button>
                </div>
            ) : (
                /* Saved State */
                <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-end justify-between">
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black tracking-tight">
                                My Topic
                            </h2>
                            <p className="text-lg text-default-500">
                                You're collaborating with {companyName}.
                            </p>
                        </div>
                        
                        <Button
                            isIconOnly
                            radius="full"
                            variant="flat"
                            color="primary"
                            className="h-12 w-12"
                            onPress={onFindTopic} // Discover further
                        >
                            <Plus size={24} />
                        </Button>
                    </div>

                    <TopicCard topic={savedTopicData}
                               companyName={companyName}
                               onSelect={hasSupervisor ? onDefiniteTopicSelect : selectSupervisor}
                               hasTopicSelector={!hasSupervisor}
                               hasDefiniteSelector={hasSupervisor}
                    />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Card className="rounded-[2rem] border border-default-100 bg-default-50/50 shadow-none">
                            <CardBody className="p-6">
                                <h3 className="font-bold">Next Steps</h3>
                                <p className="text-sm text-default-500 mt-1">
                                    Contact your company expert to discuss data access.
                                </p>
                            </CardBody>
                        </Card>
                        <Card className="rounded-[2rem] border border-default-100 bg-default-50/50 shadow-none">
                            <CardBody className="p-6">
                                <h3 className="font-bold">Resources</h3>
                                <p className="text-sm text-default-500 mt-1">
                                    Review the collaboration guidelines for {companyName}.
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}
