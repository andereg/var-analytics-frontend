import React, { useMemo, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Button,
    Divider,
    Switch,
    Textarea,
    Chip,
} from "@heroui/react";
import { Briefcase, HeartPulse, GraduationCap, Landmark, PiggyBank } from "lucide-react";
import ProgressModal from "@/components/charts/ProgressModal";

type DeductionsFormProps = {
    onContinue?: () => void;
};

const STANDARD_DEDUCTIONS = {
    commutingCosts: "3200",
    otherProfessionalCosts: "2000",
    healthInsurancePremiums: "2400",
    pillar3aContribution: "7056",
    educationCosts: "0",
    debtInterest: "0",
    otherDebtCosts: "0",
};

export default function FinalizationForm({ onContinue }: DeductionsFormProps) {
    const [formData, setFormData] = useState({
        taxYear: "",
        canton: "",
        municipality: "",

        useStandardDeductions: false,

        commutingCosts: "",
        otherProfessionalCosts: "",

        healthInsurancePremiums: "",
        healthCostsNotCovered: "",

        pillar3aContribution: "",

        educationCosts: "",
        educationDescription: "",

        debtInterest: "",
        otherDebtCosts: "",

        notes: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const applyStandardDeductions = (enabled: boolean) => {
        setFormData((prev) => ({
            ...prev,
            useStandardDeductions: enabled,
            ...(enabled
                ? {
                    commutingCosts: STANDARD_DEDUCTIONS.commutingCosts,
                    otherProfessionalCosts: STANDARD_DEDUCTIONS.otherProfessionalCosts,
                    healthInsurancePremiums: STANDARD_DEDUCTIONS.healthInsurancePremiums,
                    pillar3aContribution: STANDARD_DEDUCTIONS.pillar3aContribution,
                    educationCosts: STANDARD_DEDUCTIONS.educationCosts,
                    debtInterest: STANDARD_DEDUCTIONS.debtInterest,
                    otherDebtCosts: STANDARD_DEDUCTIONS.otherDebtCosts,
                }
                : {}),
        }));
    };

    const parseAmount = (value: string) => {
        const normalized = value.replace(/[^\d.-]/g, "");
        const number = Number(normalized);
        return Number.isFinite(number) ? number : 0;
    };

    const professionalCostsTotal = useMemo(() => {
        return (
            parseAmount(formData.commutingCosts) +
            parseAmount(formData.otherProfessionalCosts)
        );
    }, [formData.commutingCosts, formData.otherProfessionalCosts]);

    const healthTotal = useMemo(() => {
        return (
            parseAmount(formData.healthInsurancePremiums) +
            parseAmount(formData.healthCostsNotCovered)
        );
    }, [formData.healthInsurancePremiums, formData.healthCostsNotCovered]);

    const pillar3aTotal = useMemo(() => {
        return parseAmount(formData.pillar3aContribution);
    }, [formData.pillar3aContribution]);

    const educationTotal = useMemo(() => {
        return parseAmount(formData.educationCosts);
    }, [formData.educationCosts]);

    const debtTotal = useMemo(() => {
        return (
            parseAmount(formData.debtInterest) +
            parseAmount(formData.otherDebtCosts)
        );
    }, [formData.debtInterest, formData.otherDebtCosts]);

    const totalDeductions = useMemo(() => {
        return (
            professionalCostsTotal +
            healthTotal +
            pillar3aTotal +
            educationTotal +
            debtTotal
        );
    }, [
        professionalCostsTotal,
        healthTotal,
        pillar3aTotal,
        educationTotal,
        debtTotal,
    ]);

    const progress = useMemo(() => {
        const fieldsToCheck = [
            formData.taxYear,
            formData.canton,
            formData.municipality,
            formData.commutingCosts,
            formData.healthInsurancePremiums,
            formData.pillar3aContribution,
            formData.educationCosts,
            formData.debtInterest,
        ];

        const completedCount = fieldsToCheck.filter(
            (field) => String(field).trim() !== ""
        ).length;

        return Math.round((completedCount / fieldsToCheck.length) * 100);
    }, [formData]);

    const summaryChips = [
        `Berufskosten: CHF ${professionalCostsTotal.toLocaleString("de-CH")}`,
        `Krankenkasse: CHF ${healthTotal.toLocaleString("de-CH")}`,
        `Säule 3a: CHF ${pillar3aTotal.toLocaleString("de-CH")}`,
        `Weiterbildung: CHF ${educationTotal.toLocaleString("de-CH")}`,
        `Schulden: CHF ${debtTotal.toLocaleString("de-CH")}`,
        `Total Abzüge: CHF ${totalDeductions.toLocaleString("de-CH")}`,
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            deductionDeclaration: {
                taxYear: formData.taxYear,
                canton: formData.canton,
                municipality: formData.municipality,
                useStandardDeductions: formData.useStandardDeductions,
            },
            deductions: {
                professionalCosts: {
                    commutingCosts: formData.commutingCosts,
                    otherProfessionalCosts: formData.otherProfessionalCosts,
                    total: professionalCostsTotal,
                },
                health: {
                    healthInsurancePremiums: formData.healthInsurancePremiums,
                    healthCostsNotCovered: formData.healthCostsNotCovered,
                    total: healthTotal,
                },
                pillar3a: {
                    contribution: formData.pillar3aContribution,
                    total: pillar3aTotal,
                },
                education: {
                    costs: formData.educationCosts,
                    description: formData.educationDescription,
                    total: educationTotal,
                },
                debts: {
                    debtInterest: formData.debtInterest,
                    otherDebtCosts: formData.otherDebtCosts,
                    total: debtTotal,
                },
            },
            totals: {
                totalDeductions,
            },
            notes: formData.notes,
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
                                    Abzüge erfassen
                                </h1>

                                <p className="max-w-4xl text-sm text-default-500">
                                    Hier kommt der wichtigste Optimierungsteil deiner Steuererklärung.
                                    Erfasse alle relevanten Abzüge, damit dein steuerbares Einkommen
                                    möglichst korrekt und günstig berechnet werden kann.
                                </p>
                            </div>
                        </CardHeader>

                        <CardBody className="px-6 pb-8 pt-2 md:px-8">
                            <form name="taxformAlpengrun" className="space-y-8" onSubmit={handleSubmit}>
                                <section className="space-y-4">
                                    <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                            <div className="space-y-1">
                                                <h2 className="text-md font-semibold">Standardabzüge verwenden</h2>
                                                <p className="max-w-3xl text-sm text-default-600">
                                                    Aktiviere diese Option, um typische feste Standardwerte
                                                    vorzubelegen. Danach kannst du alle Beträge weiterhin manuell
                                                    anpassen.
                                                </p>
                                            </div>

                                            <Switch
                                                isSelected={formData.useStandardDeductions}
                                                onValueChange={applyStandardDeductions}
                                            >
                                                Standardabzüge
                                            </Switch>
                                        </div>

                                        {formData.useStandardDeductions && (
                                            <div className="mt-4 flex flex-wrap gap-2">
                                                <Chip variant="flat" color="primary">
                                                    Arbeitsweg: CHF {STANDARD_DEDUCTIONS.commutingCosts}
                                                </Chip>
                                                <Chip variant="flat" color="primary">
                                                    Berufskosten: CHF {STANDARD_DEDUCTIONS.otherProfessionalCosts}
                                                </Chip>
                                                <Chip variant="flat" color="primary">
                                                    Krankenkasse: CHF {STANDARD_DEDUCTIONS.healthInsurancePremiums}
                                                </Chip>
                                                <Chip variant="flat" color="primary">
                                                    Säule 3a: CHF {STANDARD_DEDUCTIONS.pillar3aContribution}
                                                </Chip>
                                            </div>
                                        )}
                                    </div>
                                </section>

                                <div className="rounded-2xl p-4 shadow-md">
                                    <div className="mb-2">
                                        <h3 className="text-sm font-semibold text-default-700">
                                            Optimierungsübersicht
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

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Briefcase className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">1. Berufskosten</h2>
                                            <p className="text-sm text-default-500">
                                                Trage hier Kosten ein, die durch deine berufliche Tätigkeit
                                                entstanden sind, z. B. Arbeitsweg oder weitere berufsbezogene Ausgaben.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            type="number"
                                            label="Arbeitsweg / Pendelkosten"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                            value={formData.commutingCosts}
                                            onChange={(e) =>
                                                handleInputChange("commutingCosts", e.target.value)
                                            }
                                        />

                                        <Input
                                            type="number"
                                            label="Weitere Berufskosten"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                            value={formData.otherProfessionalCosts}
                                            onChange={(e) =>
                                                handleInputChange("otherProfessionalCosts", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <HeartPulse className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">2. Krankenkasse</h2>
                                            <p className="text-sm text-default-500">
                                                Erfasse Prämien oder weitere selbst getragene Gesundheitskosten,
                                                soweit sie steuerlich relevant sind.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            type="number"
                                            label="Krankenkassenprämien"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                            value={formData.healthInsurancePremiums}
                                            onChange={(e) =>
                                                handleInputChange("healthInsurancePremiums", e.target.value)
                                            }
                                        />

                                        <Input
                                            type="number"
                                            label="Nicht gedeckte Gesundheitskosten"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                            value={formData.healthCostsNotCovered}
                                            onChange={(e) =>
                                                handleInputChange("healthCostsNotCovered", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <PiggyBank className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">3. Säule 3a</h2>
                                            <p className="text-sm text-default-500">
                                                Trage hier deine einbezahlten Beiträge in die gebundene Vorsorge ein.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            type="number"
                                            label="Einzahlungen Säule 3a"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                            value={formData.pillar3aContribution}
                                            onChange={(e) =>
                                                handleInputChange("pillar3aContribution", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <GraduationCap className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">4. Weiterbildung</h2>
                                            <p className="text-sm text-default-500">
                                                Hier kannst du steuerlich relevante Ausgaben für Kurse,
                                                Schulungen, Seminare oder berufliche Weiterbildung angeben.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            type="number"
                                            label="Weiterbildungskosten"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                            value={formData.educationCosts}
                                            onChange={(e) =>
                                                handleInputChange("educationCosts", e.target.value)
                                            }
                                        />

                                        <Input
                                            label="Beschreibung"
                                            placeholder="z. B. CAS, Seminar, Fachkurs"
                                            variant="bordered"
                                            value={formData.educationDescription}
                                            onChange={(e) =>
                                                handleInputChange("educationDescription", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Landmark className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">5. Schulden</h2>
                                            <p className="text-sm text-default-500">
                                                Erfasse hier Schuldzinsen und weitere abzugsfähige Kosten
                                                im Zusammenhang mit bestehenden Schulden.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            type="number"
                                            label="Schuldzinsen"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                            value={formData.debtInterest}
                                            onChange={(e) =>
                                                handleInputChange("debtInterest", e.target.value)
                                            }
                                        />

                                        <Input
                                            type="number"
                                            label="Weitere schuldenbezogene Kosten"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                            value={formData.otherDebtCosts}
                                            onChange={(e) =>
                                                handleInputChange("otherDebtCosts", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">Bemerkungen</h2>
                                        <p className="text-sm text-default-500">
                                            Optional: Ergänze Hinweise zu Sonderfällen oder nicht eindeutig
                                            zuordenbaren Abzügen.
                                        </p>
                                    </div>

                                    <Textarea
                                        label="Zusätzliche Bemerkungen"
                                        placeholder="Optional"
                                        variant="bordered"
                                        minRows={4}
                                        value={formData.notes}
                                        onChange={(e) => handleInputChange("notes", e.target.value)}
                                    />
                                </section>

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">Zusammenfassung</h2>
                                        <p className="text-sm text-default-500">
                                            Automatisch berechnete Übersicht deiner gesamten Abzüge.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Berufskosten</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {professionalCostsTotal.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Krankenkasse</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {healthTotal.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Säule 3a</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {pillar3aTotal.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Weiterbildung</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {educationTotal.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Schulden</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {debtTotal.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                                            <p className="text-sm text-default-500">Total Abzüge</p>
                                            <p className="mt-1 text-2xl font-semibold text-primary">
                                                CHF {totalDeductions.toLocaleString("de-CH")}
                                            </p>
                                        </div>
                                    </div>
                                </section>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                                    <Button variant="flat" size="lg" type="button">
                                        Entwurf speichern
                                    </Button>
                                    <Button color="primary" size="lg" type="submit">
                                        Weiter
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