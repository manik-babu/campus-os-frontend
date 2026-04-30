"use client";

import { CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PaymentStatusCardProps {
    isSuccess: boolean;
    transactionId?: string;
}

export default function PaymentStatusCard({ isSuccess, transactionId }: PaymentStatusCardProps) {
    return (
        <div className="w-full max-w-md">
            <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md overflow-hidden">
                {/* Status Bar */}
                <div
                    className={`h-1 w-full ${isSuccess ? "bg-emerald-500" : "bg-amber-500"
                        }`}
                />

                {/* Content */}
                <div className="p-6 sm:p-8">
                    {/* Icon */}
                    <div className="mb-4 flex justify-center">
                        {isSuccess ? (
                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        ) : (
                            <AlertCircle className="w-12 h-12 text-amber-500" />
                        )}
                    </div>

                    {/* Title */}
                    <h2
                        className={`text-2xl font-bold text-center mb-2 ${isSuccess
                            ? "text-emerald-900 dark:text-emerald-100"
                            : "text-amber-900 dark:text-amber-100"
                            }`}
                    >
                        {isSuccess ? "Payment Successful" : "Payment Failed"}
                    </h2>

                    {/* Description */}
                    <p className="text-center text-slate-600 dark:text-slate-400 text-sm mb-6">
                        {isSuccess ? (
                            "Your payment has been processed successfully. A confirmation email has been sent to you."
                        ) : (
                            "Your payment could not be completed. Please try again or contact support."
                        )}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col gap-2">
                        <Link href="/student/payments" className="w-full">
                            <Button className="w-full" variant="default" size="sm">
                                Payment History
                            </Button>
                        </Link>

                        {!isSuccess && (
                            <Link href="/student/payments" className="w-full">
                                <Button className="w-full" variant="outline" size="sm">
                                    Try Again
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
