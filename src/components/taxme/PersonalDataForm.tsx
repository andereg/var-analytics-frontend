import React, { useMemo, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Select,
    SelectItem,
    Button,
    Divider,
    Chip,
} from "@heroui/react";
import ProgressModal from "@/components/charts/ProgressModal";

type TaxPersonalDataFormProps = {
    onContinue?: () => void;
};

const maritalStatuses = [
    { key: "ledig", label: "Ledig" },
    { key: "verheiratet", label: "Verheiratet" },
    { key: "geschieden", label: "Geschieden" },
    { key: "verwitwet", label: "Verwitwet" },
    { key: "getrennt", label: "Dauernd getrennt lebend" },
];

const taxClasses = [
    { key: "1", label: "Steuerklasse I" },
    { key: "2", label: "Steuerklasse II" },
    { key: "3", label: "Steuerklasse III" },
    { key: "4", label: "Steuerklasse IV" },
    { key: "5", label: "Steuerklasse V" },
    { key: "6", label: "Steuerklasse VI" },
];

const religions = [
    { key: "keine", label: "Keine" },
    { key: "rk", label: "Römisch-katholisch" },
    { key: "ev", label: "Evangelisch" },
    { key: "andere", label: "Andere" },
];

export default function PersonalDataForm({
                                                onContinue,
                                            }: TaxPersonalDataFormProps) {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        birthDate: "",
        taxId: "",
        maritalStatus: "",
        taxClass: "",
        religion: "",
        occupation: "",
        email: "",
        phone: "",
        street: "",
        houseNumber: "",
        postalCode: "",
        city: "",
        country: "Schweiz",
        iban: "",
        bic: "",
        childrenCount: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const progress = useMemo(() => {
        const fieldsToCheck = [
            formData.firstName,
            formData.lastName,
            formData.birthDate,
            formData.taxId,
            formData.maritalStatus,
            formData.taxClass,
            formData.email,
            formData.street,
            formData.houseNumber,
            formData.postalCode,
            formData.city,
            formData.iban,
        ];

        const completedCount = fieldsToCheck.filter(
            (field) => String(field).trim() !== ""
        ).length;

        return Math.round((completedCount / fieldsToCheck.length) * 100);
    }, [formData]);

    const summaryChips = [
        formData.maritalStatus && `Familienstand: ${formData.maritalStatus}`,
        formData.taxClass && `Steuerklasse: ${formData.taxClass}`,
        formData.country && `Land: ${formData.country}`,
    ].filter(Boolean) as string[];

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            personalData: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                birthDate: formData.birthDate,
                taxId: formData.taxId,
                maritalStatus: formData.maritalStatus,
                taxClass: formData.taxClass,
                religion: formData.religion,
                occupation: formData.occupation,
                email: formData.email,
                phone: formData.phone,
            },
            address: {
                street: formData.street,
                houseNumber: formData.houseNumber,
                postalCode: formData.postalCode,
                city: formData.city,
                country: formData.country,
            },
            bankDetails: {
                iban: formData.iban,
                bic: formData.bic,
            },
            familyInfo: {
                childrenCount: formData.childrenCount,
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
                                    Persönliche Daten angeben
                                </h1>

                                <p className="max-w-3xl text-sm text-default-500">
                                    Trage hier deine persönlichen Angaben für die Steuererklärung
                                    ein. Diese Informationen werden für die Identifikation und die
                                    spätere Berechnung benötigt.
                                </p>
                            </div>
                        </CardHeader>

                        <CardBody className="px-6 pb-8 pt-2 md:px-8">
                            <form name="taxformAlpengrun" className="space-y-8" onSubmit={handleSubmit}>
                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">
                                            Allgemeine persönliche Angaben
                                        </h2>
                                        <p className="text-sm text-default-500">
                                            Bitte gib deine grundlegenden Stammdaten ein.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            label="Vorname"
                                            placeholder="Max"
                                            variant="bordered"
                                            value={formData.firstName}
                                            onChange={(e) =>
                                                handleInputChange("firstName", e.target.value)
                                            }
                                        />

                                        <Input
                                            label="Nachname"
                                            placeholder="Mustermann"
                                            variant="bordered"
                                            value={formData.lastName}
                                            onChange={(e) =>
                                                handleInputChange("lastName", e.target.value)
                                            }
                                        />

                                        <Input
                                            type="date"
                                            label="Geburtsdatum"
                                            variant="bordered"
                                            value={formData.birthDate}
                                            onChange={(e) =>
                                                handleInputChange("birthDate", e.target.value)
                                            }
                                        />

                                        <Input
                                            label="Steuer-Identifikationsnummer"
                                            placeholder="11-stellige Steuer-ID"
                                            variant="bordered"
                                            value={formData.taxId}
                                            onChange={(e) =>
                                                handleInputChange("taxId", e.target.value)
                                            }
                                        />

                                        <Select
                                            label="Familienstand"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.maritalStatus
                                                    ? new Set([formData.maritalStatus])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                const value = Array.from(keys)[0]?.toString() ?? "";
                                                handleInputChange("maritalStatus", value);
                                            }}
                                        >
                                            {maritalStatuses.map((status) => (
                                                <SelectItem key={status.key}>{status.label}</SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            label="Steuerklasse"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.taxClass
                                                    ? new Set([formData.taxClass])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                const value = Array.from(keys)[0]?.toString() ?? "";
                                                handleInputChange("taxClass", value);
                                            }}
                                        >
                                            {taxClasses.map((taxClass) => (
                                                <SelectItem key={taxClass.key}>
                                                    {taxClass.label}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            label="Religionszugehörigkeit"
                                            placeholder="Bitte auswählen"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.religion
                                                    ? new Set([formData.religion])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) => {
                                                if (keys === "all") return;
                                                const value = Array.from(keys)[0]?.toString() ?? "";
                                                handleInputChange("religion", value);
                                            }}
                                        >
                                            {religions.map((religion) => (
                                                <SelectItem key={religion.key}>
                                                    {religion.label}
                                                </SelectItem>
                                            ))}
                                        </Select>

                                        <Input
                                            label="Beruf"
                                            placeholder="z. B. Softwareentwickler"
                                            variant="bordered"
                                            value={formData.occupation}
                                            onChange={(e) =>
                                                handleInputChange("occupation", e.target.value)
                                            }
                                        />
                                    </div>

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
                                </section>

                                <Divider/>

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">Kontaktdaten</h2>
                                        <p className="text-sm text-default-500">
                                            Diese Daten helfen bei Rückfragen und der Zuordnung deiner
                                            Steuererklärung.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            type="email"
                                            label="E-Mail-Adresse"
                                            placeholder="max.mustermann@email.ch"
                                            variant="bordered"
                                            value={formData.email}
                                            onChange={(e) =>
                                                handleInputChange("email", e.target.value)
                                            }
                                        />

                                        <Input
                                            label="Telefonnummer"
                                            placeholder="+41 076 123 4567"
                                            variant="bordered"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                handleInputChange("phone", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider/>

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">Adresse</h2>
                                        <p className="text-sm text-default-500">
                                            Gib deine aktuelle Meldeadresse an.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            label="Straße"
                                            placeholder="Musterstraße"
                                            variant="bordered"
                                            value={formData.street}
                                            onChange={(e) =>
                                                handleInputChange("street", e.target.value)
                                            }
                                        />

                                        <Input
                                            label="Hausnummer"
                                            placeholder="12a"
                                            variant="bordered"
                                            value={formData.houseNumber}
                                            onChange={(e) =>
                                                handleInputChange("houseNumber", e.target.value)
                                            }
                                        />

                                        <Input
                                            label="Postleitzahl"
                                            placeholder="12345"
                                            variant="bordered"
                                            value={formData.postalCode}
                                            onChange={(e) =>
                                                handleInputChange("postalCode", e.target.value)
                                            }
                                        />

                                        <Input
                                            label="Ort"
                                            placeholder="Bern"
                                            variant="bordered"
                                            value={formData.city}
                                            onChange={(e) =>
                                                handleInputChange("city", e.target.value)
                                            }
                                        />

                                        <Input
                                            label="Land"
                                            placeholder="Deutschland"
                                            variant="bordered"
                                            value={formData.country}
                                            onChange={(e) =>
                                                handleInputChange("country", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider/>

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">Bankverbindung</h2>
                                        <p className="text-sm text-default-500">
                                            Für eventuelle Erstattungen kann direkt deine
                                            Bankverbindung hinterlegt werden.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            label="IBAN"
                                            placeholder="CH00 0000 0000 0000 0000 00"
                                            variant="bordered"
                                            value={formData.iban}
                                            onChange={(e) =>
                                                handleInputChange("iban", e.target.value)
                                            }
                                        />

                                        <Input
                                            label="BIC"
                                            placeholder="POFIBEXXX"
                                            variant="bordered"
                                            value={formData.bic}
                                            onChange={(e) =>
                                                handleInputChange("bic", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider/>

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">
                                            Familieninformationen
                                        </h2>
                                        <p className="text-sm text-default-500">
                                            Diese Angaben können für steuerliche Freibeträge relevant
                                            sein.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            type="number"
                                            label="Anzahl Kinder"
                                            placeholder="0"
                                            variant="bordered"
                                            value={formData.childrenCount}
                                            onChange={(e) =>
                                                handleInputChange("childrenCount", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-md font-semibold">Allgemeine Angaben</h2>
                                        <p className="text-sm text-default-500">
                                            Grunddaten zur Vermögensdeklaration für das Steuerjahr.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            label="Steuerjahr"
                                            placeholder="z. B. 2025"
                                            variant="bordered"
                                            value="2026"
                                            onChange={(e) => handleInputChange("taxYear", e.target.value)}
                                        />

                                        <Input
                                            label="Stichtag"
                                            placeholder="31.12."
                                            variant="bordered"
                                            onChange={(e) => handleInputChange("valuationDate", e.target.value)}
                                        />
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