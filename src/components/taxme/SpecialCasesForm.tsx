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
    Home,
    BriefcaseBusiness,
    Globe,
    Info,
} from "lucide-react";
import ProgressModal from "@/components/charts/ProgressModal";

type SpecialCasesFormProps = {
    onContinue?: () => void;
};

const yesNoOptions = [
    { key: "nein", label: "Nein" },
    { key: "ja", label: "Ja" },
];

const propertyUsageOptions = [
    { key: "selbstgenutzt", label: "Selbst genutzt" },
    { key: "vermietet", label: "Vermietet" },
    { key: "gemischt", label: "Gemischt genutzt" },
    { key: "ferienobjekt", label: "Ferienobjekt" },
];

const foreignIncomeTypeOptions = [
    { key: "unselbststaendig", label: "Ausländischer Lohn" },
    { key: "selbststaendig", label: "Ausländiges Einkommen aus Selbständigkeit" },
    { key: "rente", label: "Ausländische Rente / Pension" },
    { key: "kapital", label: "Kapitalerträge im Ausland" },
    { key: "miete", label: "Mieterträge im Ausland" },
    { key: "sonstiges", label: "Sonstiges ausländisches Einkommen" },
];

export default function SpecialCasesForm({
                                             onContinue,
                                         }: SpecialCasesFormProps) {
    const [formData, setFormData] = useState({
        taxYear: "",
        canton: "",
        municipality: "",

        hasHomeOwnership: "",
        hasSelfEmployment: "",
        hasForeignIncome: "",

        propertyAddress: "",
        propertyCanton: "",
        propertyCountry: "Schweiz",
        propertyUsage: "",
        propertyTaxValue: "",
        imputedRentalValue: "",
        mortgageInterest: "",
        maintenanceCosts: "",
        propertyIncome: "",

        businessName: "",
        businessType: "",
        businessActivity: "",
        selfEmploymentRevenue: "",
        selfEmploymentExpenses: "",
        ahvContributions: "",
        businessAssets: "",
        businessDebts: "",

        foreignCountry: "",
        foreignIncomeType: "",
        foreignEmployerOrSource: "",
        foreignGrossIncome: "",
        foreignTaxPaid: "",
        exchangeRateNote: "",
        exemptionMethodNote: "",

        skipConfirmed: false,
        notes: "",
    });

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const parseAmount = (value: string) => {
        const normalized = value.replace(/[^\d.-]/g, "");
        const number = Number(normalized);
        return Number.isFinite(number) ? number : 0;
    };

    const propertyNetEffect = useMemo(() => {
        return (
            parseAmount(formData.imputedRentalValue) +
            parseAmount(formData.propertyIncome) -
            parseAmount(formData.mortgageInterest) -
            parseAmount(formData.maintenanceCosts)
        );
    }, [
        formData.imputedRentalValue,
        formData.propertyIncome,
        formData.mortgageInterest,
        formData.maintenanceCosts,
    ]);

    const selfEmploymentProfit = useMemo(() => {
        return (
            parseAmount(formData.selfEmploymentRevenue) -
            parseAmount(formData.selfEmploymentExpenses) -
            parseAmount(formData.ahvContributions)
        );
    }, [
        formData.selfEmploymentRevenue,
        formData.selfEmploymentExpenses,
        formData.ahvContributions,
    ]);

    const foreignNetIncome = useMemo(() => {
        return (
            parseAmount(formData.foreignGrossIncome) - parseAmount(formData.foreignTaxPaid)
        );
    }, [formData.foreignGrossIncome, formData.foreignTaxPaid]);

    const nothingRelevant =
        formData.hasHomeOwnership === "nein" &&
        formData.hasSelfEmployment === "nein" &&
        formData.hasForeignIncome === "nein";

    const progress = useMemo(() => {
        const fieldsToCheck = [
            formData.taxYear,
            formData.canton,
            formData.municipality,
            formData.hasHomeOwnership,
            formData.hasSelfEmployment,
            formData.hasForeignIncome,
            nothingRelevant ? "skippable" : "",
            formData.hasHomeOwnership === "ja" ? formData.propertyAddress : "ok",
            formData.hasSelfEmployment === "ja" ? formData.businessName : "ok",
            formData.hasForeignIncome === "ja" ? formData.foreignCountry : "ok",
        ];

        const completedCount = fieldsToCheck.filter(
            (field) => String(field).trim() !== ""
        ).length;

        return Math.round((completedCount / fieldsToCheck.length) * 100);
    }, [formData, nothingRelevant]);

    const summaryChips = [
        formData.hasHomeOwnership &&
        `Eigenheim: ${formData.hasHomeOwnership === "ja" ? "Ja" : "Nein"}`,
        formData.hasSelfEmployment &&
        `Selbständigkeit: ${formData.hasSelfEmployment === "ja" ? "Ja" : "Nein"}`,
        formData.hasForeignIncome &&
        `Ausländisches Einkommen: ${formData.hasForeignIncome === "ja" ? "Ja" : "Nein"}`,
        formData.hasHomeOwnership === "ja" &&
        `Liegenschaft netto: CHF ${propertyNetEffect.toLocaleString("de-CH")}`,
        formData.hasSelfEmployment === "ja" &&
        `Selbständigkeit Gewinn: CHF ${selfEmploymentProfit.toLocaleString("de-CH")}`,
        formData.hasForeignIncome === "ja" &&
        `Ausland netto: CHF ${foreignNetIncome.toLocaleString("de-CH")}`,
    ].filter(Boolean) as string[];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            specialCasesDeclaration: {
                taxYear: formData.taxYear,
                canton: formData.canton,
                municipality: formData.municipality,
                hasHomeOwnership: formData.hasHomeOwnership === "ja",
                hasSelfEmployment: formData.hasSelfEmployment === "ja",
                hasForeignIncome: formData.hasForeignIncome === "ja",
                skippedBecauseNotRelevant: nothingRelevant && formData.skipConfirmed,
            },
            homeOwnership:
                formData.hasHomeOwnership === "ja"
                    ? {
                        propertyAddress: formData.propertyAddress,
                        propertyCanton: formData.propertyCanton,
                        propertyCountry: formData.propertyCountry,
                        propertyUsage: formData.propertyUsage,
                        propertyTaxValue: formData.propertyTaxValue,
                        imputedRentalValue: formData.imputedRentalValue,
                        mortgageInterest: formData.mortgageInterest,
                        maintenanceCosts: formData.maintenanceCosts,
                        propertyIncome: formData.propertyIncome,
                        netEffect: propertyNetEffect,
                    }
                    : null,
            selfEmployment:
                formData.hasSelfEmployment === "ja"
                    ? {
                        businessName: formData.businessName,
                        businessType: formData.businessType,
                        businessActivity: formData.businessActivity,
                        selfEmploymentRevenue: formData.selfEmploymentRevenue,
                        selfEmploymentExpenses: formData.selfEmploymentExpenses,
                        ahvContributions: formData.ahvContributions,
                        businessAssets: formData.businessAssets,
                        businessDebts: formData.businessDebts,
                        estimatedProfit: selfEmploymentProfit,
                    }
                    : null,
            foreignIncome:
                formData.hasForeignIncome === "ja"
                    ? {
                        foreignCountry: formData.foreignCountry,
                        foreignIncomeType: formData.foreignIncomeType,
                        foreignEmployerOrSource: formData.foreignEmployerOrSource,
                        foreignGrossIncome: formData.foreignGrossIncome,
                        foreignTaxPaid: formData.foreignTaxPaid,
                        exchangeRateNote: formData.exchangeRateNote,
                        exemptionMethodNote: formData.exemptionMethodNote,
                        netAmount: foreignNetIncome,
                    }
                    : null,
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
                                    Ausnahmen prüfen
                                </h1>

                                <p className="max-w-4xl text-sm text-default-500">
                                    Dieser Teil ist nur relevant, wenn du besondere steuerliche
                                    Situationen hast. In vielen Fällen kannst du ihn direkt
                                    überspringen. Typische Beispiele sind Eigenheim,
                                    selbständige Erwerbstätigkeit oder ausländisches Einkommen.
                                </p>
                            </div>
                        </CardHeader>

                        <CardBody className="px-6 pb-8 pt-2 md:px-8">
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                <section className="space-y-4">
                                    <div className="rounded-3xl border border-warning/30 bg-warning/10 p-5">
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-2xl bg-warning/20 p-2 text-warning-700">
                                                <Info className="h-5 w-5" />
                                            </div>

                                            <div className="space-y-2">
                                                <h2 className="text-md font-semibold">
                                                    Oft nicht relevant
                                                </h2>
                                                <p className="max-w-4xl text-sm text-default-700">
                                                    Diesen Schritt brauchst du nur, wenn du wirklich ein
                                                    Eigenheim, eine selbständige Tätigkeit oder
                                                    ausländisches Einkommen hast. Wenn nichts davon auf
                                                    dich zutrifft, kannst du den Schritt meistens
                                                    überspringen.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">
                                            Relevanz prüfen
                                        </h2>
                                        <p className="text-sm text-default-500">
                                            Wähle aus, welche Spezialfälle bei dir zutreffen.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <Select
                                            label="Hast du ein Eigenheim?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasHomeOwnership
                                                    ? new Set([formData.hasHomeOwnership])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange(
                                                    "hasHomeOwnership",
                                                    Array.from(keys)[0]?.toString() ?? ""
                                                );
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            label="Bist du selbständig?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasSelfEmployment
                                                    ? new Set([formData.hasSelfEmployment])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange(
                                                    "hasSelfEmployment",
                                                    Array.from(keys)[0]?.toString() ?? ""
                                                );
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            label="Hast du ausländisches Einkommen?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasForeignIncome
                                                    ? new Set([formData.hasForeignIncome])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange(
                                                    "hasForeignIncome",
                                                    Array.from(keys)[0]?.toString() ?? ""
                                                );
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {nothingRelevant && (
                                        <div className="rounded-2xl border border-default-200 bg-default-50 p-4">
                                            <div className="space-y-3">
                                                <p className="text-sm text-default-700">
                                                    Bei deinen Angaben scheint dieser Schritt nicht
                                                    relevant zu sein. Du kannst ihn daher in den meisten
                                                    Fällen überspringen.
                                                </p>

                                                <Checkbox
                                                    isSelected={formData.skipConfirmed}
                                                    onValueChange={(value) =>
                                                        handleInputChange("skipConfirmed", value)
                                                    }
                                                >
                                                    Ich bestätige, dass keiner dieser Spezialfälle auf
                                                    mich zutrifft.
                                                </Checkbox>
                                            </div>
                                        </div>
                                    )}
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

                                {formData.hasHomeOwnership === "ja" && (
                                    <>
                                        <Divider />

                                        <section className="space-y-5">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                                    <Home className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h2 className="text-md font-semibold">1. Eigenheim</h2>
                                                    <p className="text-sm text-default-500">
                                                        Erfasse hier Angaben zu selbst genutztem oder
                                                        vermietetem Wohneigentum. Dazu gehören z. B.
                                                        Steuerwert, Eigenmietwert, Hypothekarzinsen und
                                                        Unterhaltskosten.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                                <Input
                                                    label="Adresse der Liegenschaft"
                                                    placeholder="z. B. Musterweg 10, 8000 Zürich"
                                                    variant="bordered"
                                                    value={formData.propertyAddress}
                                                    onChange={(e) =>
                                                        handleInputChange("propertyAddress", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    label="Kanton / Region"
                                                    placeholder="z. B. Zürich"
                                                    variant="bordered"
                                                    value={formData.propertyCanton}
                                                    onChange={(e) =>
                                                        handleInputChange("propertyCanton", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    label="Land"
                                                    placeholder="Schweiz"
                                                    variant="bordered"
                                                    value={formData.propertyCountry}
                                                    onChange={(e) =>
                                                        handleInputChange("propertyCountry", e.target.value)
                                                    }
                                                />

                                                <Select
                                                    label="Nutzung"
                                                    placeholder="Bitte auswählen"
                                                    variant="bordered"
                                                    selectedKeys={
                                                        formData.propertyUsage
                                                            ? new Set([formData.propertyUsage])
                                                            : new Set()
                                                    }
                                                    onSelectionChange={(keys) => {
                                                        if (keys === "all") return;
                                                        handleInputChange(
                                                            "propertyUsage",
                                                            Array.from(keys)[0]?.toString() ?? ""
                                                        );
                                                    }}
                                                >
                                                    {propertyUsageOptions.map((option) => (
                                                        <SelectItem key={option.key}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </Select>

                                                <Input
                                                    type="number"
                                                    label="Steuerwert"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.propertyTaxValue}
                                                    onChange={(e) =>
                                                        handleInputChange("propertyTaxValue", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Eigenmietwert"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.imputedRentalValue}
                                                    onChange={(e) =>
                                                        handleInputChange("imputedRentalValue", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Hypothekarzinsen"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.mortgageInterest}
                                                    onChange={(e) =>
                                                        handleInputChange("mortgageInterest", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Unterhaltskosten"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.maintenanceCosts}
                                                    onChange={(e) =>
                                                        handleInputChange("maintenanceCosts", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Mieterträge / weitere Erträge"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.propertyIncome}
                                                    onChange={(e) =>
                                                        handleInputChange("propertyIncome", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </section>
                                    </>
                                )}

                                {formData.hasSelfEmployment === "ja" && (
                                    <>
                                        <Divider />

                                        <section className="space-y-5">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                                    <BriefcaseBusiness className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h2 className="text-md font-semibold">
                                                        2. Selbständigkeit
                                                    </h2>
                                                    <p className="text-sm text-default-500">
                                                        Trage hier die wichtigsten Eckdaten zu deiner
                                                        selbständigen Tätigkeit ein, insbesondere Umsatz,
                                                        Ausgaben und AHV-relevante Beiträge.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                                <Input
                                                    label="Name des Geschäfts / der Tätigkeit"
                                                    placeholder="z. B. Max Muster Webdesign"
                                                    variant="bordered"
                                                    value={formData.businessName}
                                                    onChange={(e) =>
                                                        handleInputChange("businessName", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    label="Rechtsform / Art"
                                                    placeholder="z. B. Einzelfirma"
                                                    variant="bordered"
                                                    value={formData.businessType}
                                                    onChange={(e) =>
                                                        handleInputChange("businessType", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    label="Tätigkeit"
                                                    placeholder="z. B. Beratung, Design, Handel"
                                                    variant="bordered"
                                                    value={formData.businessActivity}
                                                    onChange={(e) =>
                                                        handleInputChange("businessActivity", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Umsatz / Einnahmen"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.selfEmploymentRevenue}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "selfEmploymentRevenue",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Geschäftsausgaben"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.selfEmploymentExpenses}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "selfEmploymentExpenses",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="AHV / Sozialbeiträge"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.ahvContributions}
                                                    onChange={(e) =>
                                                        handleInputChange("ahvContributions", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Geschäftsvermögen"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.businessAssets}
                                                    onChange={(e) =>
                                                        handleInputChange("businessAssets", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Geschäftsschulden"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">CHF</span>
                                                    }
                                                    value={formData.businessDebts}
                                                    onChange={(e) =>
                                                        handleInputChange("businessDebts", e.target.value)
                                                    }
                                                />
                                            </div>
                                        </section>
                                    </>
                                )}

                                {formData.hasForeignIncome === "ja" && (
                                    <>
                                        <Divider />

                                        <section className="space-y-5">
                                            <div className="flex items-start gap-3">
                                                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                                    <Globe className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h2 className="text-md font-semibold">
                                                        3. Ausländisches Einkommen
                                                    </h2>
                                                    <p className="text-sm text-default-500">
                                                        Erfasse hier Einkommen aus dem Ausland. Dazu gehören
                                                        z. B. ausländischer Lohn, Renten, Kapitalerträge
                                                        oder Erträge aus Immobilien im Ausland.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                                <Input
                                                    label="Land"
                                                    placeholder="z. B. Deutschland"
                                                    variant="bordered"
                                                    value={formData.foreignCountry}
                                                    onChange={(e) =>
                                                        handleInputChange("foreignCountry", e.target.value)
                                                    }
                                                />

                                                <Select
                                                    label="Art des Einkommens"
                                                    placeholder="Bitte auswählen"
                                                    variant="bordered"
                                                    selectedKeys={
                                                        formData.foreignIncomeType
                                                            ? new Set([formData.foreignIncomeType])
                                                            : new Set()
                                                    }
                                                    onSelectionChange={(keys) => {
                                                        if (keys === "all") return;
                                                        handleInputChange(
                                                            "foreignIncomeType",
                                                            Array.from(keys)[0]?.toString() ?? ""
                                                        );
                                                    }}
                                                >
                                                    {foreignIncomeTypeOptions.map((option) => (
                                                        <SelectItem key={option.key}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </Select>

                                                <Input
                                                    label="Arbeitgeber / Quelle"
                                                    placeholder="z. B. Firma / Bank / Behörde"
                                                    variant="bordered"
                                                    value={formData.foreignEmployerOrSource}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "foreignEmployerOrSource",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Bruttoeinkommen"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">
                              Fremdwährung / CHF
                            </span>
                                                    }
                                                    value={formData.foreignGrossIncome}
                                                    onChange={(e) =>
                                                        handleInputChange(
                                                            "foreignGrossIncome",
                                                            e.target.value
                                                        )
                                                    }
                                                />

                                                <Input
                                                    type="number"
                                                    label="Im Ausland bezahlte Steuer"
                                                    placeholder="0.00"
                                                    variant="bordered"
                                                    endContent={
                                                        <span className="text-sm text-default-400">
                              Fremdwährung / CHF
                            </span>
                                                    }
                                                    value={formData.foreignTaxPaid}
                                                    onChange={(e) =>
                                                        handleInputChange("foreignTaxPaid", e.target.value)
                                                    }
                                                />

                                                <Input
                                                    label="Hinweis Wechselkurs"
                                                    placeholder="z. B. Jahresmittelkurs verwendet"
                                                    variant="bordered"
                                                    value={formData.exchangeRateNote}
                                                    onChange={(e) =>
                                                        handleInputChange("exchangeRateNote", e.target.value)
                                                    }
                                                />
                                            </div>

                                            <Textarea
                                                label="Hinweis zur steuerlichen Behandlung"
                                                placeholder="z. B. Freistellung mit Progressionsvorbehalt, Anrechnung ausländischer Quellensteuer oder sonstige Bemerkung"
                                                variant="bordered"
                                                minRows={3}
                                                value={formData.exemptionMethodNote}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "exemptionMethodNote",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </section>
                                    </>
                                )}

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">Bemerkungen</h2>
                                        <p className="text-sm text-default-500">
                                            Optional: Ergänze Spezialfälle, Erläuterungen oder offene
                                            Punkte für die spätere Prüfung.
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
                                            Übersicht über die erfassten Spezialfälle.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Eigenheim netto</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {propertyNetEffect.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">
                                                Selbständigkeit Gewinn
                                            </p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {selfEmploymentProfit.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">
                                                Ausländisches Einkommen netto
                                            </p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {foreignNetIncome.toLocaleString("de-CH")}
                                            </p>
                                        </div>
                                    </div>

                                    {nothingRelevant && (
                                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                                            <p className="text-sm text-default-600">
                                                Für dich scheint dieser Schritt aktuell nicht relevant zu
                                                sein und kann in vielen Fällen übersprungen werden.
                                            </p>
                                        </div>
                                    )}
                                </section>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                                    <Button variant="flat" size="lg" type="button">
                                        Überspringen
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