import {Avatar, Button, Card, CardHeader, Chip, cn, ScrollShadow, Tooltip} from "@heroui/react";
import {Icon} from "@iconify/react";
import PromptInput from "@/components/meta/PromptInput";
import React from "react";


const promptIdeas = [
    {
        title: "Suggest thesis topics from my transcript",
        description: "focus on my strongest categories",
    },
    {
        title: "Which topic best matches my interests?",
        description: "rank them with reasons",
    },
    {
        title: "Who should I contact first?",
        description: "recommend supervisors and labs",
    },
    {
        title: "Create an action plan for my thesis",
        description: "start from topic selection",
    },
];

const initialMessages = [
    {
        role: "assistant",
        content:
            "Hi — I can help you find suitable bachelor thesis topics based on your transcript, interests, and academic strengths.",
    },
    {
        role: "user",
        content: "I want topics that fit my transcript well and still feel practical.",
    },
    {
        role: "assistant",
        content:
            "Great choice. Based on your profile, I would prioritize HCI, applied AI systems, and learning analytics. The suggested topics on the right are ranked by compatibility.",
    },
];

function ChatMessage({ role, content }: { role: "user" | "assistant"; content: string }) {
    const isAssistant = role === "assistant";

    return (
        <div className={cn("flex w-full gap-3", isAssistant ? "justify-start" : "justify-end")}>
            {isAssistant && (
                <Avatar
                    className="mt-1 shrink-0 bg-foreground text-background"
                    icon={<Icon icon="solar:stars-outline" width={18} />}
                    size="sm"
                />
            )}

            <div
                className={cn(
                    "max-w-[85%] rounded-3xl px-4 py-3 text-sm leading-6 md:max-w-[80%]",
                    isAssistant
                        ? "bg-default-100 text-default-800"
                        : "bg-foreground text-background"
                )}
            >
                {content}
            </div>

            {!isAssistant && (
                <Avatar
                    className="mt-1 shrink-0 bg-primary text-primary-foreground"
                    icon={<Icon icon="solar:user-linear" width={18} />}
                    size="sm"
                />
            )}
        </div>
    );
}


export default function Chatbot() {
    const [prompt, setPrompt] = React.useState<string>("");

    return (
        <Card className="flex min-h-[calc(100vh-2rem)] flex-col rounded-[2rem] border border-default-200 bg-background/90 shadow-xl lg:min-h-[calc(100vh-3rem)]">
            <CardHeader className="flex items-center justify-between gap-4 border-b border-default-100 px-5 py-4 md:px-6">
                <div className="space-y-1">
                    <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-foreground bg-ai">
                            <Icon icon="solar:stars-outline" width={18} />
                        </div>
                        <div>
                            <h1 className="text-base font-semibold md:text-lg">Thesis Topic Assistant</h1>
                            <p className="text-xs text-default-500 md:text-sm">
                                Transcript-aware topic recommendations
                            </p>
                        </div>
                    </div>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                    <Chip variant="flat">Bachelor thesis</Chip>
                    <Chip color="primary" className="text-ai" variant="bordered" >AI-assisted matching</Chip>
                </div>
            </CardHeader>

            <div className="flex-1 overflow-hidden">
                <div className="mx-auto flex h-full w-full max-w-4xl flex-col px-4 py-4 md:px-6 md:py-6">
                    <ScrollShadow className="flex-1 pr-2" hideScrollBar>
                        <div className="flex flex-col gap-6 pb-6">
                            <div className="flex w-full flex-col gap-3">
                                <ScrollShadow hideScrollBar className="flex flex-nowrap gap-2" orientation="horizontal">
                                    <div className="flex gap-2 pb-1">
                                        {promptIdeas.map(({ title, description }, index) => (
                                            <Button
                                                key={index}
                                                className="h-auto min-w-[220px] flex-col items-start gap-0 rounded-2xl px-4 py-3 text-left"
                                                variant="flat"
                                                onPress={() => setPrompt(title)}
                                            >
                                                <p className="w-full truncate text-sm font-medium">{title}</p>
                                                <p className="w-full truncate text-xs text-default-500">{description}</p>
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollShadow>
                            </div>

                            {initialMessages.map((message, index) => (
                                <ChatMessage
                                    key={`${message.role}-${index}`}
                                    content={message.content}
                                    role={message.role as "user" | "assistant"}
                                />
                            ))}
                        </div>
                    </ScrollShadow>

                    <form className="mt-4 rounded-[1.75rem] border border-default-200 bg-default-100/70 transition-colors hover:bg-default-100">
                        <PromptInput
                            classNames={{
                                inputWrapper: "bg-transparent! shadow-none",
                                innerWrapper: "relative",
                                input: "pt-2 pl-2 pb-6 pr-10! text-medium",
                            }}
                            endContent={
                                <div className="flex items-end gap-2">
                                    <Tooltip showArrow content="Send message">
                                        <Button
                                            isIconOnly
                                            color={!prompt ? "default" : "primary"}
                                            isDisabled={!prompt}
                                            radius="lg"
                                            size="sm"
                                            variant="solid"
                                        >
                                            <Icon
                                                className={cn(
                                                    "[&>path]:stroke-[2px]",
                                                    !prompt ? "text-default-600" : "text-primary-foreground"
                                                )}
                                                icon="solar:arrow-up-linear"
                                                width={20}
                                            />
                                        </Button>
                                    </Tooltip>
                                </div>
                            }
                            minRows={3}
                            radius="lg"
                            value={prompt}
                            variant="flat"
                            onValueChange={setPrompt}
                        />

                        <div className="flex w-full items-center justify-between gap-2 overflow-auto px-4 pb-4">
                            <div className="flex w-full gap-1 md:gap-3">
                                <Button
                                    size="sm"
                                    startContent={<Icon className="text-default-500" icon="solar:paperclip-linear" width={18} />}
                                    variant="flat"
                                >
                                    Attach TOR
                                </Button>
                                <Button
                                    size="sm"
                                    startContent={<Icon className="text-default-500" icon="solar:notes-linear" width={18} />}
                                    variant="flat"
                                >
                                    Templates
                                </Button>
                                <Button
                                    size="sm"
                                    startContent={<Icon className="text-default-500" icon="solar:sort-from-top-to-bottom-linear" width={18} />}
                                    variant="flat"
                                >
                                    Analyze profile
                                </Button>
                            </div>
                            <p className="py-1 text-tiny text-default-400">{prompt.length}/2000</p>
                        </div>
                    </form>
                </div>
            </div>
        </Card>

    )
}