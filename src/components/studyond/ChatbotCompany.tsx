"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Divider,
    useDisclosure,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { BookOpen, Building2, GraduationCap, User } from "lucide-react";

import CircleChart from "@/components/charts/CircleChart";
import Chatbot from "@/components/meta/Chatbot";
import CompanyModal from "@/components/studyond/CompanyModal";
import { useTopics } from "@/context/TopicContext";
import { getHydratedTopic, getAllCompanies, getAllSupervisors, getCompanyById, getSupervisorById } from "@/api/mockData";
import PersonModal from "@/components/studyond/PersonModal";

type Suggestion = {
    id: string;
    name: string;
    description: string;
    compatibility: number;
    type: "company" | "supervisor";
    location?: string;
    industry?: string;
    logo?: string;
    title?: string; // for supervisors
    university?: string; // for supervisors
};

export default function ChatbotCompany({ selectCompany, initialMessage }: { selectCompany?: () => void, initialMessage?: string }) {
    const { lastAddedTopicId, topicSelections, setCompanyForTopic, setSupervisorForTopic } = useTopics();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [selectedItem, setSelectedItem] = useState<Suggestion | null>(null);

    const randomPeople = [
        { name: "Alice Johnson", src: "https://as1.ftcdn.net/jpg/02/94/62/14/1000_F_294621430_9dwIpCeY1LqefWCcU23pP9i11BgzOS0N.jpg" },
        { name: "Bob Smith", src: "https://static.vecteezy.com/system/resources/thumbnails/072/596/987/small/confident-man-in-suit-stands-in-bright-modern-office-space-illuminated-by-natural-light-his-professional-demeanor-reflects-success-and-ambition-photo.jpeg" },
        { name: "Charlie Brown", src: "https://blog-pixomatic.s3.appcnt.com/image/22/01/26/61f166e1e3b25/_orig/pixomatic_1572877090227.png" },
        { name: "Diana Prince", src: "https://www.headshotphoto.io/images/linkedin/img-4.webp" },
        { name: "Eva Green", src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkGb0KXZff72_aNYCOMxSo3wBXLUugcSQItw&s" },
        { name: "Frank Miller", src: "https://i0.wp.com/annemariesegal.com/wp-content/uploads/2017/04/adobestock_86346713-cropped-young-woman-in-suit.jpg?fit=1200%2C1118&ssl=1" },
        { name: "Grace Hopper", src: "https://retratosbarcelona.com/wp-content/uploads/2022/09/Retratos-Barcelona-Linkedin-Photography-Alejandra.jpg" },
        { name: "Henry Cavill", src: "https://www.corporatephotographylondon.com/wp-content/uploads/2019/01/DSC0799-copy.jpg" },
    ];

    const getStablePerson = (id: string) => {
        // Simple hash from string to index
        let hash = 0;
        for (let i = 0; i < id.length; i++) {
            hash = id.charCodeAt(i) + ((hash << 5) - hash);
        }
        const index = Math.abs(hash) % randomPeople.length;
        return randomPeople[index];
    }

    // Get the topic we are currently working on
    const topicData = useMemo(() => {
        if (!lastAddedTopicId) return null;
        const base = getHydratedTopic(lastAddedTopicId);
        if (!base) return null;

        const selection = topicSelections[lastAddedTopicId];
        if (!selection) return base;

        // Create a copy to merge selections
        const hydrated = { ...base };
        if (selection.companyId) {
            hydrated.companyId = selection.companyId;
            hydrated.company = getCompanyById(selection.companyId) || null;
        }
        if (selection.supervisorId) {
            const supervisor = getSupervisorById(selection.supervisorId);
            if (supervisor) {
                hydrated.supervisors = [supervisor];
                hydrated.supervisorIds = [selection.supervisorId];
            }
        }
        return hydrated;
    }, [lastAddedTopicId, topicSelections]);

    // Current selections for this topic (either from mock data or from context)
    const currentCompany = topicSelections[lastAddedTopicId || ""]?.companyId || topicData?.companyId;
    const currentSupervisor = topicSelections[lastAddedTopicId || ""]?.supervisorId || topicData?.supervisorIds?.[0];

    // Decide what to suggest: If company is set, suggest supervisors. Else suggest companies.
    const mode = currentCompany ? "supervisor" : "company";

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [hasUserRequested, setHasUserRequested] = useState(false);

    const handleRecommendations = useCallback((ids: string[]) => {
        setHasUserRequested(true);
        // Look for both companies and supervisors
        const companyMatches = getAllCompanies().filter(c => ids.includes(c.id));
        const supervisorMatches = getAllSupervisors().filter(s => ids.includes(s.id));

        const mappedCompanies = companyMatches.map(c => ({
            id: c.id,
            name: c.name,
            description: c.description,
            compatibility: 70 + Math.floor(Math.random() * 25),
            type: "company" as const,
            location: "Switzerland",
            industry: c.domains[0],
        }));

        const mappedSupervisors = supervisorMatches.map(s => ({
            id: s.id,
            name: `${s.title} ${s.firstName} ${s.lastName}`,
            description: s.about || "Expert in your thesis field.",
            compatibility: 70 + Math.floor(Math.random() * 25),
            type: "supervisor" as const,
            university: "Swiss University",
        }));

        // Combine them, but prioritize those that match the current IDs order
        const combined = [...mappedCompanies, ...mappedSupervisors].sort((a, b) => {
            return ids.indexOf(a.id) - ids.indexOf(b.id);
        });

        setSuggestions(combined);
    }, []);

    // Provide initial suggestions based on topic and mode
    useEffect(() => {
        if (!topicData || hasUserRequested) return;

        if (mode === "company") {
            const companyIds = [];
            if (topicData.companyId) {
                companyIds.push(topicData.companyId);
            }
            // Add some other companies
            const others = getAllCompanies()
                .filter(c => c.id !== topicData.companyId)
                .slice(0, 3 - companyIds.length)
                .map(c => c.id);
            
            const ids = [...companyIds, ...others];
            const matches = getAllCompanies().filter(c => ids.includes(c.id));
            setSuggestions(matches.map(c => ({
                id: c.id,
                name: c.name,
                description: c.description,
                compatibility: 70 + Math.floor(Math.random() * 25),
                type: "company",
                location: "Switzerland",
                industry: c.domains[0],
            })));
        } else {
            const supervisorIds = topicData.supervisorIds || [];
            // Find supervisors with matching fields
            const matched = getAllSupervisors()
                .filter(s => !supervisorIds.includes(s.id) && s.fieldIds.some(fid => topicData.fieldIds.includes(fid)))
                .slice(0, Math.max(0, 3 - supervisorIds.length))
                .map(s => s.id);
            
            // If still few, add some more
            const finalIds = [...supervisorIds, ...matched];
            if (finalIds.length < 3) {
                const randoms = getAllSupervisors()
                    .filter(s => !finalIds.includes(s.id))
                    .slice(0, 3 - finalIds.length)
                    .map(s => s.id);
                finalIds.push(...randoms);
            }
            
            const matches = getAllSupervisors().filter(s => finalIds.includes(s.id));
            setSuggestions(matches.map(s => ({
                id: s.id,
                name: `${s.title} ${s.firstName} ${s.lastName}`,
                description: s.about || "Expert in your thesis field.",
                compatibility: 70 + Math.floor(Math.random() * 25),
                type: "supervisor",
                university: "Swiss University",
            })));
        }
    }, [topicData, mode, hasUserRequested]);

    // Reset user requested flag when topic or mode changes to allow fresh initial suggestions
    useEffect(() => {
        setHasUserRequested(false);
    }, [topicData?.id, mode]);

    const handleSelect = (item: Suggestion) => {
        if (!lastAddedTopicId) return;
        if (item.type === "company") {
            setCompanyForTopic(lastAddedTopicId, item.id);
        } else {
            setSupervisorForTopic(lastAddedTopicId, item.id);
        }
        selectCompany?.();
    };

    const handleViewProfile = (item: Suggestion) => {
        setSelectedItem(item);
        onOpen();
    };

    if (!topicData) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <p className="text-default-500">Please select a thesis topic first.</p>
            </div>
        );
    }

    return (

        <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 duration-700">
            { mode == 'company' ?
                <CompanyModal isOpen={isOpen} onOpenChange={onOpenChange} />
            :
                <PersonModal isOpen={isOpen} onOpenChange={onOpenChange} />
            }
                {/* Topic Banner */}
                <div className="px-4 py-4 lg:px-6 lg:py-6 w-full max-w-[1600px]">
                    <Card className="bg-default-50 border border-default-200 shadow-sm">
                        <CardBody className="py-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary-100 text-primary rounded-xl">
                                    <BookOpen className="w-8 h-8 "/>
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs font-semibold text-primary uppercase tracking-wider">Active
                                        matching for</p>
                                    <h1 className="text-2xl font-bold">
                                        {topicData.title}
                                    </h1>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3">
                                        <div className="flex gap-2 items-center text-sm text-default-600">
                                            <User className="w-4 h-4 text-primary"/>
                                            <span>{topicData.supervisors && topicData.supervisors[0] ? `${topicData.supervisors[0].title} ${topicData.supervisors[0].firstName} ${topicData.supervisors[0].lastName}` : "No supervisor assigned"}</span>
                                        </div>
                                        <div className="flex gap-2 items-center text-sm text-default-600">
                                            <Building2 className="w-4 h-4 text-primary"/>
                                            <span>{topicData.company?.name || "No company assigned"}</span>
                                        </div>
                                        <div className="flex gap-2 items-center text-sm text-default-600">
                                            <GraduationCap className="w-4 h-4 text-primary"/>
                                            <span>{(topicData.degrees?.[0] || "bsc").toUpperCase()} Thesis</span>
                                        </div>
                                    </div>
                                </div>
                                <Chip color={mode === "company" ? "primary" : "secondary"} variant="flat"
                                      className="hidden md:block">
                                    Seeking {mode === "company" ? "Industry Partner" : "Academic Supervisor"}
                                </Chip>
                            </div>
                        </CardBody>
                    </Card>
                </div>

                <div className="mx-auto flex min-h-screen w-full max-w-[1600px] gap-6 px-4 lg:px-6 ">
                    <div className="flex min-w-0 flex-1 flex-col">
                        <Chatbot
                            title={`${mode === "company" ? "Company" : "Supervisor"} Matcher`}
                            subtitle={`Finding the best ${mode}s for your topic`}
                            onTopicsRecommended={handleRecommendations}
                            initialMessage={initialMessage}
                        />
                    </div>

                    <aside className="hidden w-[390px] shrink-0 xl:block">
                        <Card
                            className="sticky top-6 flex max-h-[calc(100vh-3rem)] flex-col overflow-hidden rounded-[2rem] border border-default-200 shadow-xl">
                            <CardHeader className="flex shrink-0 flex-col items-start gap-2 px-5 py-5">
                                <div className="flex w-full items-center justify-between gap-3">
                                    <div>
                                        <h2 className="text-lg font-semibold">Suggested {mode}s</h2>
                                        <p className="text-sm text-default-500">
                                            Top matches for this topic
                                        </p>
                                    </div>
                                    <Chip color="secondary" variant="flat">
                                        {suggestions.length} matches
                                    </Chip>
                                </div>
                            </CardHeader>

                            <Divider className="shrink-0"/>

                            <CardBody className="min-h-0 flex-1 overflow-hidden p-0">
                                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
                                    <div className="space-y-4">
                                        {suggestions.map((item) => (
                                            <Card
                                                className="h-auto overflow-visible rounded-3xl border border-default-200 shadow-sm"
                                                key={item.id}>
                                                <CardBody className="h-auto overflow-visible p-4">
                                                    <div className="space-y-4">
                                                        <div className="flex items-start gap-3">
                                                            <div className="shrink-0 pt-0.5">
                                                                <div className="relative h-12 w-12 shrink-0">
                                                                    <CircleChart
                                                                        pro={item.compatibility}
                                                                        contra={Math.max(0, 100 - item.compatibility)}
                                                                        size={48}
                                                                    />
                                                                    <div
                                                                        className="absolute inset-0 flex items-center justify-center">
                                                                        <Avatar
                                                                            className="h-7 w-7"
                                                                            name={item.name}
                                                                            src={getStablePerson(item.id).src}
                                                                            icon={item.type === "supervisor" ?
                                                                                <User size={14}/> :
                                                                                <Building2 size={14}/>}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="min-w-0 flex-1">
                                                                <h3 className="min-w-0 text-sm font-semibold leading-5 md:text-base">
                                                                    {item.name}
                                                                </h3>
                                                                <div
                                                                    className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-default-500">
                                                                    <div className="flex items-center gap-1">
                                                                        <Icon
                                                                            icon={item.type === "company" ? "solar:buildings-2-linear" : "solar:library-linear"}
                                                                            width={14}/>
                                                                        <span>{item.type === "company" ? item.industry : item.university}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <p className="break-words text-xs leading-5 text-default-500 md:text-sm line-clamp-3">
                                                            {item.description}
                                                        </p>

                                                        <div className="flex gap-2">
                                                            <Button
                                                                className="flex-1 rounded-2xl"
                                                                color="default"
                                                                variant="flat"
                                                                onPress={() => handleViewProfile(item)}
                                                                size="sm"
                                                            >
                                                                View Profile
                                                            </Button>
                                                            <Button
                                                                className="flex-1 justify-between rounded-2xl text-black"
                                                                color="primary"
                                                                size="sm"
                                                                endContent={<Icon icon="solar:arrow-right-linear" width={16} />}
                                                                variant="flat"
                                                                onPress={() => handleSelect(item)}
                                                            >
                                                                Select
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardBody>
                                            </Card>
                                        ))}
                                        {suggestions.length === 0 && (
                                            <div className="py-10 text-center text-default-400">
                                                <Icon icon="solar:magic-stick-3-linear"
                                                      className="mx-auto mb-2 opacity-20" width={48}/>
                                                <p className="text-sm">Ask the assistant to recommend {mode}s</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </aside>
                </div>
            </div>
            );
            }
