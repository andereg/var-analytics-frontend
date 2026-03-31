import React, { useMemo, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Button,
    Divider,
    Chip,
    Checkbox,
    Textarea,
} from "@heroui/react";
import {
    User,
    Wallet,
    PiggyBank,
    Landmark,
    Home,
    FileCheck,
    CheckCircle2,
    AlertTriangle,
} from "lucide-react";
import ProgressModal from "@/components/charts/ProgressModal";
import posthog from 'posthog-js'

type FinalSummaryPageProps = {
    onBack?: () => void;
    onSubmit?: () => void;
};

export default function FinalSummaryPage({
                                             onBack,
                                             onSubmit,
                                         }: FinalSummaryPageProps) {
    const [formData, setFormData] = useState({
        confirmAllReviewed: false,
        confirmInformationTrue: false,
        confirmReadyToSubmit: false,
        finalNotes: "",
    });

    const summaryData = {
        personal: {
            fullName: "Max Mustermann",
            taxYear: "2025",
            canton: "Zürich",
            municipality: "Winterthur",
            maritalStatus: "Ledig",
            profession: "Softwareentwickler",
        },
        income: {
            employmentIncome: 84500,
            sideJobIncome: 4200,
            replacementIncome: 0,
            scholarshipIncome: 0,
            total: 88700,
        },
        wealth: {
            bankAssets: 18500,
            securities: 12400,
            crypto: 2800,
            realEstate: 0,
            otherAssets: 0,
            debts: 3500,
            netWealth: 30200,
        },
        deductions: {
            professionalCosts: 5200,
            healthInsurance: 2400,
            pillar3a: 7056,
            education: 1200,
            debts: 800,
            total: 16656,
        },
        specialCases: {
            hasHomeOwnership: false,
            hasSelfEmployment: false,
            hasForeignIncome: false,
            status: "Nicht relevant / übersprungen",
        },
        documents: {
            documentedAttachments: 6,
            checklistCompleted: 9,
            checklistTotal: 9,
            reviewStatus: "Bereit",
        },
    };

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const estimatedTaxableIncome = useMemo(() => {
        return Math.max(
            0,
            summaryData.income.total - summaryData.deductions.total
        );
    }, [summaryData]);

    const completionProgress = useMemo(() => {
        const checks = [
            formData.confirmAllReviewed,
            formData.confirmInformationTrue,
            formData.confirmReadyToSubmit,
        ].filter(Boolean).length;

        return Math.round((checks / 3) * 100);
    }, [formData]);

    const canSubmit =
        formData.confirmAllReviewed &&
        formData.confirmInformationTrue &&
        formData.confirmReadyToSubmit;

    const summaryChips = [
        `Einkommen: CHF ${summaryData.income.total.toLocaleString("de-CH")}`,
        `Abzüge: CHF ${summaryData.deductions.total.toLocaleString("de-CH")}`,
        `Geschätztes steuerbares Einkommen: CHF ${estimatedTaxableIncome.toLocaleString(
            "de-CH"
        )}`,
        `Nettovermögen: CHF ${summaryData.wealth.netWealth.toLocaleString("de-CH")}`,
        `Belege: ${summaryData.documents.documentedAttachments}`,
        `Kontrollstatus: ${summaryData.documents.reviewStatus}`,
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!canSubmit) return;

        const payload = {
            finalReview: {
                confirmedAllReviewed: formData.confirmAllReviewed,
                confirmedInformationTrue: formData.confirmInformationTrue,
                confirmedReadyToSubmit: formData.confirmReadyToSubmit,
                finalNotes: formData.finalNotes,
            },
            summary: {
                personal: summaryData.personal,
                income: summaryData.income,
                wealth: summaryData.wealth,
                deductions: summaryData.deductions,
                specialCases: summaryData.specialCases,
                documents: summaryData.documents,
                estimatedTaxableIncome,
            },
            submittedAtStep: "abschluss",
        };

        console.log("submitted payload", payload);



        // Submit Matomo Conversion
        (window as any)._paq?.push(['FormAnalytics::trackFormConversion', 'taxformAlpengrun']);

        // Try posthog capture
        posthog.capture('purchase_completed', { amount: 99 })

        onSubmit?.();
    };

    return (
        <div>
            <ProgressModal progress={completionProgress} />

            <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 px-4 py-4 duration-700 md:px-8">
                <div className="mx-auto max-w-6xl">
                    <Card className="rounded-3xl border border-default-200 shadow-lg">
                        <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                            <div className="space-y-2">
                                <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                                    Abschluss · Zusammenfassung & Abgabe
                                </div>

                                <h1 className="text-3xl font-bold tracking-tight">
                                    Steuererklärung abschliessen
                                </h1>

                                <p className="max-w-4xl text-sm text-default-500">
                                    Prüfe hier noch einmal alle Angaben deiner Steuererklärung.
                                    Wenn alles vollständig, korrekt und plausibel ist, kannst du
                                    den Vorgang final abschliessen.
                                </p>
                            </div>
                        </CardHeader>

                        <CardBody className="px-6 pb-8 pt-2 md:px-8">
                            <form name="taxformAlpengrun" className="space-y-8" onSubmit={handleSubmit}>
                                <section className="space-y-4">
                                    <div className="rounded-2xl p-4 shadow-md">
                                        <div className="mb-2">
                                            <h3 className="text-sm font-semibold text-default-700">
                                                Gesamtübersicht
                                            </h3>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {summaryChips.map((chip) => (
                                                <Chip key={chip} variant="bordered" size="sm">
                                                    <div className="mx-1">{chip}</div>
                                                </Chip>
                                            ))}
                                        </div>
                                    </div>
                                </section>

                                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                    <div className="rounded-2xl border border-default-200 p-4">
                                        <p className="text-sm text-default-500">Einkommen total</p>
                                        <p className="mt-1 text-2xl font-semibold">
                                            CHF {summaryData.income.total.toLocaleString("de-CH")}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-default-200 p-4">
                                        <p className="text-sm text-default-500">Abzüge total</p>
                                        <p className="mt-1 text-2xl font-semibold">
                                            CHF {summaryData.deductions.total.toLocaleString("de-CH")}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-default-200 p-4">
                                        <p className="text-sm text-default-500">Nettovermögen</p>
                                        <p className="mt-1 text-2xl font-semibold">
                                            CHF {summaryData.wealth.netWealth.toLocaleString("de-CH")}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                                        <p className="text-sm text-default-500">
                                            Steuerbares Einkommen
                                        </p>
                                        <p className="mt-1 text-2xl font-semibold text-primary">
                                            CHF {estimatedTaxableIncome.toLocaleString("de-CH")}
                                        </p>
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <User className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">
                                                1. Persönliche Daten
                                            </h2>
                                            <p className="text-sm text-default-500">
                                                Übersicht deiner persönlichen Basisangaben.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Name</p>
                                            <p className="mt-1 font-semibold">
                                                {summaryData.personal.fullName}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Steuerjahr</p>
                                            <p className="mt-1 font-semibold">
                                                {summaryData.personal.taxYear}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Zivilstand</p>
                                            <p className="mt-1 font-semibold">
                                                {summaryData.personal.maritalStatus}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Beruf</p>
                                            <p className="mt-1 font-semibold">
                                                {summaryData.personal.profession}
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Wallet className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">2. Einkommen</h2>
                                            <p className="text-sm text-default-500">
                                                Zusammenfassung aller erfassten Einkünfte.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Lohn</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.income.employmentIncome.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Nebenjob</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.income.sideJobIncome.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">
                                                Arbeitslosengeld / Stipendien
                                            </p>
                                            <p className="mt-1 font-semibold">
                                                CHF{" "}
                                                {(
                                                    summaryData.income.replacementIncome +
                                                    summaryData.income.scholarshipIncome
                                                ).toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Total</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.income.total.toLocaleString("de-CH")}
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Landmark className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">3. Vermögen</h2>
                                            <p className="text-sm text-default-500">
                                                Überblick über dein deklariertes Vermögen.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Bankguthaben</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.wealth.bankAssets.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Wertschriften</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.wealth.securities.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Krypto</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.wealth.crypto.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Schulden</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.wealth.debts.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                                            <p className="text-sm text-default-500">Nettovermögen</p>
                                            <p className="mt-1 font-semibold text-primary">
                                                CHF {summaryData.wealth.netWealth.toLocaleString("de-CH")}
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <PiggyBank className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">4. Abzüge</h2>
                                            <p className="text-sm text-default-500">
                                                Übersicht deiner steuerlich relevanten Abzüge.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Berufskosten</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.deductions.professionalCosts.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Krankenkasse</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.deductions.healthInsurance.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Säule 3a</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.deductions.pillar3a.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Weiterbildung</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.deductions.education.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Schulden</p>
                                            <p className="mt-1 font-semibold">
                                                CHF {summaryData.deductions.debts.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                                            <p className="text-sm text-default-500">Total Abzüge</p>
                                            <p className="mt-1 font-semibold text-primary">
                                                CHF {summaryData.deductions.total.toLocaleString("de-CH")}
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Home className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">
                                                5. Spezielle Sachen
                                            </h2>
                                            <p className="text-sm text-default-500">
                                                Spezielle steuerliche Fälle auf einen Blick.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-default-200 p-4">
                                        <p className="text-sm text-default-500">Status</p>
                                        <p className="mt-1 font-semibold">
                                            {summaryData.specialCases.status}
                                        </p>
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
                                                6. Belege & Kontrolle
                                            </h2>
                                            <p className="text-sm text-default-500">
                                                Letzter Status deiner Belege und der Schlussprüfung.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Belege</p>
                                            <p className="mt-1 font-semibold">
                                                {summaryData.documents.documentedAttachments} dokumentiert
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Checkliste</p>
                                            <p className="mt-1 font-semibold">
                                                {summaryData.documents.checklistCompleted}/
                                                {summaryData.documents.checklistTotal} erledigt
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-success/30 bg-success/10 p-4">
                                            <p className="text-sm text-default-500">Freigabestatus</p>
                                            <div className="mt-1 flex items-center gap-2">
                                                <CheckCircle2 className="h-5 w-5 text-success" />
                                                <p className="font-semibold">
                                                    {summaryData.documents.reviewStatus}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-warning/15 p-2 text-warning-700">
                                            <AlertTriangle className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">
                                                Letzte Bestätigung
                                            </h2>
                                            <p className="text-sm text-default-500">
                                                Bestätige vor dem Absenden, dass du alles geprüft hast.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-default-200 p-5">
                                        <div className="grid grid-flow-col grid-rows-3 gap-1">
                                            <Checkbox
                                                isSelected={formData.confirmAllReviewed}
                                                onValueChange={(value) =>
                                                    handleInputChange("confirmAllReviewed", value)
                                                }
                                            >
                                                Ich habe alle Bereiche nochmals geprüft
                                            </Checkbox>

                                            <Checkbox
                                                isSelected={formData.confirmInformationTrue}
                                                onValueChange={(value) =>
                                                    handleInputChange("confirmInformationTrue", value)
                                                }
                                            >
                                                Meine Angaben sind nach bestem Wissen korrekt und vollständig
                                            </Checkbox>

                                            <Checkbox
                                                isSelected={formData.confirmReadyToSubmit}
                                                onValueChange={(value) =>
                                                    handleInputChange("confirmReadyToSubmit", value)
                                                }
                                            >
                                                Ich bin bereit, die Steuererklärung abzusenden
                                            </Checkbox>
                                        </div>
                                    </div>

                                    <Textarea
                                        label="Letzte Bemerkungen"
                                        placeholder="Optional"
                                        variant="bordered"
                                        minRows={4}
                                        value={formData.finalNotes}
                                        onChange={(e) =>
                                            handleInputChange("finalNotes", e.target.value)
                                        }
                                    />
                                </section>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-between">
                                    <Button variant="flat" size="lg" type="button" onPress={onBack}>
                                        Zurück
                                    </Button>

                                    <div className="flex flex-col gap-3 sm:flex-row">
                                        <Button variant="flat" size="lg" type="button">
                                            Entwurf speichern
                                        </Button>
                                        <Button
                                            color="primary"
                                            size="lg"
                                            type="submit"
                                            isDisabled={!canSubmit}
                                        >
                                            Steuererklärung abschicken
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}