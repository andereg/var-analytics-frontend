"use client";

import { useRouter } from "next/navigation";
import DocumentsReviewForm from "@/components/taxme/forms/DocumentsReviewForm";
import FinalSummaryForm from "@/components/taxme/forms/FinalSummaryForm";

export default function Page() {
    const router = useRouter();

    const handleSubmit = () => {
        // Umami-Event: Steuererklärung erfolgreich abgeschickt (Conversion-Goal)
        if (typeof window !== "undefined" && (window as any).umami) {
            (window as any).umami.track("form_submitted", {
                form: "taxform",
                path: window.location.pathname,
            });
        }
        router.push("/taxform/submission-success");
    };

    return <FinalSummaryForm onSubmit={handleSubmit} />;
}