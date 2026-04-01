"use client";

import { useRouter } from "next/navigation";
import DocumentsReviewForm from "@/components/taxme/forms/DocumentsReviewForm";
import FinalSummaryForm from "@/components/taxme/forms/FinalSummaryForm";

export default function Page() {
    const router = useRouter();

    return (
        <FinalSummaryForm
            onSubmit={() => router.push("/taxform/submission-success")}
        />
    );
}