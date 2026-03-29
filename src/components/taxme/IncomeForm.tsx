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
    Chip,
} from "@heroui/react";
import ProgressModal from "@/components/charts/ProgressModal";

type IncomeFormProps = {
    onContinue?: () => void;
};

const yesNoOptions = [
    { key: "nein", label: "Nein" },
    { key: "ja", label: "Ja" },
];

export default function IncomeForm({ onContinue }: IncomeFormProps) {
    const [formData, setFormData] = useState({
        employerName: "",
        annualGrossSalary: "",
        wageTax: "",
        solidarityTax: "",
        churchTax: "",
        socialSecurityContributions: "",

        hasSideJob: "",
        sideJobEmployer: "",
        sideJobIncome: "",

        hasReplacementIncome: "",
        replacementIncomeType: "",
        replacementIncomeAmount: "",

        hasScholarship: "",
        scholarshipProvider: "",
        scholarshipAmount: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const progress = useMemo(() => {
        const fieldsToCheck = [
            formData.employerName,
            formData.annualGrossSalary,
            formData.wageTax,
            formData.hasSideJob,
            formData.hasReplacementIncome,
            formData.hasScholarship,
        ];

        const completedCount = fieldsToCheck.filter(
            (field) => String(field).trim() !== ""
        ).length;

        return Math.round((completedCount / fieldsToCheck.length) * 100);
    }, [formData]);

    const summaryChips = [
        formData.annualGrossSalary &&
        `Bruttolohn: ${formData.annualGrossSalary} €`,
        formData.hasSideJob && `Nebenjob: ${formData.hasSideJob}`,
        formData.hasReplacementIncome &&
        `Arbeitslosengeld / Leistungen: ${formData.hasReplacementIncome}`,
        formData.hasScholarship && `Stipendium: ${formData.hasScholarship}`,
    ].filter(Boolean) as string[];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            employmentIncome: {
                employerName: formData.employerName,
                annualGrossSalary: formData.annualGrossSalary,
                wageTax: formData.wageTax,
                solidarityTax: formData.solidarityTax,
                churchTax: formData.churchTax,
                socialSecurityContributions: formData.socialSecurityContributions,
            },
            sideJob: {
                hasSideJob: formData.hasSideJob === "ja",
                employerName: formData.sideJobEmployer,
                income: formData.sideJobIncome,
            },
            replacementIncome: {
                hasReplacementIncome: formData.hasReplacementIncome === "ja",
                type: formData.replacementIncomeType,
                amount: formData.replacementIncomeAmount,
            },
            scholarship: {
                hasScholarship: formData.hasScholarship === "ja",
                provider: formData.scholarshipProvider,
                amount: formData.scholarshipAmount,
            },
        };

        console.log("submitted payload", payload);
        onContinue?.();
    };

    return (
        <div>
            <ProgressModal progress={progress} />

            <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 px-4 py-4 duration-700 md:px-8">
                <div className="mx-auto max-w-5xl">
                    <Card className="rounded-3xl border border-default-200 shadow-lg">
                        <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                            <div className="space-y-1">
                                <h1 className="text-3xl font-bold tracking-tight md:text-3xl">
                                    Einkommen angeben
                                </h1>

                                <p className="max-w-3xl text-sm text-default-500">
                                    Trage hier alles ein, was du im Steuerjahr verdient oder
                                    erhalten hast. Dazu zählen insbesondere dein Lohn, mögliche
                                    Einnahmen aus einem Nebenjob sowie Arbeitslosengeld,
                                    Stipendien oder ähnliche Leistungen.
                                </p>
                            </div>
                        </CardHeader>

                        <CardBody className="px-6 pb-8 pt-2 md:px-8">
                            <form name="taxformAlpengrun" className="space-y-8" onSubmit={handleSubmit}>
                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">
                                            1. Lohn / Gehalt
                                        </h2>
                                        <p className="text-sm text-default-500">
                                            Übernimm die Angaben direkt aus deinem Lohnsteuerbescheid
                                            bzw. Lohnausweis.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            label="Arbeitgeber"
                                            placeholder="z. B. Musterfirma GmbH"
                                            variant="bordered"
                                            value={formData.employerName}
                                            onChange={(e) =>
                                                handleInputChange("employerName", e.target.value)
                                            }
                                        />

                                        <Input
                                            type="number"
                                            label="Bruttolohn / Jahreslohn"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={
                                                <span className="text-sm text-default-400">€</span>
                                            }
                                            value={formData.annualGrossSalary}
                                            onChange={(e) =>
                                                handleInputChange("annualGrossSalary", e.target.value)
                                            }
                                        />

                                        <Input
                                            type="number"
                                            label="Einbehaltene Lohnsteuer"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={
                                                <span className="text-sm text-default-400">€</span>
                                            }
                                            value={formData.wageTax}
                                            onChange={(e) =>
                                                handleInputChange("wageTax", e.target.value)
                                            }
                                        />

                                        <Input
                                            type="number"
                                            label="Solidaritätszuschlag"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={
                                                <span className="text-sm text-default-400">€</span>
                                            }
                                            value={formData.solidarityTax}
                                            onChange={(e) =>
                                                handleInputChange("solidarityTax", e.target.value)
                                            }
                                        />

                                        <Input
                                            type="number"
                                            label="Kirchensteuer"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={
                                                <span className="text-sm text-default-400">€</span>
                                            }
                                            value={formData.churchTax}
                                            onChange={(e) =>
                                                handleInputChange("churchTax", e.target.value)
                                            }
                                        />

                                        <Input
                                            type="number"
                                            label="Sozialversicherungsbeiträge"
                                            placeholder="0.00"
                                            variant="bordered"
                                            endContent={
                                                <span className="text-sm text-default-400">€</span>
                                            }
                                            value={formData.socialSecurityContributions}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "socialSecurityContributions",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </section>

                                {summaryChips.length > 0 && (
                                    <div className="rounded-2xl p-4 shadow-md">
                                        <div className="mb-2">
                                            <h3 className="text-sm font-semibold text-default-700">
                                                Übersicht
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
                                )}

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">2. Nebenjob</h2>
                                        <p className="text-sm text-default-500">
                                            Gib hier zusätzliche Einkünfte aus einem Nebenjob an.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Select
                                            label="Hattest du einen Nebenjob?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasSideJob
                                                    ? new Set([formData.hasSideJob])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                const value = Array.from(keys)[0]?.toString() ?? "";
                                                handleInputChange("hasSideJob", value);
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>

                                        {formData.hasSideJob === "ja" && (
                                            <>
                                                <Input
                                                    label="Arbeitgeber Nebenjob"
                                                    placeholder="z. B. Café Sonnenschein"
                                                    variant="bordered"
                                                    value={formData.sideJobEmployer}
                                                    onChange={(e) =>
                                                        handleInputChange("sideJobEmployer", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Einkünfte aus Nebenjob"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">€</span>
                                                    }
                                                    value={formData.sideJobIncome}
                                                    onChange={(e) =>
                                                        handleInputChange("sideJobIncome", e.target.value)
                                                    }
                                                />
                                            </>
                                        )}
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">
                                            3. Arbeitslosengeld / ähnliche Leistungen
                                        </h2>
                                        <p className="text-sm text-default-500">
                                            Trage hier Arbeitslosengeld oder andere erhaltene
                                            Ersatzleistungen ein, falls vorhanden.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Select
                                            label="Hast du solche Leistungen erhalten?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasReplacementIncome
                                                    ? new Set([formData.hasReplacementIncome])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                const value = Array.from(keys)[0]?.toString() ?? "";
                                                handleInputChange("hasReplacementIncome", value);
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>

                                        {formData.hasReplacementIncome === "ja" && (
                                            <>
                                                <Input
                                                    label="Art der Leistung"
                                                    placeholder="z. B. Arbeitslosengeld I"
                                                    variant="bordered"
                                                    value={formData.replacementIncomeType}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "replacementIncomeType",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Betrag"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">€</span>
                                                    }
                                                    value={formData.replacementIncomeAmount}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "replacementIncomeAmount",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </>
                                        )}
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">4. Stipendien</h2>
                                        <p className="text-sm text-default-500">
                                            Falls du ein Stipendium erhalten hast, kannst du die
                                            Angaben hier ergänzen.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Select
                                            label="Hast du ein Stipendium erhalten?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasScholarship
                                                    ? new Set([formData.hasScholarship])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                const value = Array.from(keys)[0]?.toString() ?? "";
                                                handleInputChange("hasScholarship", value);
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>

                                        {formData.hasScholarship === "ja" && (
                                            <>
                                                <Input
                                                    label="Stipendiengeber"
                                                    placeholder="z. B. Deutschlandstipendium"
                                                    variant="bordered"
                                                    value={formData.scholarshipProvider}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "scholarshipProvider",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Betrag"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">€</span>
                                                    }
                                                    value={formData.scholarshipAmount}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "scholarshipAmount",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </>
                                        )}
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