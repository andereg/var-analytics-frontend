import React, { useState } from "react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardHeader,
    Chip,
    Link,
    Modal,
    ModalContent,
    ModalBody,
} from "@heroui/react";
import { ArrowLeft, ArrowRight, ArrowRightIcon, X } from "lucide-react";

// Custom Xing Icon
const XingIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M16 21l-4 -7l6.5 -11" />
        <path d="M7 7l2 3.5l-3 4.5" />
    </svg>
);

// Custom Messages Icon
const MessagesIcon = ({ className }: { className?: string }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" />
        <path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />
    </svg>
);

interface ExpertProfileProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    expert?: {
        name: string;
        role: string;
        position: string;
        avatarUrl: string;
        backgroundUrl: string;
        company: {
            name: string;
            logoUrl: string;
            url: string;
        };
        xingUrl?: string;
        linkedinUrl?: string;
        aboutUrl?: string;
        tags: string[];
        education: {
            university: string;
            degree: string;
            logoUrl: string;
        }[];
        activities: {
            id: string;
            title: string;
            status: string;
            authorAvatarUrl: string;
            url: string;
        }[];
        openFor: {
            type: string;
            title: string;
            description: string;
            buttonText: string;
            buttonVariant: "solid" | "light";
            hasArrow?: boolean;
        }[];
    };
}

const defaultExpert = {
    name: "Michael Müller",
    role: "Expert:in",
    position: "Fachkader",
    avatarUrl:
        "https://as1.ftcdn.net/jpg/02/94/62/14/1000_F_294621430_9dwIpCeY1LqefWCcU23pP9i11BgzOS0N.jpg",
    backgroundUrl:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnVzaW5lc3MlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww",
    company: {
        name: "Studyond",
        logoUrl:
            "https://media.licdn.com/dms/image/v2/D560BAQFGFsb60-KWAA/company-logo_200_200/B56ZXyD4gxGoAY-/0/1743522859575/studyond_logo?e=2147483647&v=beta&t=aC3YyDON2iRSWxIsbErbW_cfEDGLK0LDGQ60tTqDHJE",
        url: "/companies/dcd808bb-5ac1-46a4-a21b-ad4d943dc656",
    },
    xingUrl: "https://www.xing.com/profile/michaelmueller1234",
    aboutUrl: "https://studyond.com/",
    tags: ["Engineering & Technologie"],
    education: [
        {
            university: "University of Bradford",
            degree: "Master in Business Administration (MBA)",
            logoUrl:
                "https://resources.studyond.com/university/profile/bradford_ac_uk.png",
        },
    ],
    activities: [
        {
            id: "af50c209-2e42-4d0b-bc1b-47da63dd4fd2",
            title:
                "Praktikum / Masterarbeit: Computer Vision models in practice",
            status: "Offen",
            authorAvatarUrl:
                "https://thispersondoesnotexist.com/",
            url: "/topics?id=af50c209-2e42-4d0b-bc1b-47da63dd4fd2",
        },
    ],
    openFor: [
        {
            type: "interviews",
            title: "Interviews",
            description:
                "Michael ist offen für Interview-Anfragen von Studierenden, Expert:innen und Betreuenden.",
            buttonText: "Interview anfragen",
            buttonVariant: "solid" as const,
        },
        {
            type: "applications",
            title: "Bewerbungen auf Themen",
            description:
                "Michael hat Themen veröffentlicht und ist offen für Bewerbungen.",
            buttonText: "Zu den Themen",
            buttonVariant: "light" as const,
            hasArrow: true,
        },
    ],
};

