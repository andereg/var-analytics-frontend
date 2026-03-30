"use client";

import { useRouter } from "next/navigation";
import SpecialCasesForm from "@/components/taxme/SpecialCasesForm";

export default function Page() {
    const router = useRouter();

    return (
        <SpecialCasesForm
            onContinue={() => router.push("/taxform/documents-review")}
        />
    );
}