"use client";

import { useRouter } from "next/navigation";
import WealthForm from "@/components/taxme/forms/WealthForm";

export default function Page() {
    const router = useRouter();

    return (
        <WealthForm
            onContinue={() => router.push("/taxform/deductions")}
        />
    );
}