"use client";

import { useRouter } from "next/navigation";
import DocumentsReviewForm from "@/components/taxme/DocumentsReviewForm";
import FinalSummaryPage from "@/components/taxme/FinalSummaryPage";

export default function Page() {
    const router = useRouter();

    return (
        <FinalSummaryPage
            onSubmit={() => router.push("/taxform/submission-success")}
        />
    );
}