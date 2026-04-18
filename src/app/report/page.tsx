"use client";

import React, {useEffect, useMemo, useState} from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Textarea,
    Select,
    SelectItem,
    Button,
    Spinner,
    Divider,
    Chip,
} from "@heroui/react";

import {
    ClubBase,
    Competition,
    Season,
    ControversyType,
    RefereeBase, Controversy, ControversyDto,
} from "@/api/types";

import {getClubs} from "@/api/clubs";
import {getCompetitions} from "@/api/competitions";
import {getSeasons} from "@/api/seasons";
import {getControversyTypes} from "@/api/controversyTypes";
import {getReferees} from "@/api/referees";
import {createControversy} from "@/api/controversies";
import {Link} from "@heroui/link";


type FormState = {
    date: string;
    description: string;
    referenceLink: string;
    beneficiaryId: string;
    victimId: string;
    competitionId: string;
    seasonId: string;
    controversyTypeId: string;
    mainRefereeId: string;
    varRefereeId: string;
    firstAssistantRefereeId: string;
    secondAssistantRefereeId: string;
};

const initialForm: FormState = {
    date: "",
    description: "",
    referenceLink: "",
    beneficiaryId: "",
    victimId: "",
    competitionId: "",
    seasonId: "",
    controversyTypeId: "",
    mainRefereeId: "",
    varRefereeId: "",
    firstAssistantRefereeId: "",
    secondAssistantRefereeId: "",
};

