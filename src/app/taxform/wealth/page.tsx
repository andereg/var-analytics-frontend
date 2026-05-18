"use client";

import { useRouter } from "next/navigation";
import WealthForm from "@/components/taxme/forms/WealthForm";

export default function Page() {
    const router = useRouter();

    const handleContinue = () => {
        // Umami-Event: Funnel-Schritt 3 abgeschlossen
        if (typeof window !== "undefined" && (window as any).umami) {
            (window as any).umami.track("form_step_completed", {
                step: "wealth",
                step_number: 3,
                total_steps: 7,
            });
        }
        router.push("/taxform/deductions");
    };

    return <WealthForm onContinue={handleContinue} />;
}