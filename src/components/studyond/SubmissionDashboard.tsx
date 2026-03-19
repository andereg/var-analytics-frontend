// components/ThesisDashboard.tsx
"use client";

import {useState, useMemo} from "react";
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
    Edit3, Eye,
    FileText,
    Goal,
    GraduationCap,
    MessageCircle,
    Save,
    Send,
    User,
    Users
} from "lucide-react";
import Chatbot from "@/components/meta/Chatbot";
import DeadlineCountdown from "@/components/studyond/dashboard-components/DeadlineCountdown";
import ThesisSummary from "@/components/studyond/dashboard-components/ThesisSummary";
import ChosenTopic from "@/components/studyond/dashboard-components/ChosenTopic";
import { useTopics } from "@/context/TopicContext";
import { getHydratedTopic, getCompanyById, getSupervisorById } from "@/api/mockData";
import {ResearchBoxesWithDescription} from "@/components/studyond/ResearchBoxes";

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

export default function SubmissionDashboard() {
    const { definiteTopicId, topicSelections } = useTopics();

    // Get mock data for all selected topics and merge with user selections
    const hydratedTopic = useMemo(() => {
        if (!definiteTopicId) return null;
        const base = getHydratedTopic(definiteTopicId);
        if (!base) return null;

        const selection = topicSelections[definiteTopicId];
        if (!selection) return base;

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
    }, [definiteTopicId, topicSelections]);

    const displayTopic = hydratedTopic?.title || "Machine Learning Applications in Healthcare Diagnostics";
    const displaySupervisor = hydratedTopic?.supervisors?.[0]
        ? `${hydratedTopic.supervisors[0].title} ${hydratedTopic.supervisors[0].firstName} ${hydratedTopic.supervisors[0].lastName}`
        : "Dr. Michael Müller";
    const displayCompany = hydratedTopic?.company?.name || "SBB Swiss Railways";
    const displayStudyProgram = "MSc. in Artificial Intelligence";

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
        studyProgram: "MSc. in Artificial Intelligence",
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

        // === REVIEW/FINALIZATION PHASE ===
        {
            id: "17",
            chapter: "Supervisor feedback",
            description: "Submit draft to supervisor and incorporate feedback",
            deadline: "2025-07-14",
            completed: true,
        },
        {
            id: "18",
            chapter: "Proofreading",
            description: "Check grammar, spelling and academic writing style",
            deadline: "2025-07-21",
            completed: true,
        },
        {
            id: "19",
            chapter: "Formatting & references",
            description: "Ensure consistent formatting and verify all citations",
            deadline: "2025-07-28",
            completed: true,
        },
        {
            id: "20",
            chapter: "Final review",
            description: "Complete final read-through and quality check",
            deadline: "2025-08-04",
            completed: false,
        },
        {
            id: "21",
            chapter: "Submission",
            description: "Print, bind and submit thesis to university",
            deadline: "2025-08-11",
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
        <div className="min-h-screen bg-gradient-to-br from-background to-default-100 p-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="max-w-7xl mx-auto space-y-6">

                {/* Interview Banner */}
                <Card className="bg-primary overflow-hidden p-2">
                    <CardBody className="py-6">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <div className="p-4 bg-white/20 rounded-xl">
                                    <Eye className="w-10 h-10 text-white"/>
                                </div>
                                <div>
                                    <div className="flex gap-3 items-center">
                                        <h3 className="text-xl md:text-2xl font-bold text-white">
                                            Conduct a final review
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
                                        Contact your supervisor to conduct a final review of your thesis
                                    </p>
                                </div>
                            </div>
                            <Button
                                size="lg"
                                className="bg-white font-semibold"
                                endContent={<ChevronRight className="w-5 h-5"/>}
                            >
                                Contact
                            </Button>
                        </div>
                    </CardBody>
                </Card>


                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

                    <div className="lg:col-span-2 ">
                        <Chatbot title="Thesis assistant" subtitle=" " initialMessage="Hi! 🎓 You're almost there - the finish line is in sight! How's the final review going? If you need help with proofreading, formatting, citations, or preparing for submission - I've got your back. Any last questions or concerns?"/>
                        <ResearchBoxesWithDescription />
                    </div>


                    {/* Thesis Plan */}
                    <div className="flex flex-col gap-3 lg:col-span-1">
                        <ThesisSummary
                            {...thesisSummary}
                            topic={displayTopic}
                            supervisor={displaySupervisor}
                            company={displayCompany}
                            studyProgram={displayStudyProgram}
                        />
                        <DeadlineCountdown deadline={deadline} title="Submission Deadline"/>
                        <Card className="h-full p-2">
                            <CardHeader className="flex justify-between items-center">
                                <h2 className="text-xl font-semibold">Finalization phase</h2>

                            </CardHeader>
                            <CardBody className="space-y-3">
                                {thesisPlan.map((item, index) => (
                                    <div
                                        key={item.id}
                                        className={`
                    p-4 rounded-xl border-2 transition-all
                    ${item.completed
                                            ? "border-default-100"
                                            : "bg-default-50 border-default-200 hover:border-primary"
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
