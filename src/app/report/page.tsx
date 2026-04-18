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
    Chip, Autocomplete, AutocompleteItem,
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


type FormState = {
    date: string;
    description: string;
    referenceLink: string;
    beneficiaryId: string;
    victimId: string;
    result: string;
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
    result: "",
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
        if (!form.result) return "please set the match result";
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
                result: form.result,
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
                                    
                                />

                                <Input
                                    type="url"
                                    label="Reference Link"
                                    placeholder="https://"
                                    variant="bordered"
                                    value={form.referenceLink}
                                    onValueChange={(value) => setField("referenceLink", value)}
                                    
                                />
                            </div>

                            <Textarea
                                label="Description"
                                placeholder="describe the controversial decision"
                                variant="bordered"
                                minRows={3}
                                value={form.description}
                                onValueChange={(value) => setField("description", value)}
                                
                            />

                            <div>
                                <h2 className="text-lg font-semibold text-gray-600 mb-3">Clubs</h2>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <Autocomplete
                                        className="col-span-2"
                                        label="Beneficiary"
                                        variant="bordered"
                                        selectedKey={form.beneficiaryId || null}
                                        onSelectionChange={(key) => setField("beneficiaryId", key?.toString() ?? "")}
                                        defaultItems={clubOptions}
                                        placeholder="Select beneficiary club"
                                        aria-label="Club"
                                        listboxProps={{
                                            className: "max-h-64 overflow-y-auto p-1"
                                        }}
                                        popoverProps={{
                                            className: "w-full"
                                        }}
                                        required
                                    >
                                        {(club) => (
                                            <AutocompleteItem key={club.id.toString()} textValue={club.name}>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={club.logo}
                                                        alt={club.name}
                                                        className="w-6 h-6 object-contain"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-700">{club.name}</span>
                                                    </div>
                                                </div>
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>

                                    <Input
                                        type="text"
                                        label="Result"
                                        variant="bordered"
                                        value={form.result}
                                        onValueChange={(value) => setField("result", value)}
                                        placeholder="0-0"
                                    />

                                    <Autocomplete
                                        className="col-span-2"
                                        label="Victim"
                                        variant="bordered"
                                        selectedKey={form.victimId || null}
                                        onSelectionChange={(key) => setField("victimId", key?.toString() ?? "")}
                                        defaultItems={clubOptions}
                                        placeholder="Select victim club"
                                        aria-label="Victim"
                                        listboxProps={{
                                            className: "max-h-64 overflow-y-auto p-1"
                                        }}
                                        popoverProps={{
                                            className: "w-full"
                                        }}
                                        required
                                    >
                                        {(club) => (
                                            <AutocompleteItem key={club.id.toString()} textValue={club.name}>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={club.logo}
                                                        alt={club.name}
                                                        className="w-6 h-6 object-contain"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-700">{club.name}</span>
                                                    </div>
                                                </div>
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-lg font-semibold text-gray-600 mb-3">Competition Details</h2>
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                    <Select
                                        label="Competition"
                                        variant="bordered"
                                        selectedKeys={form.competitionId ? [form.competitionId] : []}
                                        onSelectionChange={handleSelectChange("competitionId")}
                                        renderValue={(items) => {
                                            const item = items[0];
                                            if (!item) return null;

                                            const comp = competitionOptions.find(
                                                c => c.id.toString() === item.key
                                            );

                                            if (!comp) return item.textValue;

                                            return (
                                                <div className="flex items-center gap-2">
                                                    <img
                                                        src={comp.logo}
                                                        className="w-4 h-4 object-contain"
                                                    />
                                                    <span className="text-gray-700 font-medium">{comp.name}</span>
                                                </div>
                                            );
                                        }}
                                    >
                                        {competitionOptions.map((competition) => (
                                            <SelectItem key={competition.id.toString()}>
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={competition.logo}
                                                        alt={competition.name}
                                                        className="w-6 h-6 object-contain"
                                                    />
                                                    <div className="flex flex-col">
                                                        <span className="text-sm font-medium text-gray-700">{competition.name}</span>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </Select>


                                    <Select
                                        label="Season"
                                        variant="bordered"
                                        selectedKeys={form.seasonId ? [form.seasonId] : []}
                                        onSelectionChange={handleSelectChange("seasonId")}
                                        
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
                                        
                                    >
                                        {controversyTypeOptions.map((type) => (
                                            <SelectItem key={type.id.toString()}>
                                                {type.description}
                                            </SelectItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>


                            <div>
                                <h2 className="text-lg font-semibold text-gray-600 mb-3">Referees</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <Autocomplete
                                        label="Main Referee"
                                        variant="bordered"
                                        selectedKey={form.mainRefereeId || null}
                                        onSelectionChange={(key) =>
                                            setField("mainRefereeId", key?.toString() ?? "")
                                        }
                                        defaultItems={refereeOptions}
                                        placeholder="Search main referee"
                                        
                                        listboxProps={{
                                            className: "max-h-60 overflow-y-auto",
                                        }}
                                    >
                                        {(referee) => (
                                            <AutocompleteItem
                                                key={referee.id.toString()}
                                                textValue={`${referee.name} ${referee.surname}`}
                                            >
                                                {referee.name + " " + referee.surname}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>

                                    <Autocomplete
                                        label="VAR Referee"
                                        variant="bordered"
                                        selectedKey={form.varRefereeId || null}
                                        onSelectionChange={(key) =>
                                            setField("varRefereeId", key?.toString() ?? "")
                                        }
                                        defaultItems={refereeOptions}
                                        placeholder="Search var referee"
                                        
                                        listboxProps={{
                                            className: "max-h-60 overflow-y-auto",
                                        }}
                                    >
                                        {(referee) => (
                                            <AutocompleteItem
                                                key={referee.id.toString()}
                                                textValue={`${referee.name} ${referee.surname}`}
                                            >
                                                {referee.name + " " + referee.surname}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>

                                    <Autocomplete
                                        label="First Assistant Referee"
                                        variant="bordered"
                                        selectedKey={form.firstAssistantRefereeId || null}
                                        onSelectionChange={(key) =>
                                            setField("firstAssistantRefereeId", key?.toString() ?? "")
                                        }
                                        defaultItems={refereeOptions}
                                        placeholder="Search first assistant referee"
                                        listboxProps={{
                                            className: "max-h-60 overflow-y-auto",
                                        }}
                                        required
                                    >
                                        {(referee) => (
                                            <AutocompleteItem
                                                key={referee.id.toString()}
                                                textValue={`${referee.name} ${referee.surname}`}
                                            >
                                                {referee.name + " " + referee.surname}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>

                                    <Autocomplete
                                        label="Second Assistant Referee"
                                        variant="bordered"
                                        selectedKey={form.secondAssistantRefereeId || null}
                                        onSelectionChange={(key) =>
                                            setField("secondAssistantRefereeId", key?.toString() ?? "")
                                        }
                                        defaultItems={refereeOptions}
                                        placeholder="Search second assistant referee"
                                        listboxProps={{
                                            className: "max-h-60 overflow-y-auto",
                                        }}
                                        required
                                    >
                                        {(referee) => (
                                            <AutocompleteItem
                                                key={referee.id.toString()}
                                                textValue={`${referee.name} ${referee.surname}`}
                                            >
                                                {referee.name + " " + referee.surname}
                                            </AutocompleteItem>
                                        )}
                                    </Autocomplete>
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
                                    className="font-medium"
                                >
                                    Reset
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
