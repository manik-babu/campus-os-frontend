"use client";

import { useSearchParams } from "next/navigation";
import PaymentStatusCard from "@/components/modules/PaymentStatusCard";

export default function Status() {
    const searchParams = useSearchParams();
    const isSuccess = searchParams.get("success") === "true";

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
            <PaymentStatusCard isSuccess={isSuccess} transactionId="TXN-202604-30001" />
        </div>
    );
}