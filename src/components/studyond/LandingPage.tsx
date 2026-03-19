// app/page.tsx oder components/Dashboard.tsx
"use client";

import React, { useState } from "react";
import {
    Button,
    Avatar,
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Card,
    CardBody,
    Tooltip,
    Divider,
    Link,
} from "@heroui/react";
import {
    Home,
    MessageSquare,
    Folder,
    Files,
    Briefcase,
    Users,
    Network,
    Settings,
    ChevronRight,
    Bell,
    UserPlus,
    Menu,
    Sparkles,
    Search,
    FolderPlus,
    Youtube,
    Bookmark,
    PanelLeft,
    ChevronsUpDown,
    User,
    X,
} from "lucide-react";

// Logo Component
const StudyondLogo = () => (
    <svg viewBox="0 0 288 80" className="h-7 w-auto" preserveAspectRatio="xMinYMid meet">
        <g id="logoIcon" opacity="1" style={{ transform: "translateX(2.5px)" }}>
            <path
                d="M269.67 22.8L287.28 32.96V21.98L277.77 16.49V5.51003L268.26 11V20.36L269.67 22.8Z"
                className="fill-black dark:fill-white stroke-0"
            />
            <path
                d="M268.89 24.14L276.99 28.82V39.8L267.48 34.31L257.97 39.8L248.46 34.31L266.07 24.14H268.89Z"
                className="fill-black dark:fill-white stroke-0"
            />
            <path
                d="M266.7 20.36V0.0300293L257.19 5.52003V16.5L247.68 21.99L257.19 27.48L265.29 22.81L266.7 20.36Z"
                className="fill-black dark:fill-white stroke-0"
            />
        </g>
        <g id="wordmark" opacity="1" className="fill-current">
            <path d="M0.759998 60.72V59.52H7.67V60.56C7.67 63.75 9.91 64.92 13.79 64.92H13.9C16.98 64.92 19.13 64.02 19.13 61.73V60.86C19.13 58.46 17.73 57.9 14.49 57.48L9.82 56.86C4.48 56.22 1.37 53.67 1.37 48.5V47.6C1.37 42.45 6.15 38.99 12.98 38.99H13.06C19.86 38.99 24.81 41.79 24.81 47.94V48.95H17.93V47.94C17.93 45.4 15.69 44.56 12.84 44.56H12.73C9.93 44.56 8.17 45.51 8.17 47.47V48.2C8.17 50.24 9.29 51.16 11.97 51.53L17 52.2C22.43 52.9 25.95 54.77 25.95 60.37V61.29C25.95 67.14 20.92 70.46 13.78 70.46H13.67C5.47 70.46 0.75 66.99 0.75 60.73L0.759998 60.72Z" />
            <path d="M55.12 58.68V39.8H62.03V58.12C62.03 62.87 64.04 64.61 67.62 64.61H67.68C71.26 64.61 73.27 62.88 73.27 58.12V39.8H80.18V69.64H73.27V67.32C72.26 68.97 69.13 70.45 65.97 70.45H65.91C59.37 70.45 55.11 66.62 55.11 58.67L55.12 58.68Z" />
            <path d="M97.34 70.43C90.77 70.43 86.52 66.6 86.52 58.65V50.76C86.52 42.82 90.77 38.98 97.34 38.98H97.4C101.18 38.98 103.69 40.46 104.67 42.11V28.81H111.58V69.64H104.67V67.29C103.69 68.94 101.17 70.42 97.4 70.42H97.34V70.43ZM99.1 64.58C102.65 64.58 104.67 62.87 104.67 58.12V51.3C104.67 46.54 102.66 44.81 99.1 44.81H99.04C95.46 44.81 93.45 46.54 93.45 51.3V58.12C93.45 62.87 95.46 64.58 99.04 64.58H99.1Z" />
            <path d="M114.88 39.8H122.04L127.8 58.82H131.94L137.93 39.8H145.09L132.59 79.43H125.46L130.1 64.75H122.66L114.88 39.8Z" />
            <path d="M147.21 58.54V50.88C147.21 42.88 151.52 38.99 159.71 38.99H159.77C167.97 38.99 172.27 42.88 172.27 50.88V58.54C172.27 66.54 167.96 70.45 159.77 70.45H159.71C151.52 70.45 147.21 66.53 147.21 58.54ZM159.77 64.64C163.35 64.64 165.36 62.88 165.36 58.12V51.3C165.36 46.54 163.35 44.81 159.77 44.81H159.71C156.13 44.81 154.12 46.54 154.12 51.3V58.12C154.12 62.87 156.13 64.64 159.71 64.64H159.77Z" />
            <path d="M179.13 39.8H186.07V42.12C187.05 40.47 190.21 38.99 193.34 38.99H193.4C199.94 38.99 204.19 42.82 204.19 50.77V69.65H197.28V51.33C197.28 46.57 195.27 44.84 191.69 44.84H191.63C188.08 44.84 186.06 46.57 186.06 51.33V69.65H179.12V39.81L179.13 39.8Z" />
            <path d="M221.61 70.43C215.04 70.43 210.79 66.6 210.79 58.65V50.76C210.79 42.82 215.04 38.98 221.61 38.98H221.67C225.45 38.98 227.96 40.46 228.94 42.11V28.81H235.85V69.64H228.94V67.29C227.96 68.94 225.44 70.42 221.67 70.42H221.61V70.43ZM223.38 64.58C226.93 64.58 228.95 62.87 228.95 58.12V51.3C228.95 46.54 226.94 44.81 223.38 44.81H223.32C219.74 44.81 217.73 46.54 217.73 51.3V58.12C217.73 62.87 219.74 64.58 223.32 64.58H223.38Z" />
            <path d="M53.07 45.71V39.81H41.69V32.76H34.75V39.81H29.02V45.71H34.75V63.11C34.75 67.95 36.15 69.65 41.63 69.65H47.2V63.75H44.37C42.28 63.75 41.69 63.39 41.69 61.04V45.71H53.07Z" />
        </g>
    </svg>
);

