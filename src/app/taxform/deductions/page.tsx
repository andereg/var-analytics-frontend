"use client";

import { useRouter } from "next/navigation";
import DeductionsForm from "@/components/taxme/forms/DeductionsForm";

export default function Page() {
    const router = useRouter();

    const handleContinue = () => {
        // Umami-Event: Funnel-Schritt 4 abgeschlossen
        if (typeof window !== "undefined" && (window as any).umami) {
            (window as any).umami.track("form_step_completed", {
                step: "deductions",
                step_number: 4,
                total_steps: 7,
            });
        }
        router.push("/taxform/special-cases");
    };

    return <DeductionsForm onContinue={handleContinue} />;
}