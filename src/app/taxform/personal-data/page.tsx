"use client";

import PersonalDataForm from "@/components/taxme/PersonalDataForm";
import { useRouter } from "next/navigation";

export default function Page() {
    const router = useRouter();

    return (
        <PersonalDataForm
            onContinue={() => router.push("/taxform/wealth")}
        />
    );
}