// Mini Logo Component
const MiniLogo = () => (
    <svg viewBox="247 0 42 42" className="h-5 w-5">
        <path
            d="M269.67 22.8L287.28 32.96V21.98L277.77 16.49V5.51003L268.26 11V20.36L269.67 22.8Z"
            className="fill-black dark:fill-white"
        />
        <path
            d="M268.89 24.14L276.99 28.82V39.8L267.48 34.31L257.97 39.8L248.46 34.31L266.07 24.14H268.89Z"
            className="fill-black dark:fill-white"
        />
        <path
            d="M266.7 20.36V0.0300293L257.19 5.52003V16.5L247.68 21.99L257.19 27.48L265.29 22.81L266.7 20.36Z"
            className="fill-black dark:fill-white"
        />
    </svg>
);

// AI Chat Icon Component
const AiChatIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
            d="M21 9.5V7C21 6.20435 20.6839 5.44129 20.1213 4.87868C19.5587 4.31607 18.7956 4 18 4H6C5.20435 4 4.44129 4.31607 3.87868 4.87868C3.31607 5.44129 3 6.20435 3 7V15C3 15.7956 3.31607 16.5587 3.87868 17.1213C4.44129 17.6839 5.20435 18 6 18H8V21L13 18H14.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M19.5 19C19.7053 18.1513 20.1406 17.3755 20.7581 16.7581C21.3755 16.1406 22.1513 15.7053 23 15.5C22.1513 15.2947 21.3755 14.8594 20.7581 14.2419C20.1406 13.6245 19.7053 12.8487 19.5 12C19.2947 12.8487 18.8594 13.6245 18.2419 14.2419C17.6245 14.8594 16.8487 15.2947 16 15.5C16.8487 15.7053 17.6245 16.1406 18.2419 16.7581C18.8594 17.3755 19.2947 18.1513 19.5 19Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

