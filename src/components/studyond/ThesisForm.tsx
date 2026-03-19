import React, { useMemo, useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Textarea,
    Select,
    SelectItem,
    Button,
    Divider,
    Chip,
} from "@heroui/react";
import ProgressModal from "@/components/charts/ProgressModal";
import TorUpload from "@/components/meta/TorUpload";
import { getStudentById, getAllFields, getAllUniversities, getAllStudyPrograms } from "@/api/mockData";
import { StudentObjective } from "@/types/studyond";
import { Github, Linkedin } from "lucide-react";

const degreePrograms = [
    "Computer Science",
    "Software Engineering",
    "Data Science",
    "Information Systems",
    "Business Informatics",
    "Other",
];

const availableSkills = [
    "Python",
    "Java",
    "TypeScript",
    "React",
    "SQL",
    "machine learning",
    "distributed systems",
    "Kubernetes",
    "Docker",
    "data analysis",
    "cloud computing",
];



const degreeMap: Record<string, string> = {
    bsc: "Bachelor Thesis",
    msc: "Master Thesis",
    phd: "PhD Thesis",
};

const studyProgramMap: Record<string, string> = {
    "program-01": "Computer Science",
    "program-02": "Software Engineering",
    "program-03": "Data Science",
    "program-04": "Information Systems",
    "program-05": "Business Informatics",
};

const fieldMap: Record<string, string> = {
    "field-01": "Artificial Intelligence",
    "field-02": "Web Development",
    "field-03": "Machine Learning",
    "field-04": "Cybersecurity",
    "field-05": "Databases",
    "field-06": "Distributed Systems",
    "field-07": "Mobile Apps",
    "field-08": "Human-Computer Interaction",
    "field-09": "Computer Graphics",
    "field-10": "Networking",
};

