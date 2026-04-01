"use client";

import { useRouter } from "next/navigation";
import DocumentsReviewForm from "@/components/taxme/forms/DocumentsReviewForm";

export default function Page() {
    const router = useRouter();

    return (
        <DocumentsReviewForm
            onContinue={() => router.push("/taxform/final-summary")}
        />
    );
}