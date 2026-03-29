import React, { useMemo, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Divider,
    Select,
    SelectItem,
    Textarea,
    Chip,
    Checkbox,
} from "@heroui/react";
import {
    FileCheck,
    Paperclip,
    ShieldCheck,
    CircleAlert,
    CheckCircle2,
} from "lucide-react";
import ProgressModal from "@/components/charts/ProgressModal";

type DocumentsReviewFormProps = {
    onContinue?: () => void;
};

type AttachmentItem = {
    id: string;
    category: string;
    name: string;
    note: string;
};

const createId = () => Math.random().toString(36).slice(2, 10);

const yesNoOptions = [
    { key: "nein", label: "Nein" },
    { key: "ja", label: "Ja" },
];

const cantonRequestOptions = [
    { key: "nur_auf_anfrage", label: "Nur auf Anfrage einreichen" },
    { key: "direkt_mitsenden", label: "Direkt mitsenden" },
    { key: "unsicher", label: "Unsicher / noch prüfen" },
];

const documentCategories = [
    { key: "lohnausweis", label: "Lohnausweis" },
    { key: "berufskosten", label: "Berufskosten" },
    { key: "krankenkasse", label: "Krankenkasse" },
    { key: "saeule3a", label: "Säule 3a" },
    { key: "weiterbildung", label: "Weiterbildung" },
    { key: "schulden", label: "Schulden / Schuldzinsen" },
    { key: "vermoegen", label: "Vermögen" },
    { key: "eigenheim", label: "Eigenheim / Liegenschaft" },
    { key: "selbststaendigkeit", label: "Selbständigkeit" },
    { key: "ausland", label: "Ausländisches Einkommen" },
    { key: "sonstiges", label: "Sonstiges" },
];