// Sidebar Menu Item
interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    href?: string;
    isActive?: boolean;
    isCollapsed?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
                                                     icon,
                                                     label,
                                                     href = "#",
                                                     isActive = false,
                                                     isCollapsed = false,
                                                 }) => {
    const content = (
        <div
            className={`flex w-full items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-default-100 ${
                isActive ? "bg-default-100 font-medium" : ""
            } ${isCollapsed ? "justify-center" : ""}`}
        >
            <span className="flex-shrink-0">{icon}</span>
            {!isCollapsed && <span className="truncate">{label}</span>}
        </div>
    );

    if (isCollapsed) {
        return (
            <Tooltip content={label} placement="right">
                <Link href={href} className="block">
                    {content}
                </Link>
            </Tooltip>
        );
    }

    return (
        <Link href={href} className="block">
            {content}
        </Link>
    );
};

// Collapsible Menu Item
interface CollapsibleMenuItemProps {
    icon: React.ReactNode;
    label: string;
    children?: React.ReactNode;
    isCollapsed?: boolean;
}

const CollapsibleMenuItem: React.FC<CollapsibleMenuItemProps> = ({
                                                                     icon,
                                                                     label,
                                                                     children,
                                                                     isCollapsed = false,
                                                                 }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (isCollapsed) {
        return (
            <Tooltip content={label} placement="right">
                <button className="flex w-full items-center justify-center rounded-md p-2 text-sm transition-colors hover:bg-default-100">
                    <span className="flex-shrink-0">{icon}</span>
                </button>
            </Tooltip>
        );
    }

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex w-full items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-default-100"
            >
                <span className="flex-shrink-0">{icon}</span>
                <span className="flex-1 truncate text-left">{label}</span>
                <ChevronRight
                    size={16}
                    className={`transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`}
                />
            </button>
            {isOpen && <div className="ml-6 mt-1 space-y-1">{children}</div>}
        </div>
    );
};

// Action Card Component
interface ActionCardProps {
    icon: React.ReactNode;
    title: React.ReactNode;
    description: string;
    href?: string;
    onClick?: () => void;
}

