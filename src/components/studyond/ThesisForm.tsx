import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Input,
    Textarea,
    Select,
    SelectItem,
    Checkbox,
    Button,
    Divider,
} from "@heroui/react";

const degreePrograms = [
    "Computer Science",
    "Software Engineering",
    "Data Science",
    "Information Systems",
    "Business Informatics",
    "Other",
];

const thesisTypes = ["Bachelor Thesis", "Master Thesis", "PhD Thesis", "Project Thesis", "Research Proposal"];

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

export default function ThesisForm() {
    return (
        <div className="min-h-screen px-4 py-8 md:px-8">
            <div className="mx-auto max-w-5xl">
                <Card className="rounded-3xl border border-default-200 shadow-lg">
                    <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                        <div className="space-y-1">
                            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
                                Thesis Startform
                            </h1>
                            <p className="max-w-3xl text-sm text-default-500 md:text-base">
                                Fill out this form if you are interested in writing your thesis. Please provide your academic background, topic interests,
                                and upload the required supporting documents.
                            </p>
                        </div>
                    </CardHeader>

                    <CardBody className="px-6 pb-8 pt-2 md:px-8">
                        <form className="space-y-8">
                            <section className="space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold">Student Information</h2>
                                    <p className="text-sm text-default-500">
                                        Basic personal and contact details.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Input label="First Name" placeholder="Enter your first name" variant="bordered" isRequired />
                                    <Input label="Last Name" placeholder="Enter your last name" variant="bordered" isRequired />
                                    <Input label="University Email" type="email" placeholder="name@university.edu" variant="bordered" isRequired />
                                    <Input label="Student ID" placeholder="e.g. 20234567" variant="bordered" isRequired />
                                    <Input label="Phone Number" placeholder="Optional" variant="bordered" />
                                    <Input label="Current Semester" type="number" placeholder="e.g. 6" variant="bordered" />
                                </div>
                            </section>

                            <Divider />

                            <section className="space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold">University Information</h2>
                                    <p className="text-sm text-default-500">
                                        Tell us about your degree program and academic context.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Input label="University" placeholder="e.g. University of Zurich" variant="bordered" isRequired />
                                    <Input label="Faculty / Department" placeholder="e.g. Department of Informatics" variant="bordered" isRequired />

                                    <Select label="Degree Program" placeholder="Select your degree program" variant="bordered" isRequired>
                                        {degreePrograms.map((program) => (
                                            <SelectItem key={program}>{program}</SelectItem>
                                        ))}
                                    </Select>

                                    <Select label="Application Type" placeholder="Select application type" variant="bordered" isRequired>
                                        {thesisTypes.map((type) => (
                                            <SelectItem key={type}>{type}</SelectItem>
                                        ))}
                                    </Select>

                                    <Input label="Major / Specialization" placeholder="e.g. Software Systems" variant="bordered" />
                                    <Input label="Expected Graduation Date" type="month" variant="bordered" />
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
                                    <Input label="Current GPA / Average Grade" placeholder="e.g. 5.2 / 6.0 or 3.7 / 4.0" variant="bordered" />
                                    <Select label="Preferred Start Timeline" placeholder="Select a timeline" variant="bordered">
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
                                />

                                <Textarea
                                    label="Technical Skills"
                                    placeholder="e.g. Java, Python, React, SQL, data analysis, machine learning"
                                    variant="bordered"
                                    minRows={3}
                                />

                                <Textarea
                                    label="Previous Projects or Research Experience"
                                    placeholder="Describe academic, industry, or personal projects relevant to your thesis"
                                    variant="bordered"
                                    minRows={4}
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
                                />

                                <Textarea
                                    label="Possible Thesis Ideas"
                                    placeholder="Optional: propose one or more thesis ideas or problem statements"
                                    variant="bordered"
                                    minRows={4}
                                />

                                <Textarea
                                    label="Preferred Supervisor / Chair"
                                    placeholder="Optional: mention a preferred professor, research group, or lab"
                                    variant="bordered"
                                    minRows={2}
                                />
                            </section>

                            <Divider />

                            <section className="space-y-4">
                                <div>
                                    <h2 className="text-lg font-semibold">Required Documents</h2>
                                    <p className="text-sm text-default-500">
                                        Upload your academic documents and supporting files.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <Input
                                        label="Transcript of Records"
                                        type="file"
                                        variant="bordered"
                                        description="Upload PDF of your transcript"
                                        accept=".pdf"
                                        isRequired
                                    />

                                    <Input
                                        label="CV / Resume"
                                        type="file"
                                        variant="bordered"
                                        description="Upload your current CV in PDF format"
                                        accept=".pdf"
                                    />

                                    <Input
                                        label="Motivation Letter"
                                        type="file"
                                        variant="bordered"
                                        description="Optional PDF upload"
                                        accept=".pdf"
                                    />

                                    <Input
                                        label="Additional Supporting Documents"
                                        type="file"
                                        variant="bordered"
                                        description="Optional: certificates, project reports, portfolio"
                                        accept=".pdf,.doc,.docx"
                                    />
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
                                />

                                <Textarea
                                    label="Additional Notes"
                                    placeholder="Anything else the supervisor should know"
                                    variant="bordered"
                                    minRows={3}
                                />
                            </section>

                            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
                                <Button variant="flat" size="lg">
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
    );
}
