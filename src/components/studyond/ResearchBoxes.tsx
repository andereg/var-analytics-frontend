import { Card, CardBody } from "@heroui/react";
import { FileText, Bookmark, FolderOpen, Lightbulb, BookOpen, Link2, Quote, ClipboardList } from "lucide-react";

// Option 1: Mit Liste von Items
export function ResearchBoxesWithItems() {
    return (
        <div className="flex gap-4 w-full">
            <Card className="flex-1 min-h-[140px] bg-default-50/30 border border-default-100 shadow-none">
                <CardBody className="flex flex-col gap-4 p-5">
                    <div className="flex items-center gap-3">
                        <FolderOpen className="w-5 h-5 text-default-400" />
                        <span className="text-default-600 font-medium">Sources</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-default-400 text-sm">
                            <Link2 className="w-3.5 h-3.5" />
                            <span>Web articles</span>
                        </div>
                        <div className="flex items-center gap-2 text-default-400 text-sm">
                            <FileText className="w-3.5 h-3.5" />
                            <span>Documents</span>
                        </div>
                        <div className="flex items-center gap-2 text-default-400 text-sm">
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Publications</span>
                        </div>
                    </div>
                </CardBody>
            </Card>

            <Card className="flex-1 min-h-[140px] bg-default-50/30 border border-default-100 shadow-none">
                <CardBody className="flex flex-col gap-4 p-5">
                    <div className="flex items-center gap-3">
                        <Lightbulb className="w-5 h-5 text-default-400" />
                        <span className="text-default-600 font-medium">Notes</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-default-400 text-sm">
                            <Quote className="w-3.5 h-3.5" />
                            <span>Key quotes</span>
                        </div>
                        <div className="flex items-center gap-2 text-default-400 text-sm">
                            <ClipboardList className="w-3.5 h-3.5" />
                            <span>Summaries</span>
                        </div>
                        <div className="flex items-center gap-2 text-default-400 text-sm">
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Bookmarks</span>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

// Option 2: Mit Beschreibungstext
export function ResearchBoxesWithDescription() {
    return (
        <div className="flex gap-4 w-full">
            <Card className="flex-1 min-h-[240px] bg-default-50 mt-3 border border-default-100 shadow-none">
                <CardBody className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-default-100/60">
                            <FolderOpen className="w-5 h-5 text-default-400" />
                        </div>
                        <span className="text-default-600 font-medium">Resources</span>
                    </div>
                    <p className="text-default-400 text-sm leading-relaxed">
                        Collect and organize your research materials, references, and external sources in one place.
                    </p>
                    <div className="flex gap-2 mt-auto">
                        <span className="text-xs text-default-500 bg-default-100 px-2 py-1 rounded">Articles</span>
                        <span className="text-xs text-default-500 bg-default-100 px-2 py-1 rounded">PDFs</span>
                        <span className="text-xs text-default-500 bg-default-100 px-2 py-1 rounded">Links</span>
                    </div>
                </CardBody>
            </Card>

            <Card className="flex-1 min-h-[240px] bg-default-50 mt-3 border border-default-100 shadow-none">
                <CardBody className="flex flex-col gap-3 p-5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-default-100/60">
                            <Lightbulb className="w-5 h-5 text-default-400" />
                        </div>
                        <span className="text-default-600 font-medium">Ideas</span>
                    </div>
                    <p className="text-default-400 text-sm leading-relaxed">
                        Capture initial thoughts, hypotheses, and key insights as you explore your research topic.
                    </p>
                    <div className="flex gap-2 mt-auto">
                        <span className="text-xs text-default-500 bg-default-100 px-2 py-1 rounded">Notes</span>
                        <span className="text-xs text-default-500 bg-default-100 px-2 py-1 rounded">Drafts</span>
                        <span className="text-xs text-default-500 bg-default-100 px-2 py-1 rounded">Outlines</span>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

// Option 3: Minimaler mit Placeholder-Text
export function ResearchBoxesMinimalContent() {
    return (
        <div className="flex gap-4 w-full">
            <div className="flex-1 min-h-[120px] flex flex-col gap-3 p-5 rounded-xl border border-dashed border-default-200 bg-default-50/20">
                <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-default-300" />
                    <span className="text-default-500 text-sm font-medium">Literature</span>
                </div>
                <p className="text-default-300 text-xs leading-relaxed">
                    Academic papers, books, and scholarly articles related to your research.
                </p>
            </div>

            <div className="flex-1 min-h-[120px] flex flex-col gap-3 p-5 rounded-xl border border-dashed border-default-200 bg-default-50/20">
                <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-default-300" />
                    <span className="text-default-500 text-sm font-medium">Outline</span>
                </div>
                <p className="text-default-300 text-xs leading-relaxed">
                    Structure and organize your main arguments and supporting points.
                </p>
            </div>
        </div>
    );
}