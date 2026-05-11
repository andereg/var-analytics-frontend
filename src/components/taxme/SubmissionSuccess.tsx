"use client";

import React, {useEffect} from "react";
import { Card, CardBody, CardHeader, Button } from "@heroui/react";
import { CheckCircle2, Printer, FileText } from "lucide-react";

type SubmissionSuccessProps = {
    onPrint?: () => void;
};

export default function SubmissionSuccess({ onPrint }: SubmissionSuccessProps) {
    setTimeout(() => {
        if (window.umami) {
            window.umami.track('form_submission', {
                article_id: data.ref,
                article_title: data.title,
            });
        }
    }, 2000);


    const handlePrint = () => {
        if (onPrint) {
            onPrint();
            return;
        }

        window.print();
    };

    return (
        <div className="min-h-screen animate-in fade-in slide-in-from-bottom-4 px-4 py-4 duration-700 md:px-8">
            <div className="mx-auto max-w-4xl">
                <Card className="rounded-3xl border border-default-200 shadow-lg">
                    <CardHeader className="flex flex-col items-start gap-3 px-6 py-6 md:px-8">
                        <div className="flex items-start gap-3">
                            <div className="rounded-2xl bg-success/10 p-2 text-success">
                                <CheckCircle2 className="h-6 w-6" />
                            </div>

                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tight">
                                    Vielen Dank
                                </h1>

                                <p className="max-w-3xl text-sm text-default-500">
                                    Ihre Angaben wurden erfolgreich an die Steuerbehörde des
                                    Kantons Alpengrün übermittelt.
                                </p>
                            </div>
                        </div>
                    </CardHeader>

                    <CardBody className="space-y-6 px-6 pb-8 pt-2 md:px-8">
                        <section className="rounded-3xl border border-success/20 bg-success/5 p-5">
                            <div className="space-y-3">
                                <h2 className="text-md font-semibold">
                                    Übermittlung erfolgreich
                                </h2>

                                <p className="text-sm leading-6 text-default-600">
                                    Ihre Angaben wurden erfolgreich an die Steuerbehörde des
                                    Kantons Alpengrün übermittelt.
                                </p>

                                <p className="text-sm leading-6 text-default-600">
                                    Bitte bewahren Sie Ihre Belege und Nachweise auf. Falls
                                    weitere Informationen benötigt werden, wird sich die Behörde
                                    bei Ihnen melden.
                                </p>
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                                    <FileText className="h-5 w-5" />
                                </div>

                                <div>
                                    <h2 className="text-md font-semibold">Nächste Schritte</h2>
                                    <p className="text-sm text-default-500">
                                        So geht es nach der Übermittlung Ihrer Steuerdaten weiter.
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                <div className="rounded-2xl border border-default-200 p-4">
                                    <p className="text-sm text-default-700">
                                        • Ihre Steuererklärung wird geprüft
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-default-200 p-4">
                                    <p className="text-sm text-default-700">
                                        • Sie erhalten ggf. Rückfragen oder eine Bestätigung
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-default-200 p-4">
                                    <p className="text-sm text-default-700">
                                        • Bewahren Sie alle Unterlagen sicher auf
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="rounded-3xl  p-5">
                            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <Button
                                    color="primary"
                                    size="lg"
                                    startContent={<Printer className="h-4 w-4" />}
                                    onPress={handlePrint}
                                >
                                    Bestätigung drucken
                                </Button>
                            </div>
                        </section>
                    </CardBody>
                </Card>
            </div>
        </div>
    );
}