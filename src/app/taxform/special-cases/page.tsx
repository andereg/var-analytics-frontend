"use client";

import { useRouter } from "next/navigation";
import SpecialCasesForm from "@/components/taxme/forms/SpecialCasesForm";

export default function Page() {
    const router = useRouter();

    const handleContinue = () => {
        // Umami-Event: Funnel-Schritt 6 abgeschlossen
        if (typeof window !== "undefined" && (window as any).umami) {
            (window as any).umami.track("form_step_completed", {
                step: "special-cases",
                step_number: 6,
                total_steps: 7,
            });
        }
        router.push("/taxform/documents-review");
    };

    return <SpecialCasesForm onContinue={handleContinue} />;
}