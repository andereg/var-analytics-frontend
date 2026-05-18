"use client";

import { useRouter } from "next/navigation";
import DocumentsReviewForm from "@/components/taxme/forms/DocumentsReviewForm";

export default function Page() {
    const router = useRouter();

    const handleContinue = () => {
        // Umami-Event: Funnel-Schritt 5 abgeschlossen
        if (typeof window !== "undefined" && (window as any).umami) {
            (window as any).umami.track("form_step_completed", {
                step: "documents-review",
                step_number: 5,
                total_steps: 7,
            });
        }
        router.push("/taxform/final-summary");
    };

    return <DocumentsReviewForm onContinue={handleContinue} />;
}