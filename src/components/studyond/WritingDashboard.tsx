// components/ThesisDashboard.tsx
"use client";

import {useState} from "react";
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Divider,
    Input,
    Progress,
    Textarea
} from "@heroui/react";
import {
    BookOpen,
    Building2,
    Calendar,
    Check,
    CheckCircle,
    ChevronRight,
    Edit3,
    FileText,
    Goal,
    GraduationCap,
    MessageCircle, PenLine,
    Save,
    Send,
    User,
    Users
} from "lucide-react";
import Chatbot from "@/components/meta/Chatbot";
import DeadlineCountdown from "@/components/studyond/dashboard-components/DeadlineCountdown";
import ThesisSummary from "@/components/studyond/dashboard-components/ThesisSummary";

// Types
interface ThesisPlanItem {
    id: string;
    chapter: string;
    description: string;
    deadline: string;
    completed: boolean;
}

interface ChatMessage {
    id: string;
    sender: "user" | "ai";
    message: string;
    timestamp: Date;
}

// Stepper Steps
const thesisSteps = [
    {key: "topic", label: "Settle topic", icon: Goal},
    {key: "planning", label: "Planning", icon: FileText},
    {key: "writing", label: "Writing", icon: Edit3},
    {key: "submission", label: "Submission", icon: CheckCircle},
];

