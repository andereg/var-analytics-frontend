"use client";

import { useRouter } from "next/navigation";
import DeductionsForm from "@/components/taxme/DeductionsForm";

export default function Page() {
    const router = useRouter();

    return (
        <DeductionsForm
            onContinue={() => router.push("/taxform/special-cases")}
        />
    );
}