export default function ThesisForm() {
    const progress = 72;
    const student = getStudentById("student-01");

    const allFields = getAllFields();

    const fieldMap = Object.fromEntries(
        allFields.map((f) => [f.id, f])
    );
    const availableFieldIds = allFields.map((f) => f.id);

    const allUniversities = getAllUniversities();

    const universityMap = Object.fromEntries(
        allUniversities.map((u) => [u.id, u])
    );

    const allStudyPrograms = getAllStudyPrograms();

    const studyProgramMap = Object.fromEntries(
        allStudyPrograms.map((sp) => [sp.id, sp])
    );

    const initialResearchAreas = useMemo(
        () =>
            (student?.fieldIds ?? [])
                .map((id: string) => fieldMap[id])
                .filter(Boolean),
        [student]
    );

    const [formData, setFormData] = useState({
        studentId: student?.id ?? "",
        firstName: student?.firstName ?? "",
        lastName: student?.lastName ?? "",
        email: student?.email ?? "",
        degree: student?.degree ?? "",
        studyProgramId: student?.studyProgramId ?? "",
        universityId: student?.universityId ?? "",
        skillsArray: student?.skills ?? [],
        about: student?.about ?? "",
        fieldIds: student?.fieldIds ?? [],

        degreeProgram:
            studyProgramMap[student?.studyProgramId as string] ?? "Computer Science",
        applicationType: degreeMap[student?.degree as string] ?? "Master Thesis",
        major: "",
        graduationDate: "",
        gpa: "",
        timeline: "",
        relevantCourses: "",
        technicalSkills: (student?.skills ?? []).join(", "),
        previousProjects: "",
        researchAreas: initialResearchAreas,
        researchInterests: "",
        thesisIdeas: "",
        preferredSupervisor: "",
        availability: "",
        additionalNotes: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const addChip = (
        field: "skillsArray" | "fieldIds",
        value: string
    ) => {
        if (!value) return;

        setFormData((prev) => {
            const current = prev[field] as string[];
            if (current.includes(value)) return prev;

            return {
                ...prev,
                [field]: [...current, value],
            };
        });
    };

    const removeChip = (
        field: "skillsArray" | "fieldIds",
        value: string
    ) => {
        setFormData((prev) => ({
            ...prev,
            [field]: (prev[field] as string[]).filter((item) => item !== value),
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            student: {
                id: formData.studentId,
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                degree: formData.degree,
                studyProgramId: formData.studyProgramId,
                universityId: formData.universityId,
                skills: formData.skillsArray,
                about: formData.about,
                fieldIds: formData.fieldIds,
            },
            thesisApplication: {
                degreeProgram: formData.degreeProgram,
                applicationType: formData.applicationType,
                major: formData.major,
                graduationDate: formData.graduationDate,
                gpa: formData.gpa,
                timeline: formData.timeline,
                relevantCourses: formData.relevantCourses,
                technicalSkills: formData.technicalSkills,
                previousProjects: formData.previousProjects,
                researchAreas: formData.researchAreas,
                researchInterests: formData.researchInterests,
                thesisIdeas: formData.thesisIdeas,
                preferredSupervisor: formData.preferredSupervisor,
                availability: formData.availability,
                additionalNotes: formData.additionalNotes,
            },
        };

        console.log("submitted payload", payload);
    };

    return (
        <div>
            <ProgressModal progress={progress} />

            <div className="min-h-screen px-4 py-8 md:px-8">
                <div className="mx-auto max-w-5xl">
                    <Card className="rounded-3xl border border-default-200 shadow-lg">
                        <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                            <div className="space-y-1">
                                <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                    Thesis Startform
                                </h1>
                                <p className="max-w-3xl text-sm text-default-500 md:text-base">
                                    Fill out this form if you are interested in writing your thesis.
                                    Please provide your academic background, topic interests,
                                    and upload the required supporting documents.
                                </p>
                            </div>
                        </CardHeader>

                        <CardBody className="px-6 pb-8 pt-2 md:px-8">
                            <form className="space-y-8" onSubmit={handleSubmit}>
                                <section className="space-y-4">
                                    <div>
                                        <h3 className="text-lg font-semibold">Student Profile</h3>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-default-700">Email</p>
                                            <p className="text-sm text-default-500">{formData.email}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-default-700">First Name</p>
                                            <p className="text-sm text-default-500">{formData.firstName}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-default-700">Last Name</p>
                                            <p className="text-sm text-default-500">{formData.lastName}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-default-700">Study Program</p>
                                            <p className="text-sm text-default-500">
                                                {studyProgramMap[formData.studyProgramId]?.name || formData.studyProgramId}
                                            </p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-default-700">University</p>
                                            <p className="text-sm text-default-500">
                                                {universityMap[formData.universityId]?.name || formData.universityId}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-2 mb-1">
                                        <h3 className="text-sm font-semibold text-default-700">Skills</h3>
                                    </div>
                                    <div className="rounded-2xl shadow-md p-4">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap gap-2">
                                                {formData.skillsArray.map((skill) => (
                                                    <Chip
                                                        key={skill}
                                                        variant="bordered"
                                                        size="sm"
                                                        onClose={() => removeChip("skillsArray", skill)}
                                                    >
                                                        <div className="mx-1">
                                                            {skill}
                                                        </div>
                                                    </Chip>
                                                ))}
                                            </div>

                                            <Select
                                                label="Add Skill"
                                                placeholder="Choose a skill"
                                                variant="bordered"
                                                selectedKeys={new Set()}
                                                onSelectionChange={(keys) => {
                                                    if (keys === "all") return;
                                                    const value = Array.from(keys)[0]?.toString();
                                                    if (value) addChip("skillsArray", value);
                                                }}
                                            >
                                                {availableSkills
                                                    .filter((skill) => !formData.skillsArray.includes(skill))
                                                    .map((skill) => (
                                                        <SelectItem key={skill}>{skill}</SelectItem>
                                                    ))}
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="mt-2 mb-1">
                                        <h3 className="text-sm font-semibold text-default-700">Fields</h3>
                                    </div>
                                    <div className="rounded-2xl shadow-md p-4">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap gap-2">
                                                {formData.fieldIds.map((fieldId) => (
                                                    <Chip
                                                        key={fieldId}
                                                        variant="bordered"
                                                        size="sm"
                                                        onClose={() => removeChip("fieldIds", fieldId)}
                                                    >
                                                        <div className="mx-1">
                                                            {fieldMap[fieldId]?.name || fieldId}
                                                        </div>
                                                    </Chip>
                                                ))}
                                            </div>

                                            <Select
                                                label="Add Field"
                                                placeholder="Choose a field"
                                                variant="bordered"
                                                selectedKeys={new Set()}
                                                onSelectionChange={(keys) => {
                                                    if (keys === "all") return;
                                                    const value = Array.from(keys)[0]?.toString();
                                                    if (value) addChip("fieldIds", value);
                                                }}
                                            >
                                                {availableFieldIds
                                                    .filter((fieldId) => !formData.fieldIds.includes(fieldId))
                                                    .map((fieldId) => (
                                                        <SelectItem key={fieldId}>
                                                            {fieldMap[fieldId]?.name || fieldId}
                                                        </SelectItem>
                                                    ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <Textarea
                                        label="Tell us about you"
                                        placeholder="Student description / background"
                                        variant="bordered"
                                        minRows={4}
                                        value={formData.about}
                                        onChange={(e) => handleInputChange("about", e.target.value)}
                                    />
                                </section>

                                <Divider/>

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-sm font-semibold">Required Documents</h2>
                                        <p className="text-sm text-default-500">
                                            Upload your Transcript of Records (TOR).
                                        </p>
                                    </div>

                                    <div className="rounded-3xl border border-default-200 bg-background p-4 shadow-sm">
                                        <TorUpload/>
                                    </div>
                                </section>

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-sm font-semibold">Professional Profiles</h2>
                                        <p className="text-sm text-default-500">
                                            Share your GitHub and LinkedIn profiles to showcase your work and
                                            experience.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                                        {/* GitHub */}
                                        <div
                                            className="flex items-center gap-2 rounded-xl border border-default-200 px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                                            <Github className="w-4 h-4 text-default-500"/>
                                            <input
                                                type="url"
                                                placeholder="github.com/username"
                                                className="w-full bg-transparent text-sm outline-none"
                                            />
                                        </div>

                                        {/* LinkedIn */}
                                        <div
                                            className="flex items-center gap-2 rounded-xl border border-default-200 px-3 py-2 focus-within:ring-2 focus-within:ring-primary">
                                            <Linkedin className="w-4 h-4 text-default-500"/>
                                            <input
                                                type="url"
                                                placeholder="linkedin.com/in/profile"
                                                className="w-full bg-transparent text-sm outline-none"
                                            />
                                        </div>
                                    </div>
                                </section>

                                <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                                    <Button variant="flat" size="lg" type="button">
                                        Save Draft
                                    </Button>
                                    <Button color="primary" size="lg" type="submit">
                                        Continue
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