const ActionCard: React.FC<ActionCardProps> = ({ icon, title, description, href, onClick }) => {
    const cardContent = (
        <Card
            isPressable
            onPress={onClick}
            className="h-full border border-default-200 shadow-none hover:shadow-sm transition-shadow"
        >
            <CardBody className="p-6">
                <div className="flex flex-col h-full">
                    <div className="mb-4">{icon}</div>
                    <h3 className="text-xl font-semibold mb-2 leading-tight">{title}</h3>
                    <p className="text-sm text-default-500">{description}</p>
                </div>
            </CardBody>
        </Card>
    );

    if (href) {
        return (
            <Link href={href} className="block h-full">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

// Empty State Component
const EmptyState: React.FC<{
    icon: React.ReactNode;
    title: string;
    actionLabel?: string;
    onAction?: () => void;
}> = ({ icon, title, actionLabel, onAction }) => (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg border-2 border-dashed border-default-200 p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-default-100">
            {icon}
        </div>
        <p className="text-lg font-medium">{title}</p>
        {actionLabel && (
            <Button color="primary" onPress={onAction}>
                {actionLabel}
            </Button>
        )}
    </div>
);

type LandingPageProps = {
    onStart: () => void;
};

export default function LandingPage({ onStart }: LandingPageProps) {

// Main Dashboard Component
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const userName = "Luca";
    const userEmail = "luca.meier@student.ethz.ch";
    const userFullName = "Luca Meier";

    return (
        <div className="flex min-h-screen w-full bg-white">
            {/* Sidebar */}
            <aside
                className={`hidden md:flex flex-col border-r border-default-200 bg-white transition-all duration-200 relative ${
                    sidebarCollapsed ? "w-16" : "w-64"
                }`}
            >
                {/* Sidebar Header */}
                <div className="flex h-14 bg-white items-center px-4 ">
                    <Link href="/" className="flex items-center">
                        {sidebarCollapsed ? (
                            <div className="w-8 h-8 flex items-center justify-center">
                                <MiniLogo />
                            </div>
                        ) : (
                            <StudyondLogo />
                        )}
                    </Link>
                </div>

                {/* Sidebar Content */}
                <div className="flex-1 overflow-y-auto p-2">
                    {/* Personal Section */}
                    <div className="mb-4">
                        {!sidebarCollapsed && (
                            <p className="px-2 py-2 text-xs font-medium text-default-400">Personal</p>
                        )}
                        <nav className="space-y-1">
                            <SidebarItem
                                icon={<Home size={16} />}
                                label="Home"
                                href="/"
                                isActive
                                isCollapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={<MessageSquare size={16} />}
                                label="Messages"
                                href="/messages"
                                isCollapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={<Folder size={16} />}
                                label="My Projects"
                                href="/user/thesis-projects"
                                isCollapsed={sidebarCollapsed}
                            />
                        </nav>
                    </div>

                    {/* Explore Section */}
                    <div>
                        {!sidebarCollapsed && (
                            <p className="px-2 py-2 text-xs font-medium text-default-400">Erkunden</p>
                        )}
                        <nav className="space-y-1">
                            <SidebarItem
                                icon={<Files size={16} />}
                                label="Topics"
                                href="/topics"
                                isCollapsed={sidebarCollapsed}
                            />
                            <SidebarItem
                                icon={<Briefcase size={16} />}
                                label="Jobs"
                                href="/jobs"
                                isCollapsed={sidebarCollapsed}
                            />
                            <CollapsibleMenuItem
                                icon={<Users size={16} />}
                                label="People"
                                isCollapsed={sidebarCollapsed}
                            >
                                <SidebarItem
                                    icon={<User size={16} />}
                                    label="Experts"
                                    href="/people/experts"
                                    isCollapsed={sidebarCollapsed}
                                />
                                <SidebarItem
                                    icon={<User size={16} />}
                                    label="Students"
                                    href="/people/students"
                                    isCollapsed={sidebarCollapsed}
                                />
                            </CollapsibleMenuItem>
                            <CollapsibleMenuItem
                                icon={<Network size={16} />}
                                label="Organizations"
                                isCollapsed={sidebarCollapsed}
                            >
                                <SidebarItem
                                    icon={<Briefcase size={16} />}
                                    label="Companies"
                                    href="/organizations/companies"
                                    isCollapsed={sidebarCollapsed}
                                />
                                <SidebarItem
                                    icon={<Network size={16} />}
                                    label="Universities"
                                    href="/organizations/universities"
                                    isCollapsed={sidebarCollapsed}
                                />
                            </CollapsibleMenuItem>
                        </nav>
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="border-t border-default-200 p-2">
                    <SidebarItem
                        icon={<Settings size={16} />}
                        label="My Settings"
                        href="/user/settings"
                        isCollapsed={sidebarCollapsed}
                    />

                    {/* User Menu */}
                    <Dropdown placement="top-start">
                        <DropdownTrigger>
                            <button
                                className={`flex w-full items-center gap-2 rounded-md p-2 text-sm transition-colors hover:bg-default-100 ${
                                    sidebarCollapsed ? "justify-center" : ""
                                }`}
                            >
                                <Avatar
                                    size="sm"
                                    showFallback
                                    fallback={<User size={20} className="text-default-500" />}
                                    className="flex-shrink-0"
                                />
                                {!sidebarCollapsed && (
                                    <>
                                        <div className="flex-1 text-left min-w-0">
                                            <p className="font-medium truncate">{userFullName}</p>
                                            <p className="text-xs text-default-500 truncate">{userEmail}</p>
                                        </div>
                                        <ChevronsUpDown size={16} className="text-default-400 flex-shrink-0" />
                                    </>
                                )}
                            </button>
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User menu">
                            <DropdownItem key="profile">Profile</DropdownItem>
                            <DropdownItem key="settings">Settings</DropdownItem>
                            <DropdownItem key="logout" color="danger">
                                Log out
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>

                {/* Collapse Toggle (Desktop) */}
                <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 p-1 rounded-full bg-background border border-default-200 hover:bg-default-100 transition-colors z-10"
                >
                    <PanelLeft
                        size={14}
                        className={`transition-transform duration-200 ${sidebarCollapsed ? "rotate-180" : ""}`}
                    />
                </button>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Header */}
                <header className="sticky top-0 z-40 flex h-14 items-center justify-between  bg-background/80 bg-white px-4">
                    <div className="flex items-center gap-2">
                        {/* Mobile Logo */}
                        <Link href="/" className="md:hidden">
                            <MiniLogo />
                        </Link>

                        {/* Desktop Sidebar Toggle */}
                        <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            className="hidden lg:flex"
                            onPress={() => setSidebarCollapsed(!sidebarCollapsed)}
                        >
                            <PanelLeft size={18} />
                        </Button>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Notifications */}
                        <Tooltip content="Notifications">
                            <Button isIconOnly variant="light" size="sm">
                                <Bell size={18} />
                            </Button>
                        </Tooltip>

                        {/* Invite Button */}
                        <Button variant="bordered" size="sm" startContent={<UserPlus size={16} />}>
                            <span className="hidden sm:inline">Invite</span>
                        </Button>

                        {/* AI Chat Button */}
                        <Tooltip content="AI Assistant">
                            <Button isIconOnly variant="bordered" size="sm">
                                <AiChatIcon size={18} />
                            </Button>
                        </Tooltip>

                        {/* Mobile Menu Button */}
                        <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            className="md:hidden"
                            onPress={() => setMobileMenuOpen(true)}
                        >
                            <Menu size={18} />
                        </Button>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-7xl p-4 md:p-6 lg:p-8">
                        {/* Greeting */}
                        <div className="mb-12">
                            <h1 className="text-3xl md:text-4xl font-bold">Good day, {userName}! 👋️</h1>
                        </div>

                        {/* Action Cards Grid */}
                        <div className="mb-12">
                            <div
                                className="mb-5"
                            >
                                <ActionCard
                                    icon={<Sparkles size={20} className="text-purple-500" />}
                                    title={
                                        <>
                      <span className="bg-gradient-to-r from-purple-500 via-blue-700 to-blue-500 bg-clip-text text-transparent">

                      </span>{" "}Start your thesis here with
                                            {" "}
                                            <span className="bg-gradient-to-r from-purple-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">


                                                AI Support</span><span> for </span>

                                            <span className="bg-gradient-to-r from-purple-600 via-blue-700 to-purple-600 bg-clip-text text-transparent">
                                            {" "} guaranteed success
                      </span>
                                        </>
                                    }
                                    description="Be guided step by step through your thesis and complete it effortlessly."
                                    onClick={onStart}
                                />
                            </div>


                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                                {/* AI Card */}


                                {/* Experts Card */}
                                <ActionCard
                                    icon={<Users size={20} />}
                                    title="Find experts for interviews"
                                    description="Connect with industry experts for interviews and new insights."
                                    href="/people/experts"
                                />

                                {/* Topics Card */}
                                <ActionCard
                                    icon={<Search size={20} />}
                                    title="All relevant topics for you"
                                    description="Find all job postings from your university and our partner companies."                                    href="/topics"
                                />

                                {/* Propose Topic Card */}
                                <ActionCard
                                    icon={<FolderPlus size={20} />}
                                    title="Propose your own topic"
                                    description="Find practice partners who are open to your topic suggestion."                                    onClick={() => console.log("Propose topic clicked")}
                                />

                                {/* Videos Card */}
                                <ActionCard
                                    icon={<Youtube size={20} className="text-red-600" />}
                                    title="Videos: Thesis Writing 101"
                                    description="Tips from our PhD students on writing theses in the social sciences."
                                    onClick={() => console.log("Videos clicked")}
                                />
                            </div>
                        </div>

                        {/* Favorited Topics Section */}
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-medium">My favorite topics</h2>
                            </div>

                            <EmptyState
                                icon={<Bookmark size={24} />}
                                title="No items"
                                actionLabel="Go to topics"
                                onAction={() => (window.location.href = "/topics")}
                            />
                        </div>
                    </div>
                </main>
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <aside
                        className="absolute right-0 top-0 h-full w-72 bg-background shadow-xl animate-in slide-in-from-right duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Mobile Menu Header */}
                        <div className="flex justify-between items-center p-4 border-b border-default-200">
                            <StudyondLogo />
                            <Button
                                isIconOnly
                                variant="light"
                                size="sm"
                                onPress={() => setMobileMenuOpen(false)}
                            >
                                <X size={18} />
                            </Button>
                        </div>

                        {/* Mobile Menu Content */}
                        <div className="p-4 overflow-y-auto h-[calc(100%-60px)]">
                            <nav className="space-y-6">
                                {/* Personal Section */}
                                <div>
                                    <p className="px-2 py-2 text-xs font-medium text-default-400">Persönlich</p>
                                    <div className="space-y-1">
                                        <SidebarItem icon={<Home size={16} />} label="Home" href="/" isActive />
                                        <SidebarItem
                                            icon={<MessageSquare size={16} />}
                                            label="Nachrichten"
                                            href="/messages"
                                        />
                                        <SidebarItem
                                            icon={<Folder size={16} />}
                                            label="Meine Projekte"
                                            href="/user/thesis-projects"
                                        />
                                    </div>
                                </div>

                                {/* Explore Section */}
                                <div>
                                    <p className="px-2 py-2 text-xs font-medium text-default-400">Erkunden</p>
                                    <div className="space-y-1">
                                        <SidebarItem icon={<Files size={16} />} label="Themen" href="/topics" />
                                        <SidebarItem icon={<Briefcase size={16} />} label="Jobs" href="/jobs" />
                                        <CollapsibleMenuItem icon={<Users size={16} />} label="Personen">
                                            <SidebarItem icon={<User size={16} />} label="Experten" href="/people/experts" />
                                            <SidebarItem
                                                icon={<User size={16} />}
                                                label="Studierende"
                                                href="/people/students"
                                            />
                                        </CollapsibleMenuItem>
                                        <CollapsibleMenuItem icon={<Network size={16} />} label="Organisationen">
                                            <SidebarItem
                                                icon={<Briefcase size={16} />}
                                                label="Unternehmen"
                                                href="/organizations/companies"
                                            />
                                            <SidebarItem
                                                icon={<Network size={16} />}
                                                label="Universitäten"
                                                href="/organizations/universities"
                                            />
                                        </CollapsibleMenuItem>
                                    </div>
                                </div>

                                <Divider />

                                {/* Settings */}
                                <SidebarItem
                                    icon={<Settings size={16} />}
                                    label="Meine Einstellungen"
                                    href="/user/settings"
                                />

                                <Divider />

                                {/* User Info */}
                                <div className="flex items-center gap-3 p-2">
                                    <Avatar
                                        size="sm"
                                        showFallback
                                        fallback={<User size={20} className="text-default-500" />}
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{userFullName}</p>
                                        <p className="text-xs text-default-500 truncate">{userEmail}</p>
                                    </div>
                                </div>

                                <Button variant="flat" color="danger" className="w-full">
                                    Abmelden
                                </Button>
                            </nav>
                        </div>
                    </aside>
                </div>
            )}
        </div>
    );
}