// Carousel Component
const Carousel = ({
                      children,
                      title,
                  }: {
    children: React.ReactNode;
    title: string;
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = React.Children.toArray(children);
    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < items.length - 1;

    return (
        <Card className="overflow-hidden rounded-xl bg-content1 shadow-none border border-default-200">
            <CardHeader className="flex justify-between items-center px-6 pt-6 pb-0">
                <h3 className="text-lg font-semibold">{title}</h3>
                {items.length > 1 && (
                    <div className="flex gap-2">
                        <Button
                            isIconOnly
                            variant="bordered"
                            size="sm"
                            radius="full"
                            isDisabled={!canGoPrev}
                            onPress={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                        >
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            isIconOnly
                            variant="bordered"
                            size="sm"
                            radius="full"
                            isDisabled={!canGoNext}
                            onPress={() =>
                                setCurrentIndex((prev) => Math.min(items.length - 1, prev + 1))
                            }
                        >
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </div>
                )}
            </CardHeader>
            <CardBody className="overflow-hidden px-6 pb-6 pt-4">
                <div
                    className="flex gap-4 transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * 288}px)` }}
                >
                    {children}
                </div>
            </CardBody>
        </Card>
    );
};

// Open For Card Component
const OpenForCard = ({
                         item,
                     }: {
    item: (typeof defaultExpert.openFor)[0];
}) => (
    <Card className="min-w-[272px] max-w-[272px] h-full border border-default-200 shadow-none">
        <CardBody className="flex flex-col gap-4 p-6">
            <div className="flex items-center gap-2 text-sm font-medium">
                <MessagesIcon className="w-5 h-5" />
                {item.title}
            </div>
            <p className="text-sm text-default-500 min-h-[72px]">{item.description}</p>
            <Button
                size="sm"
                color={item.buttonVariant === "solid" ? "primary" : "default"}
                variant={item.buttonVariant}
                className="self-start"
                endContent={
                    item.hasArrow ? <ArrowRightIcon className="w-4 h-4" /> : null
                }
            >
                {item.buttonText}
            </Button>
        </CardBody>
    </Card>
);

// Activity Card Component
const ActivityCard = ({
                          activity,
                      }: {
    activity: (typeof defaultExpert.activities)[0];
}) => (
    <Link href={activity.url} className="block min-w-[272px] max-w-[272px]">
        <Card className="h-full border border-default-200 hover:border-primary/20 hover:shadow-md transition-all duration-300 shadow-none">
            <CardBody className="flex flex-col gap-5 p-6 pt-8">
                <div className="flex justify-between items-start">
                    <Avatar src={activity.authorAvatarUrl} size="sm" />
                    <Chip color="primary" size="sm">
                        {activity.status}
                    </Chip>
                </div>
                <p className="text-lg font-medium leading-normal line-clamp-6 min-h-[160px]">
                    {activity.title}
                </p>
            </CardBody>
        </Card>
    </Link>
);

// Main Expert Profile Modal Component
export default function PersonModal({
                                        isOpen,
                                        onOpenChange,
                                        expert = defaultExpert,
                                    }: ExpertProfileProps) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            size="2xl"
            scrollBehavior="inside"
            classNames={{
                base: "rounded-3xl max-h-[90vh]",
                body: "p-6",
                closeButton: "hidden",
            }}
        >
            <ModalContent>
                {(onClose) => (
                    <ModalBody className="p-0">
                        {/* Custom Close Button */}
                        <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            className="absolute top-4 right-4 z-50 bg-white/80 backdrop-blur-sm"
                            onPress={onClose}
                        >
                            <X className="w-4 h-4" />
                        </Button>

                        <div className="space-y-6 pb-6">
                            {/* Profile Header */}
                            <div className="relative">
                                {/* Background Image */}
                                <img
                                    src={expert.backgroundUrl}
                                    alt="Company Background"
                                    className="h-40 w-full object-cover object-center rounded-t-3xl"
                                />

                                <div className="px-6 pt-0 space-y-6">
                                    {/* Avatar */}
                                    <Avatar
                                        src={expert.avatarUrl}
                                        className="w-28 h-28 -mt-16 border-4 border-white"
                                        radius="lg"
                                    />

                                    {/* Name and Role */}
                                    <div className="space-y-1">
                                        <div className="flex justify-between items-center">
                                            <h1 className="text-2xl font-medium">{expert.name}</h1>
                                            <span className="text-sm text-default-500">
                        {expert.role}
                      </span>
                                        </div>

                                        {/* Position and Company */}
                                        <div className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-6">
                                            <div className="flex gap-2 items-start sm:w-2/3">
                        <span className="line-clamp-2 text-default-600">
                          {expert.position}
                        </span>
                                            </div>
                                            <div className="flex items-center gap-2 sm:w-1/3 sm:justify-end">
                                                <Avatar
                                                    src={expert.company.logoUrl}
                                                    size="sm"
                                                    radius="sm"
                                                    className="w-5 h-5"
                                                />
                                                <Link
                                                    href={expert.company.url}
                                                    className="text-sm hover:underline line-clamp-2"
                                                >
                                                    {expert.company.name}
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex justify-between items-center">
                                        <Button
                                            color="primary"
                                            size="sm"
                                            startContent={<MessagesIcon className="w-4 h-4" />}
                                        >
                                            Anfrage senden
                                        </Button>
                                        <div className="flex gap-2">
                                            {expert.xingUrl && (
                                                <Button
                                                    as={Link}
                                                    href={expert.xingUrl}
                                                    isExternal
                                                    isIconOnly
                                                    variant="bordered"
                                                    size="sm"
                                                >
                                                    <XingIcon />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content Sections */}
                            <div className="px-6 space-y-6">
                                {/* Open For Carousel */}
                                <Carousel title="Offen für">
                                    {expert.openFor.map((item, index) => (
                                        <OpenForCard key={index} item={item as any} />
                                    ))}
                                </Carousel>

                                {/* About Card */}
                                <Card className="border border-default-200 rounded-xl shadow-none">
                                    <CardHeader className="px-6 pt-6 pb-0">
                                        <h3 className="text-lg font-semibold">Über</h3>
                                    </CardHeader>
                                    <CardBody className="px-6 pb-6 space-y-4">
                                        {expert.aboutUrl && (
                                            <Link href={expert.aboutUrl} isExternal className="text-sm">
                                                {expert.aboutUrl}
                                            </Link>
                                        )}
                                        <div className="flex flex-wrap gap-2">
                                            {expert.tags.map((tag, index) => (
                                                <Chip
                                                    key={index}
                                                    variant="bordered"
                                                    classNames={{
                                                        base: "border-primary",
                                                    }}
                                                >
                                                    {tag}
                                                </Chip>
                                            ))}
                                        </div>
                                    </CardBody>
                                </Card>

                                {/* Activities Carousel */}
                                {expert.activities.length > 0 && (
                                    <Carousel title={`Aktivität (${expert.activities.length})`}>
                                        {expert.activities.map((activity) => (
                                            <ActivityCard key={activity.id} activity={activity} />
                                        ))}
                                    </Carousel>
                                )}

                                {/* Experience Card */}
                                <Card className="border border-default-200 rounded-xl shadow-none">
                                    <CardHeader className="px-6 pt-6 pb-0">
                                        <h3 className="text-lg font-semibold">Erfahrung</h3>
                                    </CardHeader>
                                    <CardBody className="px-6 pb-6">
                                        <Link href={expert.company.url} className="block">
                                            <div className="flex gap-3">
                                                <Avatar
                                                    src={expert.company.logoUrl}
                                                    radius="sm"
                                                    className="w-12 h-12 flex-none"
                                                />
                                                <div className="flex flex-col gap-1">
                          <span className="font-medium">
                            {expert.company.name}
                          </span>
                                                    <span className="text-sm text-default-500">
                            {expert.position}
                          </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </CardBody>
                                </Card>

                                {/* Education Card */}
                                {expert.education.length > 0 && (
                                    <Card className="border border-default-200 rounded-xl shadow-none">
                                        <CardHeader className="px-6 pt-6 pb-0">
                                            <h3 className="text-lg font-semibold">Ausbildung</h3>
                                        </CardHeader>
                                        <CardBody className="px-6 pb-6 space-y-6">
                                            {expert.education.map((edu, index) => (
                                                <div key={index} className="flex gap-3">
                                                    <Avatar
                                                        src={edu.logoUrl}
                                                        radius="sm"
                                                        className="w-12 h-12 flex-none"
                                                    />
                                                    <div className="flex flex-col gap-1 min-w-0">
                            <span className="font-medium truncate">
                              {edu.university}
                            </span>
                                                        <span className="text-sm text-default-500 line-clamp-2">
                              {edu.degree}
                            </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </CardBody>
                                    </Card>
                                )}
                            </div>
                        </div>
                    </ModalBody>
                )}
            </ModalContent>
        </Modal>
    );
}