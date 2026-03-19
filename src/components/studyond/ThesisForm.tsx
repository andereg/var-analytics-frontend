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
import { getStudentById } from "@/api/mockData";

const degreePrograms = [
    "Computer Science",
    "Software Engineering",
    "Data Science",
    "Information Systems",
    "Business Informatics",
    "Other",
];

const thesisTypes = [
    "Bachelor Thesis",
    "Master Thesis",
    "PhD Thesis",
    "Project Thesis",
    "Research Proposal",
];

const timelines = [
    "As soon as possible",
    "Within 1 month",
    "Within 3 months",
    "Next semester",
    "Flexible",
];

const supervisionAreas = [
    "Artificial Intelligence",
    "Machine Learning",
    "Web Development",
    "Cybersecurity",
    "Databases",
    "Distributed Systems",
    "Mobile Apps",
    "Human-Computer Interaction",
    "Computer Graphics",
    "Networking",
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

const availableObjectives = [
    "topic",
    "career_start",
    "research",
    "internship",
    "networking",
];

const availableFieldIds = [
    "field-01",
    "field-02",
    "field-03",
    "field-04",
    "field-05",
    "field-06",
    "field-07",
    "field-08",
    "field-09",
    "field-10",
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
        objectives: student?.objectives ?? [],
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
        researchInterests: student?.about ?? "",
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

    const handleSingleSelectChange = (
        field: string,
        keys: "all" | Set<React.Key>
    ) => {
        if (keys === "all") return;
        const value = Array.from(keys)[0]?.toString() ?? "";
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleMultiSelectChange = (
        field: string,
        keys: "all" | Set<React.Key>
    ) => {
        if (keys === "all") return;
        setFormData((prev) => ({
            ...prev,
            [field]: Array.from(keys).map(String),
        }));
    };

    const addChip = (
        field: "skillsArray" | "objectives" | "fieldIds",
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
        field: "skillsArray" | "objectives" | "fieldIds",
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
                objectives: formData.objectives,
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
                                            <p className="text-sm font-medium text-default-700">Degree</p>
                                            <p className="text-sm text-default-500">{formData.degree}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-default-700">Study Program</p>
                                            <p className="text-sm text-default-500">{formData.studyProgramId}</p>
                                        </div>

                                        <div className="space-y-1">
                                            <p className="text-sm font-medium text-default-700">University</p>
                                            <p className="text-sm text-default-500">{formData.universityId}</p>
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
                                        <h3 className="text-sm font-semibold text-default-700">Objectives</h3>
                                    </div>
                                    <div className="rounded-2xl shadow-md p-4">
                                        <div className="space-y-3">
                                            <div className="flex flex-wrap gap-2">
                                                {formData.objectives.map((objective) => (
                                                    <Chip
                                                        key={objective}
                                                        variant="bordered"
                                                        size="sm"
                                                        onClose={() => removeChip("objectives", objective)}
                                                    >
                                                        <div className="mx-1">{objective}</div>
                                                    </Chip>
                                                ))}
                                            </div>

                                            <Select
                                                label="Add Objective"
                                                placeholder="Choose an objective"
                                                variant="bordered"
                                                selectedKeys={new Set()}
                                                onSelectionChange={(keys) => {
                                                    if (keys === "all") return;
                                                    const value = Array.from(keys)[0]?.toString();
                                                    if (value) addChip("objectives", value);
                                                }}
                                            >
                                                {availableObjectives
                                                    .filter((objective) => !formData.objectives.includes(objective))
                                                    .map((objective) => (
                                                        <SelectItem key={objective}>{objective}</SelectItem>
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
                                                        <div className="mx-1">{fieldId}</div>
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
                                                        <SelectItem key={fieldId}>{fieldId}</SelectItem>
                                                    ))}
                                            </Select>
                                        </div>
                                    </div>
                                    <Textarea
                                        label="About"
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
                                    <h2 className="text-lg font-semibold">University Information</h2>
                                        <p className="text-sm text-default-500">
                                            Tell us about your degree program and academic context.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Select
                                            label="Degree Program"
                                            placeholder="Select your degree program"
                                            variant="bordered"
                                            isRequired
                                            selectedKeys={
                                                formData.degreeProgram
                                                    ? new Set([formData.degreeProgram])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) =>
                                                handleSingleSelectChange("degreeProgram", keys)
                                            }
                                        >
                                            {degreePrograms.map((program) => (
                                                <SelectItem key={program}>{program}</SelectItem>
                                            ))}
                                        </Select>

                                        <Select
                                            label="Application Type"
                                            placeholder="Select application type"
                                            variant="bordered"
                                            isRequired
                                            selectedKeys={
                                                formData.applicationType
                                                    ? new Set([formData.applicationType])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) =>
                                                handleSingleSelectChange("applicationType", keys)
                                            }
                                        >
                                            {thesisTypes.map((type) => (
                                                <SelectItem key={type}>{type}</SelectItem>
                                            ))}
                                        </Select>

                                        <Input
                                            label="Major / Specialization"
                                            placeholder="e.g. Software Systems"
                                            variant="bordered"
                                            value={formData.major}
                                            onChange={(e) => handleInputChange("major", e.target.value)}
                                        />

                                        <Input
                                            label="Expected Graduation Date"
                                            type="month"
                                            variant="bordered"
                                            value={formData.graduationDate}
                                            onChange={(e) =>
                                                handleInputChange("graduationDate", e.target.value)
                                            }
                                        />
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">Academic Background</h2>
                                        <p className="text-sm text-default-500">
                                            Share relevant courses, grades, and prior experience.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Input
                                            label="Current GPA / Average Grade"
                                            placeholder="e.g. 5.2 / 6.0 or 3.7 / 4.0"
                                            variant="bordered"
                                            value={formData.gpa}
                                            onChange={(e) => handleInputChange("gpa", e.target.value)}
                                        />

                                        <Select
                                            label="Preferred Start Timeline"
                                            placeholder="Select a timeline"
                                            variant="bordered"
                                            selectedKeys={
                                                formData.timeline
                                                    ? new Set([formData.timeline])
                                                    : new Set()
                                            }
                                            onSelectionChange={(keys) =>
                                                handleSingleSelectChange("timeline", keys)
                                            }
                                        >
                                            {timelines.map((timeline) => (
                                                <SelectItem key={timeline}>{timeline}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    <Textarea
                                        label="Relevant Courses"
                                        placeholder="List courses related to your intended thesis area"
                                        variant="bordered"
                                        minRows={3}
                                        value={formData.relevantCourses}
                                        onChange={(e) =>
                                            handleInputChange("relevantCourses", e.target.value)
                                        }
                                    />

                                    <Textarea
                                        label="Technical Skills"
                                        placeholder="e.g. Java, Python, React, SQL, data analysis, machine learning"
                                        variant="bordered"
                                        minRows={3}
                                        value={formData.technicalSkills}
                                        onChange={(e) =>
                                            handleInputChange("technicalSkills", e.target.value)
                                        }
                                    />

                                    <Textarea
                                        label="Previous Projects or Research Experience"
                                        placeholder="Describe academic, industry, or personal projects relevant to your thesis"
                                        variant="bordered"
                                        minRows={4}
                                        value={formData.previousProjects}
                                        onChange={(e) =>
                                            handleInputChange("previousProjects", e.target.value)
                                        }
                                    />
                                </section>

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">Thesis Interests</h2>
                                        <p className="text-sm text-default-500">
                                            Describe the topics and research areas you are most interested in.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        <Select
                                            label="Preferred Research Area"
                                            placeholder="Choose an area"
                                            variant="bordered"
                                            selectionMode="multiple"
                                            className="md:col-span-2"
                                            selectedKeys={new Set(formData.researchAreas)}
                                            onSelectionChange={(keys) =>
                                                handleMultiSelectChange("researchAreas", keys)
                                            }
                                        >
                                            {supervisionAreas.map((area) => (
                                                <SelectItem key={area}>{area}</SelectItem>
                                            ))}
                                        </Select>
                                    </div>

                                    <Textarea
                                        label="Research Interests"
                                        placeholder="Explain what topics interest you and why"
                                        variant="bordered"
                                        minRows={4}
                                        isRequired
                                        value={formData.researchInterests}
                                        onChange={(e) =>
                                            handleInputChange("researchInterests", e.target.value)
                                        }
                                    />

                                    <Textarea
                                        label="Possible Thesis Ideas"
                                        placeholder="Optional: propose one or more thesis ideas or problem statements"
                                        variant="bordered"
                                        minRows={4}
                                        value={formData.thesisIdeas}
                                        onChange={(e) =>
                                            handleInputChange("thesisIdeas", e.target.value)
                                        }
                                    />

                                    <Textarea
                                        label="Preferred Supervisor / Chair"
                                        placeholder="Optional: mention a preferred professor, research group, or lab"
                                        variant="bordered"
                                        minRows={2}
                                        value={formData.preferredSupervisor}
                                        onChange={(e) =>
                                            handleInputChange("preferredSupervisor", e.target.value)
                                        }
                                    />
                                </section>

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-sm font-semibold">Required Documents</h2>
                                        <p className="text-sm text-default-500">
                                            Upload your academic documents and supporting files.
                                        </p>
                                    </div>

                                    <div className="rounded-3xl border border-default-200 bg-background p-4 shadow-sm">
                                        <TorUpload />
                                    </div>
                                </section>

                                <Divider />

                                <section className="space-y-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">Availability & Notes</h2>
                                        <p className="text-sm text-default-500">
                                            Add any constraints or additional details.
                                        </p>
                                    </div>

                                    <Textarea
                                        label="Availability / Constraints"
                                        placeholder="Mention internship plans, part-time work, exchange semester, or deadlines"
                                        variant="bordered"
                                        minRows={3}
                                        value={formData.availability}
                                        onChange={(e) =>
                                            handleInputChange("availability", e.target.value)
                                        }
                                    />

                                    <Textarea
                                        label="Additional Notes"
                                        placeholder="Anything else the supervisor should know"
                                        variant="bordered"
                                        minRows={3}
                                        value={formData.additionalNotes}
                                        onChange={(e) =>
                                            handleInputChange("additionalNotes", e.target.value)
                                        }
                                    />
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