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
} from "@heroui/react";
import { Plus, Trash2, Landmark, Building2, Car, Coins, Wallet } from "lucide-react";
import ProgressModal from "@/components/charts/ProgressModal";

type WealthFormProps = {
    onContinue?: () => void;
};

type BankAccount = {
    id: string;
    bankName: string;
    accountType: string;
    iban: string;
    balance: string;
};

type SecurityPosition = {
    id: string;
    designation: string;
    isin: string;
    quantity: string;
    taxValue: string;
    grossYield: string;
};

type CryptoPosition = {
    id: string;
    coin: string;
    quantity: string;
    taxValue: string;
};

type VehicleAsset = {
    id: string;
    type: string;
    brandModel: string;
    year: string;
    marketValue: string;
};

type RealEstate = {
    id: string;
    type: string;
    country: string;
    cantonOrRegion: string;
    municipality: string;
    taxValue: string;
    rentalValue: string;
    ownershipShare: string;
};

type InsuranceAsset = {
    id: string;
    provider: string;
    type: string;
    surrenderValue: string;
};

type OtherAsset = {
    id: string;
    description: string;
    taxValue: string;
};

type DebtItem = {
    id: string;
    creditor: string;
    type: string;
    amount: string;
    yearlyInterest: string;
};

const yesNoOptions = [
    { key: "nein", label: "Nein" },
    { key: "ja", label: "Ja" },
];

const accountTypes = [
    { key: "privatkonto", label: "Privatkonto" },
    { key: "sparkonto", label: "Sparkonto" },
    { key: "gemeinschaftskonto", label: "Gemeinschaftskonto" },
    { key: "fremdwaehrungskonto", label: "Fremdwährungskonto" },
    { key: "bar", label: "Bargeld" },
    { key: "sonstiges", label: "Sonstiges" },
];

const securityTypes = [
    { key: "aktien", label: "Aktien" },
    { key: "etf", label: "ETF" },
    { key: "fonds", label: "Fonds" },
    { key: "obligationen", label: "Obligationen" },
    { key: "beteiligungen", label: "Beteiligungen" },
    { key: "sonstige", label: "Sonstige Wertschriften" },
];

const realEstateTypes = [
    { key: "einfamilienhaus", label: "Einfamilienhaus" },
    { key: "eigentumswohnung", label: "Eigentumswohnung" },
    { key: "mehrfamilienhaus", label: "Mehrfamilienhaus" },
    { key: "ferienwohnung", label: "Ferienwohnung" },
    { key: "bauland", label: "Bauland" },
    { key: "landwirtschaft", label: "Landwirtschaftliche Liegenschaft" },
    { key: "sonstiges", label: "Sonstige Liegenschaft" },
];

const debtTypes = [
    { key: "hypothek", label: "Hypothek" },
    { key: "privatdarlehen", label: "Privatdarlehen" },
    { key: "kreditkarte", label: "Kreditkartenschuld" },
    { key: "konsumkredit", label: "Konsumkredit" },
    { key: "steuerforderung", label: "Steuerschuld" },
    { key: "sonstiges", label: "Sonstige Schuld" },
];

const createId = () => Math.random().toString(36).slice(2, 10);

