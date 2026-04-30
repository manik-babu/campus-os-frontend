"use client";

import { IAdmissionFormResponse } from "@/@types/admission";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { admissionPayment } from "@/services/public.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { CheckCircle2, Clock, AlertCircle, User, Mail, Building2, BookOpen, DollarSign } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function AdmissionPayment() {
    const [data, setData] = useState<IAdmissionFormResponse | null>(null);
    const [loading, setLoading] = useState(false)

    const getData = () => {
        const data = window.localStorage.getItem("admissionFormData");
        const parsedData = data ? JSON.parse(data) : null;
        if (data) {
            setData(parsedData);
        }
    }

    const handlePayment = async () => {
        setLoading(true)
        try {
            const res = await admissionPayment(1000, data?.id || "");
            if (res.ok && res.data) {
                window.location.href = res.data.url;
            } else {
                toast.error("Failed to create payment session");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Payment failed");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getData();
    }, []);
    if (!data) {
        return (
            <div className="w-full max-w-2xl mx-auto py-10">
                <Card className="border-0 shadow-lg pt-0">
                    <CardContent className="pt-8">
                        <div className="p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg flex gap-3">
                            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                                    No Admission Data
                                </p>
                                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                                    We {`couldn't`} find your admission data. Please submit the admission form first to proceed with the payment.
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto py-10">
            <Card className="border-0 shadow-lg pt-0">
                <CardHeader className="bg-linear-to-r p-4 from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border-b">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <CardTitle className="text-2xl mb-2">Admission Fee Payment</CardTitle>
                            <CardDescription className="text-base">
                                Complete your admission process by paying the required fee to secure your enrollment
                            </CardDescription>
                        </div>
                        <Badge
                            variant={data?.isPaidFee ? "default" : "destructive"}
                            className="ml-4 h-auto px-3 py-1.5"
                        >
                            <div className="flex items-center gap-1.5">
                                {data?.isPaidFee ? (
                                    <>
                                        <CheckCircle2 className="w-4 h-4" />
                                        <span>Paid</span>
                                    </>
                                ) : (
                                    <>
                                        <Clock className="w-4 h-4" />
                                        <span>Pending</span>
                                    </>
                                )}
                            </div>
                        </Badge>
                    </div>
                </CardHeader>

                <CardContent className="pt-8">
                    {/* Alert Message */}
                    <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg flex gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                        <div>
                            <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                Payment Required
                            </p>
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                To finalize your admission to our institution, please complete the payment of your admission fee. This payment confirms your enrollment and grants you access to all campus facilities and resources. Your application will be processed only after successful payment verification.
                            </p>
                        </div>
                    </div>

                    {/* Applicant Information */}
                    <div className="space-y-4 mb-8">
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Applicant Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Name */}
                            <div className="flex items-start gap-3">
                                <User className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</p>
                                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {data?.name || "—"}
                                    </p>
                                </div>
                            </div>

                            {/* Email */}
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</p>
                                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {data?.email || "—"}
                                    </p>
                                </div>
                            </div>

                            {/* Department */}
                            <div className="flex items-start gap-3">
                                <Building2 className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Department</p>
                                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {data?.department || "—"}
                                    </p>
                                </div>
                            </div>

                            {/* Program */}
                            <div className="flex items-start gap-3">
                                <BookOpen className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Program</p>
                                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                                        {data?.program || "—"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Fee Information */}
                    <div className="bg-linear-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border border-green-200 dark:border-green-800 mb-8">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                                <div>
                                    <p className="text-sm font-medium text-green-700 dark:text-green-300">Admission Fee</p>
                                    <p className="text-xs text-green-600 dark:text-green-400">One-time payment</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-3xl font-bold text-green-700 dark:text-green-300">
                                    ${data?.fee?.toFixed(2) || "0.00"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Action Button */}
                    {!data?.isPaidFee && (
                        <Button
                            onClick={handlePayment}
                            disabled={loading || !data}
                            size="lg"
                            className="w-full h-12 text-base font-semibold"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Spinner />
                                    Processing Payment...
                                </span>
                            ) : (
                                "Proceed to Payment"
                            )}
                        </Button>
                    )}

                    {data?.isPaidFee && (
                        <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800 flex items-center gap-3">
                            <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 flex-shrink-0" />
                            <div>
                                <p className="font-semibold text-green-900 dark:text-green-100">Payment Completed</p>
                                <p className="text-sm text-green-800 dark:text-green-200">Your admission fee has been received. Thank you for your enrollment!</p>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}