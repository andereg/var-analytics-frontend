"use client";

import PersonalDataForm from "@/components/taxme/forms/PersonalDataForm";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    const handleContinue = () => {
        // Umami-Event: Funnel-Schritt 1 abgeschlossen
        if (typeof window !== "undefined" && (window as any).umami) {
            (window as any).umami.track("form_step_completed", {
                step: "personal-data",
                step_number: 1,
                total_steps: 7,
            });
        }
        router.push("/taxform/wealth");
    };

    return <PersonalDataForm onContinue={handleContinue} />;
}