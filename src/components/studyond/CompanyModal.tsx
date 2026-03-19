"use client";

import React from "react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    Chip,
    Divider,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
    ScrollShadow,
    Tab,
    Tabs,
} from "@heroui/react";
import { Icon } from "@iconify/react";

type Expert = {
    id: number;
    name: string;
    role: string;
    image?: string;
    description: string;
    tags: string[];
};

type Project = {
    id: number;
    title: string;
    status: string;
    university: string;
    program: string;
    universityLogo: string;
};

const experts: Expert[] = [
    {
        id: 1,
        name: "Perrell Brown",
        role: "Conversational AI Lead",
        image:
            "https://static.wikia.nocookie.net/althistory/images/f/f3/298920915_135537202515207_2050023248931691706_n.jpg",
        description:
            "Conversational AI, conversation design, chatbots, voicebots, digitalization, project management, prompt engineering.",
        tags: ["Interviews"],
    },
    {
        id: 2,
        name: "Luna Formanek",
        role: "Head of University Entry Programs",
        image:
            "https://resources.studyond.com/profile/experts/c2b364d5-0c57-47ce-8982-b5bf3cc17617/e2e20c7f-fd14-4105-9991-82fa5320412f-Bild10.jpg",
        description:
            "Recruitment, entry programs, talent mobility, university marketing.",
        tags: ["Interviews", "Research"],
    },
    {
        id: 3,
        name: "Giuliana Breu",
        role: "Open Innovation Manager",
        image:
            "https://resources.studyond.com/profile/experts/b7f31e9a-2aeb-4822-a7b4-5f6ce53b9d20/ef48cd09-d254-4898-bf8c-38c5613144fe-GiulianaBreu_quadratisch.jpg",
        description:
            "Open innovation, marketing, communication, collaboration with external partners.",
        tags: ["Interviews", "Guest lectures"],
    },
];

const projects: Project[] = [
    {
        id: 1,
        title:
            "Strategic decision tool: Battery storage vs. high-capacity grid connection",
        status: "Ongoing",
        university: "ETH Zürich",
        program: "Energy Science and Technology",
        universityLogo:
            "https://resources.studyond.com/university/profile/8f4cbe54-8389-4ea9-9f3a-f2761c526802/ethz_ch.png",
    },
    {
        id: 2,
        title:
            "What users really want – Foundations for user-centered expansion of public charging infrastructure",
        status: "Ongoing",
        university: "FHNW",
        program: "Work, Organizational and Personnel Psychology",
        universityLogo:
            "https://resources.studyond.com/university/profile/d24dad6b-6c45-4d99-8be4-cfaa0465eef9/fhnw_ch.png",
    },
];

function ExpertCard({ expert }: { expert: Expert }) {
    return (
        <Card className="w-[280px] min-w-[280px] rounded-2xl border border-default-200 shadow-sm">
            <CardBody className="flex h-full flex-col gap-5 px-6 py-7">
                <Avatar
                    className="h-16 w-16 rounded-xl"
                    name={expert.name}
                    src={expert.image}
                />

                <div className="space-y-1">
                    <h4 className="line-clamp-1 text-lg font-medium">{expert.name}</h4>
                    <p className="line-clamp-1 text-sm text-default-500">{expert.role}</p>
                </div>

                <p className="line-clamp-4 min-h-20 text-sm leading-6 text-default-600">
                    {expert.description}
                </p>

                <div className="flex flex-wrap gap-2">
                    {expert.tags.map((tag) => (
                        <Chip key={tag} size="sm" variant="bordered" className="rounded-full">
                            {tag}
                        </Chip>
                    ))}
                </div>
            </CardBody>
        </Card>
    );
}