export default function WealthForm({ onContinue }: WealthFormProps) {
    const [formData, setFormData] = useState({
        taxYear: "",
        canton: "",
        municipality: "",
        valuationDate: "31.12.",
        hasBankAccounts: "ja",
        hasSecurities: "",
        hasCrypto: "",
        hasVehicles: "",
        hasRealEstate: "",
        hasInsuranceAssets: "",
        hasOtherAssets: "",
        hasDebts: "",
        notes: "",
    });

    const [bankAccounts, setBankAccounts] = useState<BankAccount[]>([
        {
            id: createId(),
            bankName: "",
            accountType: "",
            iban: "",
            balance: "",
        },
    ]);

    const [securities, setSecurities] = useState<SecurityPosition[]>([]);
    const [cryptoAssets, setCryptoAssets] = useState<CryptoPosition[]>([]);
    const [vehicles, setVehicles] = useState<VehicleAsset[]>([]);
    const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
    const [insuranceAssets, setInsuranceAssets] = useState<InsuranceAsset[]>([]);
    const [otherAssets, setOtherAssets] = useState<OtherAsset[]>([]);
    const [debts, setDebts] = useState<DebtItem[]>([]);

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const updateArrayItem = <T extends { id: string }>(
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        id: string,
        field: keyof T,
        value: string
    ) => {
        setter((prev) =>
            prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
        );
    };

    const addBankAccount = () => {
        setBankAccounts((prev) => [
            ...prev,
            { id: createId(), bankName: "", accountType: "", iban: "", balance: "" },
        ]);
    };

    const addSecurity = () => {
        setSecurities((prev) => [
            ...prev,
            {
                id: createId(),
                designation: "",
                isin: "",
                quantity: "",
                taxValue: "",
                grossYield: "",
            },
        ]);
    };

    const addCrypto = () => {
        setCryptoAssets((prev) => [
            ...prev,
            { id: createId(), coin: "", quantity: "", taxValue: "" },
        ]);
    };

    const addVehicle = () => {
        setVehicles((prev) => [
            ...prev,
            { id: createId(), type: "", brandModel: "", year: "", marketValue: "" },
        ]);
    };

    const addRealEstate = () => {
        setRealEstates((prev) => [
            ...prev,
            {
                id: createId(),
                type: "",
                country: "Schweiz",
                cantonOrRegion: "",
                municipality: "",
                taxValue: "",
                rentalValue: "",
                ownershipShare: "",
            },
        ]);
    };

    const addInsuranceAsset = () => {
        setInsuranceAssets((prev) => [
            ...prev,
            { id: createId(), provider: "", type: "", surrenderValue: "" },
        ]);
    };

    const addOtherAsset = () => {
        setOtherAssets((prev) => [
            ...prev,
            { id: createId(), description: "", taxValue: "" },
        ]);
    };

    const addDebt = () => {
        setDebts((prev) => [
            ...prev,
            { id: createId(), creditor: "", type: "", amount: "", yearlyInterest: "" },
        ]);
    };

    const removeItem = <T extends { id: string }>(
        setter: React.Dispatch<React.SetStateAction<T[]>>,
        id: string
    ) => {
        setter((prev) => prev.filter((item) => item.id !== id));
    };

    const parseAmount = (value: string) => {
        const normalized = value.replace(/[^\d.-]/g, "");
        const number = Number(normalized);
        return Number.isFinite(number) ? number : 0;
    };

    const totalBankAssets = useMemo(
        () => bankAccounts.reduce((sum, item) => sum + parseAmount(item.balance), 0),
        [bankAccounts]
    );

    const totalSecurities = useMemo(
        () => securities.reduce((sum, item) => sum + parseAmount(item.taxValue), 0),
        [securities]
    );

    const totalCrypto = useMemo(
        () => cryptoAssets.reduce((sum, item) => sum + parseAmount(item.taxValue), 0),
        [cryptoAssets]
    );

    const totalVehicles = useMemo(
        () => vehicles.reduce((sum, item) => sum + parseAmount(item.marketValue), 0),
        [vehicles]
    );

    const totalRealEstate = useMemo(
        () => realEstates.reduce((sum, item) => sum + parseAmount(item.taxValue), 0),
        [realEstates]
    );

    const totalInsuranceAssets = useMemo(
        () => insuranceAssets.reduce((sum, item) => sum + parseAmount(item.surrenderValue), 0),
        [insuranceAssets]
    );

    const totalOtherAssets = useMemo(
        () => otherAssets.reduce((sum, item) => sum + parseAmount(item.taxValue), 0),
        [otherAssets]
    );

    const totalDebts = useMemo(
        () => debts.reduce((sum, item) => sum + parseAmount(item.amount), 0),
        [debts]
    );

    const totalDebtInterest = useMemo(
        () => debts.reduce((sum, item) => sum + parseAmount(item.yearlyInterest), 0),
        [debts]
    );

    const grossWealth =
        totalBankAssets +
        totalSecurities +
        totalCrypto +
        totalVehicles +
        totalRealEstate +
        totalInsuranceAssets +
        totalOtherAssets;

    const netWealth = grossWealth - totalDebts;

    const progress = useMemo(() => {
        const fieldsToCheck = [
            formData.taxYear,
            formData.canton,
            formData.municipality,
            formData.valuationDate,
            bankAccounts.some((item) => item.bankName || item.balance) ? "x" : "",
            formData.hasSecurities,
            formData.hasCrypto,
            formData.hasVehicles,
            formData.hasRealEstate,
            formData.hasInsuranceAssets,
            formData.hasOtherAssets,
            formData.hasDebts,
        ];

        const completedCount = fieldsToCheck.filter((field) => String(field).trim() !== "").length;
        return Math.round((completedCount / fieldsToCheck.length) * 100);
    }, [formData, bankAccounts]);

    const summaryChips = [
        `Bankguthaben: CHF ${totalBankAssets.toLocaleString("de-CH")}`,
        `Wertschriften: CHF ${totalSecurities.toLocaleString("de-CH")}`,
        `Krypto: CHF ${totalCrypto.toLocaleString("de-CH")}`,
        `Liegenschaften: CHF ${totalRealEstate.toLocaleString("de-CH")}`,
        `Schulden: CHF ${totalDebts.toLocaleString("de-CH")}`,
        `Nettovermögen: CHF ${netWealth.toLocaleString("de-CH")}`,
    ];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            wealthDeclaration: {
                taxYear: formData.taxYear,
                canton: formData.canton,
                municipality: formData.municipality,
                valuationDate: formData.valuationDate,
            },
            liquidAssets: bankAccounts,
            securities,
            cryptoAssets,
            vehicles,
            realEstates,
            insuranceAssets,
            otherAssets,
            debts,
            totals: {
                totalBankAssets,
                totalSecurities,
                totalCrypto,
                totalVehicles,
                totalRealEstate,
                totalInsuranceAssets,
                totalOtherAssets,
                grossWealth,
                totalDebts,
                totalDebtInterest,
                netWealth,
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
                                    Vermögen deklarieren
                                </h1>

                                <p className="max-w-4xl text-sm text-default-500">
                                    Erfasse hier dein Vermögen per Stichtag im schweizer Steuerformat.
                                    Dazu gehören Bankguthaben, Wertschriften, Kryptowährungen,
                                    Fahrzeuge, Liegenschaften, Versicherungswerte, sonstige
                                    Vermögenswerte sowie Schulden. Die Maske ist so aufgebaut,
                                    dass sie sich gut für kantonale Steuererklärungen anpassen lässt.
                                </p>
                            </div>
                        </CardHeader>

                        <CardBody className="px-6 pb-8 pt-2 md:px-8">
                            <form name="taxformAlpengrun" className="space-y-8" onSubmit={handleSubmit}>
                                <div className="rounded-2xl p-4 shadow-md">
                                    <div className="mb-2">
                                        <h3 className="text-sm font-semibold text-default-700">
                                            Vermögensübersicht
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
                                            <Landmark className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">1. Bankkonten, Sparguthaben und Bargeld</h2>
                                            <p className="text-sm text-default-500">
                                                Erfasse alle Konten mit Saldo per Stichtag. Dazu gehören
                                                Privatkonten, Sparkonten, Bargeldbestände und ähnliche liquide Mittel.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        {bankAccounts.map((account, index) => (
                                            <div
                                                key={account.id}
                                                className="rounded-2xl border border-default-200 p-4 shadow-sm"
                                            >
                                                <div className="mb-4 flex items-center justify-between">
                                                    <h3 className="text-sm font-semibold">
                                                        Konto / Guthaben {index + 1}
                                                    </h3>

                                                    {bankAccounts.length > 1 && (
                                                        <Button
                                                            isIconOnly
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeItem(setBankAccounts, account.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>

                                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                                    <Input
                                                        label="Bank / Institution"
                                                        placeholder="z. B. Zürcher Kantonalbank"
                                                        variant="bordered"
                                                        value={account.bankName}
                                                        onChange={(e) =>
                                                            updateArrayItem(setBankAccounts, account.id, "bankName", e.target.value)
                                                        }
                                                    />

                                                    <Select
                                                        label="Kontotyp"
                                                        placeholder="Bitte auswählen"
                                                        variant="bordered"
                                                        selectedKeys={
                                                            account.accountType ? new Set([account.accountType]) : new Set()
                                                        }
                                                        onSelectionChange={(keys) => {
                                                            if (keys === "all") return;
                                                            const value = Array.from(keys)[0]?.toString() ?? "";
                                                            updateArrayItem(setBankAccounts, account.id, "accountType", value);
                                                        }}
                                                    >
                                                        {accountTypes.map((type) => (
                                                            <SelectItem key={type.key}>{type.label}</SelectItem>
                                                        ))}
                                                    </Select>

                                                    <Input
                                                        label="IBAN / Kontonummer"
                                                        placeholder="Optional"
                                                        variant="bordered"
                                                        value={account.iban}
                                                        onChange={(e) =>
                                                            updateArrayItem(setBankAccounts, account.id, "iban", e.target.value)
                                                        }
                                                    />

                                                    <Input
                                                        type="number"
                                                        label="Saldo per Stichtag"
                                                        placeholder="0.00"
                                                        variant="bordered"
                                                        endContent={<span className="text-sm text-default-400">CHF</span>}
                                                        value={account.balance}
                                                        onChange={(e) =>
                                                            updateArrayItem(setBankAccounts, account.id, "balance", e.target.value)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <Button
                                            variant="flat"
                                            startContent={<Plus className="h-4 w-4" />}
                                            onPress={addBankAccount}
                                        >
                                            Konto hinzufügen
                                        </Button>
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Wallet className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">2. Wertschriften</h2>
                                            <p className="text-sm text-default-500">
                                                Gib steuerbare Wertschriften mit Steuerwert per Jahresende an,
                                                z. B. Aktien, ETF, Fonds oder Obligationen.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <Select
                                            label="Hast du Wertschriften?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasSecurities ? new Set([formData.hasSecurities]) : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange("hasSecurities", Array.from(keys)[0]?.toString() ?? "");
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {formData.hasSecurities === "ja" && (
                                        <div className="space-y-4">
                                            {securities.map((position, index) => (
                                                <div
                                                    key={position.id}
                                                    className="rounded-2xl border border-default-200 p-4 shadow-sm"
                                                >
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <h3 className="text-sm font-semibold">
                                                            Wertschrift {index + 1}
                                                        </h3>

                                                        <Button
                                                            isIconOnly
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeItem(setSecurities, position.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
                                                        <Input
                                                            label="Bezeichnung"
                                                            placeholder="z. B. Nestlé / MSCI World ETF"
                                                            variant="bordered"
                                                            value={position.designation}
                                                            onChange={(e) =>
                                                                updateArrayItem(setSecurities, position.id, "designation", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            label="ISIN / Valor"
                                                            placeholder="Optional"
                                                            variant="bordered"
                                                            value={position.isin}
                                                            onChange={(e) =>
                                                                updateArrayItem(setSecurities, position.id, "isin", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            label="Anzahl"
                                                            placeholder="0"
                                                            variant="bordered"
                                                            value={position.quantity}
                                                            onChange={(e) =>
                                                                updateArrayItem(setSecurities, position.id, "quantity", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Steuerwert"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={position.taxValue}
                                                            onChange={(e) =>
                                                                updateArrayItem(setSecurities, position.id, "taxValue", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Bruttoertrag"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={position.grossYield}
                                                            onChange={(e) =>
                                                                updateArrayItem(setSecurities, position.id, "grossYield", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                variant="flat"
                                                startContent={<Plus className="h-4 w-4" />}
                                                onPress={addSecurity}
                                            >
                                                Wertschrift hinzufügen
                                            </Button>
                                        </div>
                                    )}
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Coins className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">3. Kryptowährungen</h2>
                                            <p className="text-sm text-default-500">
                                                Erfasse deine Kryptowährungen mit Bestand und Steuerwert per Stichtag.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <Select
                                            label="Hast du Kryptowährungen?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={formData.hasCrypto ? new Set([formData.hasCrypto]) : new Set()}
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange("hasCrypto", Array.from(keys)[0]?.toString() ?? "");
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {formData.hasCrypto === "ja" && (
                                        <div className="space-y-4">
                                            {cryptoAssets.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="rounded-2xl border border-default-200 p-4 shadow-sm"
                                                >
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <h3 className="text-sm font-semibold">Krypto-Position {index + 1}</h3>

                                                        <Button
                                                            isIconOnly
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeItem(setCryptoAssets, item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                        <Input
                                                            label="Coin / Token"
                                                            placeholder="z. B. Bitcoin"
                                                            variant="bordered"
                                                            value={item.coin}
                                                            onChange={(e) =>
                                                                updateArrayItem(setCryptoAssets, item.id, "coin", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            label="Anzahl"
                                                            placeholder="0"
                                                            variant="bordered"
                                                            value={item.quantity}
                                                            onChange={(e) =>
                                                                updateArrayItem(setCryptoAssets, item.id, "quantity", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Steuerwert"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={item.taxValue}
                                                            onChange={(e) =>
                                                                updateArrayItem(setCryptoAssets, item.id, "taxValue", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                variant="flat"
                                                startContent={<Plus className="h-4 w-4" />}
                                                onPress={addCrypto}
                                            >
                                                Kryptowährung hinzufügen
                                            </Button>
                                        </div>
                                    )}
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Car className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">4. Fahrzeuge und wertvolle bewegliche Sachen</h2>
                                            <p className="text-sm text-default-500">
                                                Je nach Prozess oder Kanton können Fahrzeuge oder besondere
                                                Vermögensgegenstände separat erfasst werden.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <Select
                                            label="Hast du Fahrzeuge?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasVehicles ? new Set([formData.hasVehicles]) : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange("hasVehicles", Array.from(keys)[0]?.toString() ?? "");
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {formData.hasVehicles === "ja" && (
                                        <div className="space-y-4">
                                            {vehicles.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="rounded-2xl border border-default-200 p-4 shadow-sm"
                                                >
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <h3 className="text-sm font-semibold">Eintrag {index + 1}</h3>

                                                        <Button
                                                            isIconOnly
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeItem(setVehicles, item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                                                        <Input
                                                            label="Art"
                                                            placeholder="z. B. Auto, Motorrad, Kunstobjekt"
                                                            variant="bordered"
                                                            value={item.type}
                                                            onChange={(e) =>
                                                                updateArrayItem(setVehicles, item.id, "type", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            label="Marke / Modell / Beschreibung"
                                                            placeholder="z. B. VW Golf"
                                                            variant="bordered"
                                                            value={item.brandModel}
                                                            onChange={(e) =>
                                                                updateArrayItem(setVehicles, item.id, "brandModel", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            label="Jahr"
                                                            placeholder="z. B. 2022"
                                                            variant="bordered"
                                                            value={item.year}
                                                            onChange={(e) =>
                                                                updateArrayItem(setVehicles, item.id, "year", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Verkehrs- / Marktwert"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={item.marketValue}
                                                            onChange={(e) =>
                                                                updateArrayItem(setVehicles, item.id, "marketValue", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                variant="flat"
                                                startContent={<Plus className="h-4 w-4" />}
                                                onPress={addVehicle}
                                            >
                                                Eintrag hinzufügen
                                            </Button>
                                        </div>
                                    )}
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div className="flex items-start gap-3">
                                        <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                            <Building2 className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-md font-semibold">5. Liegenschaften / Immobilien</h2>
                                            <p className="text-sm text-default-500">
                                                Erfasse Liegenschaften im In- und Ausland mit Steuerwert,
                                                Eigenmietwert bzw. Mietwert und Eigentumsanteil.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <Select
                                            label="Hast du Liegenschaften?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasRealEstate ? new Set([formData.hasRealEstate]) : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange("hasRealEstate", Array.from(keys)[0]?.toString() ?? "");
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {formData.hasRealEstate === "ja" && (
                                        <div className="space-y-4">
                                            {realEstates.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="rounded-2xl border border-default-200 p-4 shadow-sm"
                                                >
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <h3 className="text-sm font-semibold">Liegenschaft {index + 1}</h3>

                                                        <Button
                                                            isIconOnly
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeItem(setRealEstates, item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                                        <Select
                                                            label="Art"
                                                            placeholder="Bitte auswählen"
                                                            variant="bordered"
                                                            selectedKeys={item.type ? new Set([item.type]) : new Set()}
                                                            onSelectionChange={(keys) => {
                                                                if (keys === "all") return;
                                                                updateArrayItem(
                                                                    setRealEstates,
                                                                    item.id,
                                                                    "type",
                                                                    Array.from(keys)[0]?.toString() ?? ""
                                                                );
                                                            }}
                                                        >
                                                            {realEstateTypes.map((type) => (
                                                                <SelectItem key={type.key}>{type.label}</SelectItem>
                                                            ))}
                                                        </Select>

                                                        <Input
                                                            label="Land"
                                                            placeholder="Schweiz"
                                                            variant="bordered"
                                                            value={item.country}
                                                            onChange={(e) =>
                                                                updateArrayItem(setRealEstates, item.id, "country", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            label="Kanton / Region"
                                                            placeholder="z. B. Bern"
                                                            variant="bordered"
                                                            value={item.cantonOrRegion}
                                                            onChange={(e) =>
                                                                updateArrayItem(
                                                                    setRealEstates,
                                                                    item.id,
                                                                    "cantonOrRegion",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />

                                                        <Input
                                                            label="Gemeinde / Ort"
                                                            placeholder="z. B. Thun"
                                                            variant="bordered"
                                                            value={item.municipality}
                                                            onChange={(e) =>
                                                                updateArrayItem(
                                                                    setRealEstates,
                                                                    item.id,
                                                                    "municipality",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Steuerwert"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={item.taxValue}
                                                            onChange={(e) =>
                                                                updateArrayItem(setRealEstates, item.id, "taxValue", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Eigenmietwert / Mietwert"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={item.rentalValue}
                                                            onChange={(e) =>
                                                                updateArrayItem(
                                                                    setRealEstates,
                                                                    item.id,
                                                                    "rentalValue",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />

                                                        <Input
                                                            label="Eigentumsanteil"
                                                            placeholder="z. B. 50%"
                                                            variant="bordered"
                                                            value={item.ownershipShare}
                                                            onChange={(e) =>
                                                                updateArrayItem(
                                                                    setRealEstates,
                                                                    item.id,
                                                                    "ownershipShare",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                variant="flat"
                                                startContent={<Plus className="h-4 w-4" />}
                                                onPress={addRealEstate}
                                            >
                                                Liegenschaft hinzufügen
                                            </Button>
                                        </div>
                                    )}
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div>
                                        <h2 className="text-md font-semibold">
                                            6. Säule 3a / rückkaufsfähige Lebensversicherungen / ähnliche Werte
                                        </h2>
                                        <p className="text-sm text-default-500">
                                            Diese Maske ist bewusst breit gehalten. Je nach Steuersoftware
                                            oder Kanton werden gewisse Werte separat oder nur informativ erfasst.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <Select
                                            label="Hast du solche Vermögenswerte?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasInsuranceAssets
                                                    ? new Set([formData.hasInsuranceAssets])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange(
                                                    "hasInsuranceAssets",
                                                    Array.from(keys)[0]?.toString() ?? ""
                                                );
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {formData.hasInsuranceAssets === "ja" && (
                                        <div className="space-y-4">
                                            {insuranceAssets.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="rounded-2xl border border-default-200 p-4 shadow-sm"
                                                >
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <h3 className="text-sm font-semibold">Eintrag {index + 1}</h3>

                                                        <Button
                                                            isIconOnly
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeItem(setInsuranceAssets, item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                                        <Input
                                                            label="Anbieter"
                                                            placeholder="z. B. Versicherung / Bank"
                                                            variant="bordered"
                                                            value={item.provider}
                                                            onChange={(e) =>
                                                                updateArrayItem(setInsuranceAssets, item.id, "provider", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            label="Art"
                                                            placeholder="z. B. Lebensversicherung / Vorsorgeprodukt"
                                                            variant="bordered"
                                                            value={item.type}
                                                            onChange={(e) =>
                                                                updateArrayItem(setInsuranceAssets, item.id, "type", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Rückkaufswert / Steuerwert"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={item.surrenderValue}
                                                            onChange={(e) =>
                                                                updateArrayItem(
                                                                    setInsuranceAssets,
                                                                    item.id,
                                                                    "surrenderValue",
                                                                    e.target.value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                variant="flat"
                                                startContent={<Plus className="h-4 w-4" />}
                                                onPress={addInsuranceAsset}
                                            >
                                                Eintrag hinzufügen
                                            </Button>
                                        </div>
                                    )}
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div>
                                        <h2 className="text-md font-semibold">7. Sonstiges Vermögen</h2>
                                        <p className="text-sm text-default-500">
                                            Hier kannst du weitere Vermögenswerte erfassen, die in keine andere Kategorie passen.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <Select
                                            label="Hast du sonstiges Vermögen?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.hasOtherAssets ? new Set([formData.hasOtherAssets]) : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange("hasOtherAssets", Array.from(keys)[0]?.toString() ?? "");
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {formData.hasOtherAssets === "ja" && (
                                        <div className="space-y-4">
                                            {otherAssets.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="rounded-2xl border border-default-200 p-4 shadow-sm"
                                                >
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <h3 className="text-sm font-semibold">Sonstiger Vermögenswert {index + 1}</h3>

                                                        <Button
                                                            isIconOnly
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeItem(setOtherAssets, item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                                        <Input
                                                            label="Beschreibung"
                                                            placeholder="z. B. Darlehensforderung, Edelmetalle, Sammlerstück"
                                                            variant="bordered"
                                                            value={item.description}
                                                            onChange={(e) =>
                                                                updateArrayItem(setOtherAssets, item.id, "description", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Steuerwert"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={item.taxValue}
                                                            onChange={(e) =>
                                                                updateArrayItem(setOtherAssets, item.id, "taxValue", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                variant="flat"
                                                startContent={<Plus className="h-4 w-4" />}
                                                onPress={addOtherAsset}
                                            >
                                                Vermögenswert hinzufügen
                                            </Button>
                                        </div>
                                    )}
                                </section>

                                <Divider />

                                <section className="space-y-5">
                                    <div>
                                        <h2 className="text-md font-semibold">8. Schulden</h2>
                                        <p className="text-sm text-default-500">
                                            Gib hier alle abzugsfähigen Schulden per Stichtag sowie die
                                            bezahlten Schuldzinsen an, z. B. Hypotheken oder private Darlehen.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                        <Select
                                            label="Hast du Schulden?"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={formData.hasDebts ? new Set([formData.hasDebts]) : new Set()}
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                handleInputChange("hasDebts", Array.from(keys)[0]?.toString() ?? "");
                                            }}
                                        >
                                            {yesNoOptions.map((option) => (
                                                <SelectItem key={option.key}>{option.label}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    {formData.hasDebts === "ja" && (
                                        <div className="space-y-4">
                                            {debts.map((item, index) => (
                                                <div
                                                    key={item.id}
                                                    className="rounded-2xl border border-default-200 p-4 shadow-sm"
                                                >
                                                    <div className="mb-4 flex items-center justify-between">
                                                        <h3 className="text-sm font-semibold">Schuld {index + 1}</h3>

                                                        <Button
                                                            isIconOnly
                                                            variant="light"
                                                            color="danger"
                                                            onPress={() => removeItem(setDebts, item.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>

                                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                                        <Input
                                                            label="Gläubiger"
                                                            placeholder="z. B. UBS / Privatperson"
                                                            variant="bordered"
                                                            value={item.creditor}
                                                            onChange={(e) =>
                                                                updateArrayItem(setDebts, item.id, "creditor", e.target.value)
                                                            }
                                                        />

                                                        <Select
                                                            label="Art der Schuld"
                                                            placeholder="Bitte auswählen"
                                                            variant="bordered"
                                                            selectedKeys={item.type ? new Set([item.type]) : new Set()}
                                                            onSelectionChange={(keys) => {
                                                                if (keys === "all") return;
                                                                updateArrayItem(
                                                                    setDebts,
                                                                    item.id,
                                                                    "type",
                                                                    Array.from(keys)[0]?.toString() ?? ""
                                                                );
                                                            }}
                                                        >
                                                            {debtTypes.map((type) => (
                                                                <SelectItem key={type.key}>{type.label}</SelectItem>
                                                            ))}
                                                        </Select>

                                                        <Input
                                                            type="number"
                                                            label="Schuldbetrag per Stichtag"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={item.amount}
                                                            onChange={(e) =>
                                                                updateArrayItem(setDebts, item.id, "amount", e.target.value)
                                                            }
                                                        />

                                                        <Input
                                                            type="number"
                                                            label="Bezahlte Schuldzinsen"
                                                            placeholder="0.00"
                                                            variant="bordered"
                                                            endContent={<span className="text-sm text-default-400">CHF</span>}
                                                            value={item.yearlyInterest}
                                                            onChange={(e) =>
                                                                updateArrayItem(setDebts, item.id, "yearlyInterest", e.target.value)
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            ))}

                                            <Button
                                                variant="flat"
                                                startContent={<Plus className="h-4 w-4" />}
                                                onPress={addDebt}
                                            >
                                                Schuld hinzufügen
                                            </Button>
                                        </div>
                                    )}
                                </section>

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">9. Bemerkungen</h2>
                                        <p className="text-sm text-default-500">
                                            Optional: Hinweise zu Spezialfällen, Gemeinschaftseigentum,
                                            ausländischem Vermögen oder kantonalen Besonderheiten.
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
                                            Automatisch berechnete Übersicht deiner Vermögenswerte und Schulden.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Total Vermögen</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {grossWealth.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Total Schulden</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {totalDebts.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-default-200 p-4">
                                            <p className="text-sm text-default-500">Schuldzinsen</p>
                                            <p className="mt-1 text-2xl font-semibold">
                                                CHF {totalDebtInterest.toLocaleString("de-CH")}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                                            <p className="text-sm text-default-500">Nettovermögen</p>
                                            <p className="mt-1 text-2xl font-semibold text-primary">
                                                CHF {netWealth.toLocaleString("de-CH")}
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