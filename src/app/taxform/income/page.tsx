"use client";

import { useRouter } from "next/navigation";
import IncomeForm from "@/components/taxme/forms/IncomeForm";

export default function Page() {
    const router = useRouter();

    return (
        <IncomeForm
            onContinue={() => router.push("/taxform/income")}
        />
    );
}