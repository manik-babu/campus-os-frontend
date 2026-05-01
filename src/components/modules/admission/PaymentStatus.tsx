"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    CheckCircle2,
    XCircle,
    Clock,
    Mail,
    FileCheck,
    Home,
    AlertCircle
} from "lucide-react";

export default function PaymentStatus() {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams.toString());
    const router = useRouter();
    const success = params.get("success");
    const [isCleared, setIsCleared] = useState(false);

    useEffect(() => {
        if (success === "true") {
            console.log("Payment was successful!");
            window.localStorage.removeItem("admissionFormData");
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setIsCleared(true);
        } else if (success === "false") {
            console.log("Payment failed or was cancelled.");
        }
    }, [success]);

    const isSuccess = success === "true";

    return (
        <div className="w-full max-w-2xl mx-auto p-4 my-10">
            {isSuccess ? (
                // Success State
                <Card className="border-0 shadow-lg pt-0">
                    <CardHeader className="bg-linear-to-r p-4 from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-b">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
                                    <CardTitle className="text-2xl m-0">Payment Successful</CardTitle>
                                </div>
                                <CardDescription className="text-base">
                                    Your admission fee has been processed successfully
                                </CardDescription>
                            </div>
                            <Badge variant="default" className="ml-4 h-auto px-3 py-1.5">
                                <span>Completed</span>
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-8">
                        {/* Confirmation Message */}
                        <div className="mb-8 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                            <p className="text-green-900 dark:text-green-100 font-semibold mb-2">
                                ✓ Payment Received
                            </p>
                            <p className="text-sm text-green-800 dark:text-green-200">
                                Thank you for completing your payment. Your transaction has been securely processed and recorded in our system.
                            </p>
                        </div>

                        {/* What Happens Next */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">
                                What Happens Next
                            </h3>

                            <div className="space-y-4">
                                {/* Step 1 */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                                            <span className="font-semibold text-blue-600 dark:text-blue-300 text-sm">1</span>
                                        </div>
                                        <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-600 my-2"></div>
                                    </div>
                                    <div className="pb-4">
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">Application Under Review</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Our admissions team will now review your application and submitted documents. This typically takes 2-5 business days.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center flex-shrink-0">
                                            <span className="font-semibold text-purple-600 dark:text-purple-300 text-sm">2</span>
                                        </div>
                                        <div className="w-0.5 h-12 bg-gray-300 dark:bg-gray-600 my-2"></div>
                                    </div>
                                    <div className="pb-4">
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">Verification & Processing</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            Your academic records and qualifications will be verified. We may contact you if additional information is needed.
                                        </p>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center flex-shrink-0">
                                            <span className="font-semibold text-green-600 dark:text-green-300 text-sm">3</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-gray-100">Admission Decision</p>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                            You will receive an email notification with the admission decision and enrollment instructions.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Important Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            {/* Email Notification */}
                            <div className="flex gap-3 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                                <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <p className="font-semibold text-blue-900 dark:text-blue-100 text-sm">Email Notification</p>
                                    <p className="text-xs text-blue-800 dark:text-blue-200 mt-1">
                                        Check your email regularly for updates about your application status.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="flex gap-3 p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                                <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <p className="font-semibold text-orange-900 dark:text-orange-100 text-sm">Expected Timeline</p>
                                    <p className="text-xs text-orange-800 dark:text-orange-200 mt-1">
                                        Admission decision within 5-7 business days.
                                    </p>
                                </div>
                            </div>

                            {/* Documents Ready */}
                            <div className="flex gap-3 p-4 bg-indigo-50 dark:bg-indigo-950 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                                <FileCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <p className="font-semibold text-indigo-900 dark:text-indigo-100 text-sm">Keep Documents Ready</p>
                                    <p className="text-xs text-indigo-800 dark:text-indigo-200 mt-1">
                                        Prepare your original documents for enrollment verification.
                                    </p>
                                </div>
                            </div>

                            {/* Support */}
                            <div className="flex gap-3 p-4 bg-cyan-50 dark:bg-cyan-950 border border-cyan-200 dark:border-cyan-800 rounded-lg">
                                <AlertCircle className="w-5 h-5 text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <p className="font-semibold text-cyan-900 dark:text-cyan-100 text-sm">Need Help?</p>
                                    <p className="text-xs text-cyan-800 dark:text-cyan-200 mt-1">
                                        Contact our admissions office for any queries.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex">
                            <Button
                                onClick={() => router.push("/")}
                                variant="default"
                                size="lg"
                                className="flex-1"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Go to Home
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                // Failure State
                <Card className="border-0 shadow-lg pt-0">
                    <CardHeader className="bg-linear-to-r p-4 from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 border-b">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                                    <CardTitle className="text-2xl m-0">Payment Failed</CardTitle>
                                </div>
                                <CardDescription className="text-base">
                                    We {`couldn't`} process your payment
                                </CardDescription>
                            </div>
                            <Badge variant="destructive" className="ml-4 h-auto px-3 py-1.5">
                                <span>Failed</span>
                            </Badge>
                        </div>
                    </CardHeader>

                    <CardContent className="pt-8">
                        {/* Error Message */}
                        <div className="mb-8 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-red-900 dark:text-red-100 font-semibold mb-2">
                                ✗ Payment Not Completed
                            </p>
                            <p className="text-sm text-red-800 dark:text-red-200">
                                Your payment could not be processed. This might be due to insufficient funds, card issues, or network problems. Please try again or contact your bank for assistance.
                            </p>
                        </div>

                        {/* Common Reasons */}
                        <div className="mb-8">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">
                                Common Reasons for Payment Failure
                            </h3>

                            <ul className="space-y-2">
                                <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">•</span>
                                    Insufficient funds in your account
                                </li>
                                <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">•</span>
                                    Incorrect card or payment details
                                </li>
                                <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">•</span>
                                    Card expired or blocked by your bank
                                </li>
                                <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">•</span>
                                    Network or connectivity issues
                                </li>
                                <li className="flex gap-2 text-sm text-gray-700 dark:text-gray-300">
                                    <span className="text-red-500 font-bold">•</span>
                                    Payment gateway timeout or error
                                </li>
                            </ul>
                        </div>

                        {/* What to Do */}
                        <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <p className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2 flex items-center gap-2">
                                <AlertCircle className="w-5 h-5" />
                                What You Can Do
                            </p>
                            <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1">
                                <li>• Verify your payment information and try again</li>
                                <li>• Contact your bank to check for any card restrictions</li>
                                <li>• Use a different payment method if available</li>
                                <li>• Ensure you have a stable internet connection</li>
                                <li>• Wait a few minutes and retry the payment</li>
                            </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col gap-3">
                            <Button
                                onClick={() => router.push("/admission/payment")}
                                size="lg"
                                className="w-full"
                            >
                                Try Payment Again
                            </Button>
                        </div>

                        {/* Support Info */}
                        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 text-center">
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Still having issues? Contact our support team at{" "}
                                <span className="font-semibold">support@campus.edu</span> or call{" "}
                                <span className="font-semibold">+1-800-CAMPUS-1</span>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}