export default function WritingDashboard() {
    // State
    const [currentStep, setCurrentStep] = useState(1); // 0: Planning, 1: Writing, 2: Submission
    const [thesisTopic, setThesisTopic] = useState(
        "Machine Learning Applications in Healthcare Diagnostics"
    );
    const [isEditingPlan, setIsEditingPlan] = useState(false);
    const [chatInput, setChatInput] = useState("");

    const [deadline, setDeadline] = useState<Date>(new Date("2026-08-15"));

    const [thesisSummary, setThesisSummary] = useState({
        topic: "Machine Learning Applications in Healthcare Diagnostics",
        supervisor: "Dr. Michael Müller",
        company: "SBB Swiss Railways",
        startDate: new Date("2024-10-01"),
        endDate: new Date("2025-08-15"),
        methodology: "Quantitative Research",
        status: "writing" as "planning" | "writing" | "review" | "submitted",
        keywords: [
            "Machine Learning",
            "Healthcare",
            "Medical Diagnostics",
            "Deep Learning",
            "CNN",
            "Image Classification",
            "Patient Data",
        ],
    });

    const [thesisPlan, setThesisPlan] = useState<ThesisPlanItem[]>([
        // ... deine bestehenden Tasks ...

        // === WRITING PHASE ===
        {
            id: "12",
            chapter: "Write introduction",
            description: "Define problem statement, research questions and thesis structure",
            deadline: "2025-05-12",
            completed: true,
        },
        {
            id: "13",
            chapter: "Write theoretical framework",
            description: "Document literature review and theoretical foundations",
            deadline: "2025-05-26",
            completed: true,
        },
        {
            id: "14",
            chapter: "Write methodology",
            description: "Describe research design, data collection and analysis methods",
            deadline: "2025-06-02",
            completed: false,
        },
        {
            id: "15",
            chapter: "Write findings & discussion",
            description: "Present results, interpret findings and relate to literature",
            deadline: "2025-06-23",
            completed: false,
        },
        {
            id: "16",
            chapter: "Write conclusion",
            description: "Summarize key findings, limitations and future research",
            deadline: "2025-06-30",
            completed: false,
        },
    ]);

    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
        {
            id: "1",
            sender: "ai",
            message: "Hi! Ich bin dein Thesis-Assistent. Wie kann ich dir heute helfen?",
            timestamp: new Date(),
        },
    ]);

    // Handlers
    const handleSendMessage = () => {
        if (!chatInput.trim()) return;

        const newMessage: ChatMessage = {
            id: Date.now().toString(),
            sender: "user",
            message: chatInput,
            timestamp: new Date(),
        };

        setChatMessages([...chatMessages, newMessage]);
        setChatInput("");

        // Simulate AI response
        setTimeout(() => {
            const aiResponse: ChatMessage = {
                id: (Date.now() + 1).toString(),
                sender: "ai",
                message: "Das ist eine gute Frage! Lass mich dir dabei helfen...",
                timestamp: new Date(),
            };
            setChatMessages((prev) => [...prev, aiResponse]);
        }, 1000);
    };

    const toggleChapterComplete = (id: string) => {
        setThesisPlan((plan) =>
            plan.map((item) =>
                item.id === id ? {...item, completed: !item.completed} : item
            )
        );
    };

    const completedChapters = thesisPlan.filter((item) => item.completed).length;
    const progressPercentage = (completedChapters / thesisPlan.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-background to-default-100 p-6">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Topic Banner */}
                <Card className="from-primary-500 to-secondary-500">
                    <CardBody className="py-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-white/20 rounded-xl">
                                <BookOpen className="w-8 h-8 "/>
                            </div>
                            <div>
                                <p className=" text-sm font-medium opacity-50">Your chosen topic</p>
                                <h1 className="text-2xl md:text-2xl font-bold">
                                    {thesisTopic}
                                </h1>
                                <div className="flex gap-4 flex-wrap">
                                    <p className="text-sm mt-2 flex gap-2 items-center">
                                        <User className="w-5 h-5 "/>
                                        Dr. Michael Müller</p>
                                    <p className="text-sm mt-2 flex gap-2 items-center">
                                        <Building2 className="w-5 h-5 "/>
                                        SBB Swiss Railways</p>
                                    <p className="text-sm mt-2 flex gap-2 items-center">
                                        <GraduationCap className="w-5 h-5 "/>
                                        MSc. in Artificial Intelligence</p>
                                </div>

                            </div>
                        </div>
                    </CardBody>
                </Card>


                {/* Interview Banner */}
                <Card className="bg-primary overflow-hidden p-2">
                    <CardBody className="py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white/20 rounded-xl">
                                    <PenLine className="w-10 h-10 text-white"/>
                                </div>
                                <div>
                                    <div className="flex gap-3 items-center">
                                        <h3 className="text-xl md:text-2xl font-bold text-white">
                                            Write the methodology chapter
                                        </h3>
                                        <Chip
                                            classNames={{
                                                base: "bg-linear-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",
                                                content: "shadow-black text-white",
                                            }}
                                            variant="shadow"
                                        >
                                            Next step
                                        </Chip>
                                    </div>


                                    <p className="text-white/80">
                                        Learn how to write a good methodology chapter
                                    </p>
                                </div>
                            </div>
                            <Button
                                size="lg"
                                className="bg-white font-semibold"
                                endContent={<ChevronRight className="w-5 h-5"/>}
                            >
                                Read
                            </Button>
                        </div>
                    </CardBody>
                </Card>


                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    <div className="lg:col-span-2 ">
                        <Chatbot title="Thesis assistant" subtitle=" " initialMessage="Hello! ✍️ You've reached the writing phase - great progress! How's the writing coming along? Whether you're struggling with structure, need feedback on a chapter, or want tips on academic writing - I'm here for you. What can I help you with?"/>
                    </div>


                    {/* Thesis Plan */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        <DeadlineCountdown deadline={deadline} title="Submission Deadline" />

                        <Card className="h-full p-2">
                            <CardHeader className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Writing phase</h2>

                            </CardHeader>
                            <CardBody className="space-y-3">
                                {thesisPlan.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`
                    p-4 rounded-xl border-2 transition-all
                    ${item.completed
                                            ? "border-default-100"
                                            : "bg-default-50 border-default-200 hover:border-primary-200"
                                        }
                  `}
                                    >
                                        <div className="flex items-start gap-3">
                                            <button
                                                onClick={() => toggleChapterComplete(item.id)}
                                                className={`
                        mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center
                        transition-all cursor-pointer
                        ${item.completed
                                                    ? "bg-primary border-primary text-white"
                                                    : "border-default-300 hover:border-primary"
                                                }
                      `}
                                            >
                                                {item.completed && <CheckCircle className="w-4 h-4"/>}
                                            </button>

                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                        <span className="font-semibold">
                          {index + 1}. {item.chapter}
                        </span>
                                                </div>

                                                {isEditingPlan ? (
                                                    <Textarea
                                                        size="sm"
                                                        variant="bordered"
                                                        value={item.description}
                                                        className="mt-2"
                                                        onChange={(e) => {
                                                            setThesisPlan((plan) =>
                                                                plan.map((p) =>
                                                                    p.id === item.id
                                                                        ? {...p, description: e.target.value}
                                                                        : p
                                                                )
                                                            );
                                                        }}
                                                    />
                                                ) : (
                                                    <p className="text-sm text-default-500 mt-1">
                                                        {item.description}
                                                    </p>
                                                )}

                                                <div className="flex items-center gap-2 mt-2 text-xs text-default-400">
                                                    <Calendar className="w-3 h-3"/>
                                                    <span>Deadline: {new Date(item.deadline).toLocaleDateString("de-DE")}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </CardBody>
                        </Card>
                    </div>


                </div>
            </div>
        </div>
    );
}