function ProjectCard({ project }: { project: Project }) {
    return (
        <Card className="w-[280px] min-w-[280px] rounded-2xl border border-default-200 shadow-sm">
            <CardBody className="flex h-full flex-col justify-between gap-5 px-6 py-7">
                <div className="space-y-5">
                    <div className="flex items-start justify-between gap-4">
                        <div className="h-5 w-5 rounded-full bg-default-200" />
                        <Chip size="sm" color="secondary" variant="flat">
                            {project.status}
                        </Chip>
                    </div>

                    <h4 className="line-clamp-5 text-lg font-medium leading-7">
                        {project.title}
                    </h4>

                    <div className="space-y-2">
                        <p className="text-xs font-medium uppercase tracking-wide text-default-500">
                            In collaboration with
                        </p>

                        <div className="flex items-center gap-3">
                            <Avatar
                                className="h-6 w-6 rounded-sm"
                                name={project.university}
                                src={project.universityLogo}
                            />
                            <div className="min-w-0">
                                <p className="truncate text-sm">{project.university}</p>
                                <p className="truncate text-xs text-default-500">
                                    {project.program}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

type CompanyModalProps = {
    isOpen: boolean;
    onOpenChange: () => void;
};

export default function CompanyModal({
                                         isOpen,
                                         onOpenChange,
                                     }: CompanyModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="5xl"
            scrollBehavior="inside"
            classNames={{
                base: "rounded-3xl",
                body: "p-0",
                header: "hidden",
                closeButton: "top-4 right-4 z-50",
            }}
        >
            <ModalContent>
                {() => (
                    <>
                        <ModalHeader />

                        <ModalBody>
                            <div className="relative overflow-hidden rounded-3xl ">
                                <img
                                    alt="Company Background"
                                    className="h-36 w-full object-cover object-center sm:h-48"
                                    src="https://resources.studyond.com/company/background/2e6a39e1-3d81-4360-aa65-1fb1c9e2d385-PostAuto-Graubuenden-Lenzerheide-2024-High-Res.jpg"
                                />

                                <div className="absolute left-5 top-24 sm:left-6 sm:top-32">
                                    <div className="rounded-md border border-default-200 bg-white p-1 shadow-sm">
                                        <Avatar
                                            className="h-24 w-24 rounded-sm object-contain"
                                            name="Swiss Post"
                                            src="https://resources.studyond.com/company/profile/8c494c4c-aeed-4571-ae56-0f0618460865-Post_Logo_digital_RGB.png"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-8 px-0 pb-0 pt-6 sm:flex-row sm:gap-12">
                                    <aside className="w-full self-stretch pl-5 pr-5 pt-10 sm:pl-6 sm:pr-0 sm:pt-16 md:min-w-[290px] md:max-w-[290px]">
                                        <div className="flex flex-col gap-6 sm:gap-8">
                                            <div className="flex flex-col gap-5">
                                                <div className="space-y-5">
                                                    <h2 className="text-xl font-semibold">
                                                        Swiss Post
                                                    </h2>

                                                    <div className="flex flex-wrap gap-2">
                                                        <span className="self-center text-sm font-medium">
                                                            Open to:
                                                        </span>
                                                        <Chip size="sm" variant="bordered" className="rounded-full">
                                                            Topic proposal
                                                        </Chip>
                                                    </div>

                                                    <div className="flex flex-col gap-3 text-sm text-default-600">
                                                        <div className="flex items-start gap-2">
                                                            <Icon
                                                                icon="tabler:map-pin"
                                                                className="mt-0.5 shrink-0 text-default-500"
                                                                width={16}
                                                            />
                                                            <span>Bern, Switzerland</span>
                                                        </div>

                                                        <div className="flex items-start gap-2">
                                                            <Icon
                                                                icon="tabler:users"
                                                                className="mt-0.5 shrink-0 text-default-500"
                                                                width={16}
                                                            />
                                                            <span>10,000+ employees</span>
                                                        </div>

                                                        <div className="flex items-start gap-2">
                                                            <Icon
                                                                icon="tabler:messages"
                                                                className="mt-0.5 shrink-0 text-default-500"
                                                                width={16}
                                                            />
                                                            <div className="flex flex-col">
                                                                <Link href="#" size="sm" className="w-fit">
                                                                    Luna Formanek
                                                                </Link>
                                                                <span className="text-xs text-default-500">
                                                                    Head of University Entry Programs
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <Button
                                                color="primary"
                                                className="w-fit rounded-xl"
                                                startContent={
                                                    <Icon icon="tabler:folder-plus" width={18} />
                                                }
                                            >
                                                Suggest a topic
                                            </Button>
                                        </div>
                                    </aside>

                                    <div className="min-w-0 w-full px-5 pb-6 pr-5 sm:px-0 sm:pb-8 sm:pr-6">
                                        <Tabs
                                            aria-label="Company sections"
                                            variant="underlined"
                                            classNames={{
                                                tabList: "gap-4 px-0",
                                                cursor: "w-full",
                                                tab: "px-1 h-9",
                                                panel: "pt-6 px-0",
                                            }}
                                        >
                                            <Tab key="overview" title="Overview">
                                                <div className="flex flex-col gap-8 max-h-[500px] overflow-y-auto">
                                                    <section className="flex flex-col gap-4">
                                                        <div className="flex items-center justify-between">
                                                            <h3 className="text-xl font-medium">About us</h3>
                                                        </div>

                                                        <p className="max-w-none pr-0 text-sm leading-7 text-default-600 sm:pr-6">
                                                            Swiss Post moves people, goods, and information—
                                                            every day, in every corner of Switzerland. To remain
                                                            relevant tomorrow, we rely on people who take
                                                            responsibility, stay curious, and actively shape
                                                            change. Collaboration, diversity, and mutual respect
                                                            are not just buzzwords for us, but the foundation of
                                                            progress. Whether in logistics, communication, or
                                                            digital innovation, together we create solutions that
                                                            make life easier. Your contribution makes the
                                                            difference.
                                                        </p>
                                                    </section>

                                                    <section className="flex flex-col gap-4">
                                                        <div className="flex items-center justify-between sm:pr-6">
                                                            <h3 className="text-xl font-medium">
                                                                People ({experts.length})
                                                            </h3>

                                                            <Button
                                                                size="sm"
                                                                variant="light"
                                                                endContent={
                                                                    <Icon icon="tabler:arrow-narrow-right" width={16} />
                                                                }
                                                            >
                                                                View all
                                                            </Button>
                                                        </div>

                                                        <ScrollShadow
                                                            hideScrollBar
                                                            orientation="horizontal"
                                                            className="w-full"
                                                        >
                                                            <div className="flex gap-6 pb-1 pr-6">
                                                                {experts.map((expert) => (
                                                                    <ExpertCard key={expert.id} expert={expert} />
                                                                ))}
                                                            </div>
                                                        </ScrollShadow>
                                                    </section>

                                                    <section className="flex flex-col gap-4">
                                                        <div className="flex items-center justify-between sm:pr-6">
                                                            <h3 className="text-xl font-medium">
                                                                Projects ({projects.length})
                                                            </h3>
                                                        </div>

                                                        <ScrollShadow
                                                            hideScrollBar
                                                            orientation="horizontal"
                                                            className="w-full"
                                                        >
                                                            <div className="flex gap-6 pb-1 pr-6">
                                                                {projects.map((project) => (
                                                                    <ProjectCard key={project.id} project={project} />
                                                                ))}
                                                            </div>
                                                        </ScrollShadow>
                                                    </section>
                                                </div>
                                            </Tab>

                                            <Tab key="people" title="People">
                                                <div className="grid gap-4 pr-0 sm:pr-6 md:grid-cols-2">
                                                    {experts.map((expert) => (
                                                        <ExpertCard key={expert.id} expert={expert} />
                                                    ))}
                                                </div>
                                            </Tab>

                                            <Tab key="projects" title="Projects">
                                                <div className="grid gap-4 pr-0 sm:pr-6 md:grid-cols-2">
                                                    {projects.map((project) => (
                                                        <ProjectCard key={project.id} project={project} />
                                                    ))}
                                                </div>
                                            </Tab>

                                            <Tab key="about" title="About us">
                                                <div className="pr-0 sm:pr-6">
                                                    <Card className="rounded-2xl border border-default-200 shadow-none">
                                                        <CardBody className="px-5 py-5">
                                                            <p className="text-sm leading-7 text-default-600">
                                                                Swiss Post connects people, businesses, and
                                                                regions. In addition to logistics and delivery,
                                                                we invest heavily in digital services,
                                                                innovation, and sustainable development. For
                                                                students and graduates, we offer practical
                                                                topics, close collaboration with experts, and
                                                                insights into large-scale real-world systems.
                                                            </p>
                                                        </CardBody>
                                                    </Card>
                                                </div>
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </div>
                                <Divider />
                            </div>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}