export default function DocumentsReviewForm({
                                                onContinue,
                                            }: DocumentsReviewFormProps) {
    const [formData, setFormData] = useState({
        taxYear: "",
        canton: "",
        municipality: "",

        receiptsRequired: "",
        submissionMode: "",
        documentationComplete: "",

        receiptRequestNote: "",
        missingDocumentsNote: "",
        reviewNotes: "",

        checkedIncome: false,
        checkedDeductions: false,
        checkedWealth: false,
        checkedSpecialCases: false,
        checkedAttachments: false,
    });

    const [attachments, setAttachments] = useState<AttachmentItem[]>([
        {
            id: createId(),
            category: "",
            name: "",
            note: "",
        },
    ]);

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateAttachment = (
        id: string,
        field: keyof AttachmentItem,
        value: string
    ) => {
        setAttachments((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const addAttachment = () => {
        setAttachments((prev) => [
            ...prev,
            {
                id: createId(),
                category: "",
                name: "",
                note: "",
            },
        ]);
    };

    const removeAttachment = (id: string) => {
        setAttachments((prev) => prev.filter((item) => item.id !== id));
    };

    const validAttachmentCount = useMemo(() => {
        return attachments.filter(
            (item) => item.category.trim() !== "" || item.name.trim() !== ""
        ).length;
    }, [attachments]);

    const checklistCompletedCount = useMemo(() => {
        return [
            formData.checkedIncome,
            formData.checkedDeductions,
            formData.checkedWealth,
            formData.checkedSpecialCases,
            formData.checkedAttachments
        ].filter(Boolean).length;
    }, [formData]);

    const totalChecklistItems = 5;

    const progress = useMemo(() => {
        const fieldsToCheck = [
            formData.taxYear,
            formData.canton,
            formData.municipality,
            formData.receiptsRequired,
            formData.submissionMode,
            formData.documentationComplete
        ];

        const completedCount = fieldsToCheck.filter(
            (field) => String(field).trim() !== ""
        ).length;

        return Math.round((completedCount / fieldsToCheck.length) * 100);
    }, [formData]);

    const summaryChips = [
        formData.receiptsRequired &&
        `Belege nötig: ${formData.receiptsRequired === "ja" ? "Ja" : "Nein"}`,
        formData.submissionMode &&
        `Einreichung: ${
            formData.submissionMode === "nur_auf_anfrage"
                ? "Nur auf Anfrage"
                : formData.submissionMode === "direkt_mitsenden"
                    ? "Direkt mitsenden"
                    : "Noch prüfen"
        }`,
        formData.documentationComplete &&
        `Dokumentation: ${
            formData.documentationComplete === "ja" ? "Vollständig" : "Unvollständig"
        }`,
        `Erfasste Belege: ${validAttachmentCount}`,
        `Checkliste: ${checklistCompletedCount}/${totalChecklistItems}`,
    ].filter(Boolean) as string[];

    const reviewStatus = useMemo(() => {
        if (checklistCompletedCount === totalChecklistItems) {
            return "bereit";
        }

        if (checklistCompletedCount >= 5) {
            return "fast_fertig";
        }

        return "offen";
    }, [checklistCompletedCount]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            documentReview: {
                taxYear: formData.taxYear,
                canton: formData.canton,
                municipality: formData.municipality,
                receiptsRequired: formData.receiptsRequired === "ja",
                submissionMode: formData.submissionMode,
                documentationComplete: formData.documentationComplete === "ja",
                receiptRequestNote: formData.receiptRequestNote,
                missingDocumentsNote: formData.missingDocumentsNote,
            },
            attachments: attachments.filter(
                (item) => item.category.trim() !== "" || item.name.trim() !== ""
            ),
            controlChecklist: {
                checkedIncome: formData.checkedIncome,
                checkedDeductions: formData.checkedDeductions,
                checkedWealth: formData.checkedWealth,
                checkedSpecialCases: formData.checkedSpecialCases,
                checkedAttachments: formData.checkedAttachments
            },
            review: {
                checklistCompletedCount,
                totalChecklistItems,
                reviewStatus,
                reviewNotes: formData.reviewNotes,
            },
        };

        console.log("submitted payload", payload);
        onContinue?.();
    };

    return (
        <div>
            <ProgressModal progress={progress} />

            <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 px-4 py-4 duration-700 md:px-8">
                <div className="mx-auto max-w-6xl">
                    <Card className="rounded-3xl border border-default-200 shadow-lg">
                        <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Belege prüfen / anhängen
                                </h1>

                                <p className="max-w-4xl text-sm text-default-500">
                                    Prüfe hier, ob Belege überhaupt eingereicht werden müssen, ob
                                    alles sauber dokumentiert ist und ob deine Steuererklärung vor
                                    dem Abschicken vollständig und plausibel wirkt.
                                </p>
                            </div>
                        </CardHeader>

                        <CardBody className="px-6 pb-8 pt-2 md:px-8">
                            <form name="taxformAlpengrun" className="space-y-8" onSubmit={handleSubmit}>
                                <section className="space-y-4">
                                    <div className="rounded-3xl border border-warning/30 bg-warning/10 p-5">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-2xl bg-warning/20 p-2 text-warning-700">
                                                <CircleAlert className="h-5 w-5" />
                                            </div>

                                            <div className="space-y-2">
                                                <h2 className="text-md font-semibold">
                                                    Belege oft nur auf Anfrage
                                                </h2>
                                                <p className="max-w-4xl text-sm text-default-700">
                                                    Häufig reicht es, wenn alles sauber
                                                    dokumentiert ist und die Unterlagen bei einer späteren
                                                    Anfrage sofort verfügbar sind.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Paperclip className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">1. Belegstatus</h2>
                                            <p className="text-sm text-default-500">
                                                Kläre hier, ob Belege relevant sind und wie du sie
                                                einreichen oder dokumentieren willst.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <Select
                                            label="Brauchst du Belege?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.receiptsRequired
                                                    ? new Set([formData.receiptsRequired])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange(
                                                    "receiptsRequired",
                                                    Array.from(keys)[0]?.toString() ?? ""
                                                );
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            label="Wie willst du die Belege behandeln?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.submissionMode
                                                    ? new Set([formData.submissionMode])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange(
                                                    "submissionMode",
                                                    Array.from(keys)[0]?.toString() ?? ""
                                                );
                                            }}
                                        >
                                            {cantonRequestOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            label="Alles sauber dokumentiert?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.documentationComplete
                                                    ? new Set([formData.documentationComplete])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange(
                                                    "documentationComplete",
                                                    Array.from(keys)[0]?.toString() ?? ""
                                                );
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Textarea
                                            label="Hinweis zu kantonaler Anfrage / Einreichung"
                                            placeholder="z. B. Belege werden nur auf Nachfrage des Steueramts nachgereicht"
                                            variant="bordered"
                                            minRows={3}
                                            value={formData.receiptRequestNote}
                                            onChange={(e) =>
                                                handleInputChange("receiptRequestNote", e.target.value)
                                            }
                                        />

                                        <Textarea
                                            label="Fehlende oder unklare Unterlagen"
                                            placeholder="z. B. Krankenkassenbestätigung fehlt noch"
                                            variant="bordered"
                                            minRows={3}
                                            value={formData.missingDocumentsNote}
                                            onChange={(e) =>
                                                handleInputChange("missingDocumentsNote", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <FileCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">
                                                2. Belege dokumentieren / anhängen
                                            </h2>
                                            <p className="text-sm text-default-500">
                                                Erfasse alle vorhandenen Belege strukturiert, damit du
                                                sie bei Bedarf schnell einreichen oder prüfen kannst.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {attachments.map((item, index) => (
                                            <div
                                                key={item.id}
                                                className="rounded-2xl border border-default-200 p-4 shadow-sm"
                                            >
                                                <div className="mb-4 flex items-center justify-between">
                                                    <h3 className="text-sm font-semibold">
                                                        Beleg {index + 1}
                                                    </h3>

                                                    {attachments.length > 1 && (
                                                        <Button
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeAttachment(item.id)}
                                                        >
                                                            Entfernen
                                                        </Button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                    <Select
                                                        label="Kategorie"
                                                        placeholder="Bitte auswählen"
                                                        variant="bordered"
                                                        selectedKeys={
                                                            item.category ? new Set([item.category]) : new Set()
                                                        }
                                                        onSelectionChange={(keys) => {
                                                            if (keys === "all") return;
                                                            updateAttachment(
                                                                item.id,
                                                                "category",
                                                                Array.from(keys)[0]?.toString() ?? ""
                                                            );
                                                        }}
                                                    >
                                                        {documentCategories.map((category) => (
                                                            <SelectItem key={category.key}>
                                                                {category.label}
                                                            </SelectItem>
                                                        ))}
                                                    </Select>

                                                    <Input
                                                        label="Dateiname / Bezeichnung"
                                                        placeholder="z. B. lohnausweis_2025.pdf"
                                                        variant="bordered"
                                                        value={item.name}
                                                        onChange={(e) =>
                                                            updateAttachment(item.id, "name", e.target.value)
                                                        }
                                                    />

                                                    <Input
                                                        label="Notiz"
                                                        placeholder="z. B. vollständig / nachreichen / Original vorhanden"
                                                        variant="bordered"
                                                        value={item.note}
                                                        onChange={(e) =>
                                                            updateAttachment(item.id, "note", e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <Button variant="flat" onPress={addAttachment}>
                                            Beleg hinzufügen
                                        </Button>
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <ShieldCheck className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">3. Kontrollieren</h2>
                                            <p className="text-sm text-default-500">
                                                Prüfe vor dem Abschicken noch einmal alles systematisch.
                                            </p>
                                        </div>
                                    </div>

                                        <div className="rounded-2xl border border-default-200 p-5">
                                            <h3 className="mb-4 text-sm font-semibold text-default-700">
                                                Inhalte geprüft
                                            </h3>

                                            <div className="grid grid-cols-1 gap-1">
                                                <Checkbox
                                                    isSelected={formData.checkedIncome}
                                                    onValueChange={(value) =>
                                                        handleInputChange("checkedIncome", value)
                                                    }
                                                >
                                                    Einkommen geprüft
                                                </Checkbox>

                                                <Checkbox
                                                    isSelected={formData.checkedDeductions}
                                                    onValueChange={(value) =>
                                                        handleInputChange("checkedDeductions", value)
                                                    }
                                                >
                                                    Abzüge geprüft
                                                </Checkbox>

                                                <Checkbox
                                                    isSelected={formData.checkedWealth}
                                                    onValueChange={(value) =>
                                                        handleInputChange("checkedWealth", value)
                                                    }
                                                >
                                                    Vermögen geprüft
                                                </Checkbox>

                                                <Checkbox
                                                    isSelected={formData.checkedSpecialCases}
                                                    onValueChange={(value) =>
                                                        handleInputChange("checkedSpecialCases", value)
                                                    }
                                                >
                                                    Spezielle Sachen geprüft
                                                </Checkbox>

                                                <Checkbox
                                                    isSelected={formData.checkedAttachments}
                                                    onValueChange={(value) =>
                                                        handleInputChange("checkedAttachments", value)
                                                    }
                                                >
                                                    Belege / Dokumentation geprüft
                                                </Checkbox>
                                            </div>

                                        </div>


                                    <Textarea
                                        label="Review-Notizen"
                                        placeholder="Optional: letzte Hinweise, offene Punkte oder Erinnerungen"
                                        variant="bordered"
                                        minRows={4}
                                        value={formData.reviewNotes}
                                        onChange={(e) =>
                                            handleInputChange("reviewNotes", e.target.value)
                                        }
                                    />
                                </section>

                                <div className="rounded-2xl p-4 shadow-md">
                                    <div className="mb-2">
                                        <h3 className="text-sm font-semibold text-default-700">
                                            Statusübersicht
                                        </h3>
                                    </div>

                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {summaryChips.map((chip) => (
                                            <Chip key={chip} variant="bordered" size="sm">
                                                <div className="mx-1">{chip}</div>
                                            </Chip>
                                        ))}
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Belegstatus</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                {validAttachmentCount}
                                            </p>
                                            <p className="mt-1 text-xs text-default-500">
                                                dokumentierte Belege
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Checkliste</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                {checklistCompletedCount}/{totalChecklistItems}
                                            </p>
                                            <p className="mt-1 text-xs text-default-500">
                                                Punkte erledigt
                                            </p>
                                        </div>

                                        <div
                                            className={`rounded-2xl border p-4 ${
                                                reviewStatus === "bereit"
                                                    ? "border-success/30 bg-success/10"
                                                    : reviewStatus === "fast_fertig"
                                                        ? "border-warning/30 bg-warning/10"
                                                        : "border-default-200"
                                            }`}
                                        >
                                            <p className="text-sm text-default-500">Freigabestatus</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                {reviewStatus === "bereit" && (
                                                    <CheckCircle2 className="h-5 w-5 text-success" />
                                                )}
                                                <p className="text-2xl font-semibold">
                                                    {reviewStatus === "bereit"
                                                        ? "Bereit"
                                                        : reviewStatus === "fast_fertig"
                                                            ? "Fast fertig"
                                                            : "Offen"}
                                                </p>
                                            </div>
                                            <p className="mt-1 text-xs text-default-500">
                                                letzter Kontrollstatus
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                                    <Button variant="flat" size="lg" type="button">
                                        Entwurf speichern
                                    </Button>
                                    <Button color="primary" size="lg" type="submit">
                                        Abschliessen
                                    </Button>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}