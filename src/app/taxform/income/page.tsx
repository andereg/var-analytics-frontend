"use client";

import { useRouter } from "next/navigation";
import IncomeForm from "@/components/taxme/forms/IncomeForm";

export default function Page() {
    const router = useRouter();

    const handleContinue = () => {
        // Umami-Event: Funnel-Schritt 2 abgeschlossen
        if (typeof window !== "undefined" && (window as any).umami) {
            (window as any).umami.track("form_step_completed", {
                step: "income",
                step_number: 2,
                total_steps: 7,
            });
        }
        router.push("/taxform/income");
    };

    return <IncomeForm onContinue={handleContinue} />;
}