export default function CreateControversyReportPage() {
    const [clubs, setClubs] = useState<ClubBase[]>([]);
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [seasons, setSeasons] = useState<Season[]>([]);
    const [controversyTypes, setControversyTypes] = useState<ControversyType[]>([]);
    const [referees, setReferees] = useState<RefereeBase[]>([]);

    const [form, setForm] = useState<FormState>(initialForm);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                setLoading(true);
                setErrorMsg(null);

                const [clubsData, competitionsData, seasonsData, controversyTypesData, refereesData] = await Promise.all([
                    getClubs(),
                    getCompetitions(),
                    getSeasons(),
                    getControversyTypes(),
                    getReferees(),
                ]);

                if (!mounted) return;

                setClubs(clubsData ?? []);
                setCompetitions(competitionsData ?? []);
                setSeasons(seasonsData ?? []);
                setControversyTypes(controversyTypesData ?? []);
                setReferees(refereesData ?? []);
            } catch (e: any) {
                if (!mounted) return;
                setErrorMsg(e?.message ?? "failed to load form data");
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, []);

    const clubOptions = useMemo(() => clubs, [clubs]);
    const competitionOptions = useMemo(() => competitions, [competitions]);
    const seasonOptions = useMemo(() => seasons, [seasons]);
    const controversyTypeOptions = useMemo(() => controversyTypes, [controversyTypes]);
    const refereeOptions = useMemo(() => referees, [referees]);

    const setField = (field: keyof FormState, value: string) => {
        setForm(prev => ({...prev, [field]: value}));
    };

    const handleSelectChange = (field: keyof FormState) => (keys: "all" | Set<React.Key>) => {
        const value = Array.from(keys as Set<React.Key>)[0]?.toString() ?? "";
        setField(field, value);
    };

    const validateForm = () => {
        if (!form.date) return "please select a date";
        if (!form.description.trim()) return "please enter a description";
        if (!form.referenceLink.trim()) return "please enter a reference link";
        if (!form.beneficiaryId) return "please select a beneficiary";
        if (!form.victimId) return "please select a victim";
        if (form.beneficiaryId === form.victimId) return "beneficiary and victim cannot be the same club";
        if (!form.competitionId) return "please select a competition";
        if (!form.seasonId) return "please select a season";
        if (!form.controversyTypeId) return "please select a controversy type";
        if (!form.mainRefereeId) return "please select a main referee";
        if (!form.varRefereeId) return "please select a var referee";
        if (!form.firstAssistantRefereeId) return "please select a first assistant referee";
        if (!form.secondAssistantRefereeId) return "please select a second assistant referee";
        return null;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const validationError = validateForm();
        if (validationError) {
            setErrorMsg(validationError);
            setSuccessMsg(null);
            return;
        }

        try {
            setSaving(true);
            setErrorMsg(null);
            setSuccessMsg(null);

            const controversy: ControversyDto = {
                date: new Date(form.date).toISOString(),
                description: form.description.trim(),
                referenceLink: form.referenceLink.trim(),
                beneficiaryId: Number(form.beneficiaryId),
                victimId: Number(form.victimId),
                competitionId: Number(form.competitionId),
                seasonId: Number(form.seasonId),
                controversyTypeId: Number(form.controversyTypeId),
                mainRefereeId: Number(form.mainRefereeId),
                varRefereeId: Number(form.varRefereeId),
                firstAssistantRefereeId: Number(form.firstAssistantRefereeId),
                secondAssistantRefereeId: Number(form.secondAssistantRefereeId),
            };

            await createControversy(controversy);

            setSuccessMsg("controversy created successfully");
            setForm(initialForm);
        } catch (e: any) {
            setErrorMsg(e?.message ?? "failed to create controversy");
            setSuccessMsg(null);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-stone-100 p-6 flex items-center justify-center">
                <Spinner />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-100 p-6">
            <div className="mx-auto w-full max-w-5xl">
                <Card className="rounded-2xl shadow-xl mb-4">
                    <CardHeader className="px-6 pt-6 pb-0 flex items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-2xl font-semibold">Report a controversy</h1>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">
                                Submit a controversial decision with an external reference link. Your report will be reviewed by our team before being published.
                            </p>
                        </div>
                    </CardHeader>

                    <CardBody className="p-6">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input
                                    type="date"
                                    label="Date"
                                    variant="bordered"
                                    value={form.date}
                                    onValueChange={(value) => setField("date", value)}
                                    isRequired
                                />

                                <Input
                                    type="url"
                                    label="Reference Link"
                                    placeholder="https://..."
                                    variant="bordered"
                                    value={form.referenceLink}
                                    onValueChange={(value) => setField("referenceLink", value)}
                                    isRequired
                                />
                            </div>

                            <Textarea
                                label="Description"
                                placeholder="describe the controversial decision..."
                                variant="bordered"
                                minRows={5}
                                value={form.description}
                                onValueChange={(value) => setField("description", value)}
                                isRequired
                            />

                            <Divider className="opacity-40" />

                            <div>
                                <h2 className="text-lg font-semibold text-gray-600 mb-3">Clubs</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        label="Beneficiary"
                                        variant="bordered"
                                        selectedKeys={form.beneficiaryId ? [form.beneficiaryId] : []}
                                        onSelectionChange={handleSelectChange("beneficiaryId")}
                                        isRequired
                                    >
                                        {clubOptions.map((club) => (
                                            <SelectItem key={club.id.toString()}>
                                                {club.name}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="Victim"
                                        variant="bordered"
                                        selectedKeys={form.victimId ? [form.victimId] : []}
                                        onSelectionChange={handleSelectChange("victimId")}
                                        isRequired
                                    >
                                        {clubOptions.map((club) => (
                                            <SelectItem key={club.id.toString()}>
                                                {club.name}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <Divider className="opacity-40" />

                            <div>
                                <h2 className="text-lg font-semibold text-gray-600 mb-3">Competition Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <Select
                                        label="Competition"
                                        variant="bordered"
                                        selectedKeys={form.competitionId ? [form.competitionId] : []}
                                        onSelectionChange={handleSelectChange("competitionId")}
                                        isRequired
                                    >
                                        {competitionOptions.map((competition) => (
                                            <SelectItem key={competition.id.toString()}>

                                                {competition.name}

                                                
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="Season"
                                        variant="bordered"
                                        selectedKeys={form.seasonId ? [form.seasonId] : []}
                                        onSelectionChange={handleSelectChange("seasonId")}
                                        isRequired
                                    >
                                        {seasonOptions.map((season) => (
                                            <SelectItem key={season.id.toString()}>
                                                {season.seasonName}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="Controversy Type"
                                        variant="bordered"
                                        className="col-span-2"
                                        selectedKeys={form.controversyTypeId ? [form.controversyTypeId] : []}
                                        onSelectionChange={handleSelectChange("controversyTypeId")}
                                        isRequired
                                    >
                                        {controversyTypeOptions.map((type) => (
                                            <SelectItem key={type.id.toString()}>
                                                {type.description}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            <Divider className="opacity-40" />

                            <div>
                                <h2 className="text-lg font-semibold text-gray-600 mb-3">Referees</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Select
                                        label="Main Referee"
                                        variant="bordered"
                                        selectedKeys={form.mainRefereeId ? [form.mainRefereeId] : []}
                                        onSelectionChange={handleSelectChange("mainRefereeId")}
                                        isRequired
                                    >
                                        {refereeOptions.map((referee) => (
                                            <SelectItem key={referee.id.toString()}>
                                                {referee.name + " " + referee.surname}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="VAR Referee"
                                        variant="bordered"
                                        selectedKeys={form.varRefereeId ? [form.varRefereeId] : []}
                                        onSelectionChange={handleSelectChange("varRefereeId")}
                                        isRequired
                                    >
                                        {refereeOptions.map((referee) => (
                                            <SelectItem key={referee.id.toString()}>
                                                {referee.name + " " + referee.surname}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="First Assistant Referee"
                                        variant="bordered"
                                        selectedKeys={form.firstAssistantRefereeId ? [form.firstAssistantRefereeId] : []}
                                        onSelectionChange={handleSelectChange("firstAssistantRefereeId")}
                                    >
                                        {refereeOptions.map((referee) => (
                                            <SelectItem key={referee.id.toString()}>
                                                {referee.name + " " + referee.surname}
                                            </SelectItem>
                                        ))}
                                    </Select>

                                    <Select
                                        label="Second Assistant Referee"
                                        variant="bordered"
                                        selectedKeys={form.secondAssistantRefereeId ? [form.secondAssistantRefereeId] : []}
                                        onSelectionChange={handleSelectChange("secondAssistantRefereeId")}
                                    >
                                        {refereeOptions.map((referee) => (
                                            <SelectItem key={referee.id.toString()}>
                                                {referee.name + " " + referee.surname}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>

                            {(errorMsg || successMsg) && (
                                <div className="rounded-xl border border-black/5 bg-white px-4 py-3 shadow-sm">
                                    {errorMsg && <p className="text-sm text-red-600">error: {errorMsg}</p>}
                                    {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-3">
                                <Button
                                    radius="full"
                                    type="button"
                                    variant="ghost"
                                    onPress={() => {
                                        setForm(initialForm);
                                        setErrorMsg(null);
                                        setSuccessMsg(null);
                                    }}
                                    isDisabled={saving}
                                >
                                    reset
                                </Button>
                                <Button
                                    radius="full"
                                    type="submit"
                                    variant="ghost"
                                    color="default"
                                    className="font-medium"
                                    isLoading={saving}
                                >
                                    Submit Controversy
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}
