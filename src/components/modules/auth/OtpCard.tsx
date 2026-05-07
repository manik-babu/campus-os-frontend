import { AlertCircleIcon, RefreshCwIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import bcrypt from "bcryptjs";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useEffect, useState } from "react"
import { logout, resetPassword, sendOtp } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Alert, AlertTitle } from "@/components/ui/alert"
import LoadingButton from "@/components/ui/loadingButton";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";

export function InputOTPForm({ res: initialRes, time }: {
    res: {
        hashedOtp: string;
        email: string;
    };
    time: Date; // in seconds
}) {
    const [otp, setOtp] = useState<string>("");
    const [res, setRes] = useState<{
        hashedOtp: string;
        email: string;
    }>(initialRes);
    const router = useRouter();

    const [formError, setFormError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [attemptLeft, setAttemptLeft] = useState(3);
    const [sendingTime, setSendingTime] = useState<Date>(time); // 2 minutes in seconds
    const [isMatched, setIsMatched] = useState(false);
    const [newPassword, setNewPassword] = useState("");
    const [resetting, setResetting] = useState(false);

    const handleSendOtp = async () => {
        setLoading(true);
        try {
            const response = await sendOtp({ email: res.email });
            if (response.ok && response.data) {
                setRes(response.data as { hashedOtp: string; email: string });
                setFormError(null);
                setAttemptLeft(3);
                setSendingTime(new Date());
                setOtp("");
                toast.success("OTP sent successfully");
            }
            else {
                setFormError(response.message || "Failed to send OTP");
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setFormError(error.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    }
    const handleVerifyOtp = () => {
        if (attemptLeft === 0) {
            setFormError("No attempts left. Please request a new OTP.");
            return;
        }
        const current_time = new Date().getTime();
        const sending_time = sendingTime.getTime();
        if ((current_time - sending_time) > 5 * 60 * 1000) {
            setFormError("OTP expired. Please request a new OTP.");
            return;
        }
        try {
            const isMatch = bcrypt.compareSync(otp, res.hashedOtp);
            if (isMatch) {
                setIsMatched(true);
                // Handle successful OTP verification
            } else {
                toast.error("Invalid OTP. Please try again.");
                setAttemptLeft(prev => prev - 1);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setFormError(error.message || "Failed to verify OTP");
        }
    }
    const handleResetPassword = async () => {
        if (!newPassword || newPassword.length < 8) {
            setFormError("Password must be at least 8 characters long");
            return;
        }
        setResetting(true);
        try {
            const response = await resetPassword({
                email: res.email,
                newPassword,
            })
            if (response.ok) {
                toast.success("Password reset successfully. Please login with your new password.");
                await logout();
                router.push("/erp-login");
            }
            else {
                setFormError(response.message || "Failed to reset password");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setFormError(error.message || "Failed to reset password");
        }
        finally {
            setResetting(false);
        }
    }
    if (isMatched) {
        return (
            <div className={cn("flex flex-col gap-6")}>
                <Card className="py-14 px-4">
                    <CardHeader>
                        <h2 className="w-full text-center font-fancy">Email verified</h2>
                        <CardDescription className="text-center">
                            Create a new password for your account.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor={"password"}>New Password</FieldLabel>
                                <div className="relative flex items-center">
                                    <Input
                                        id={"password"}
                                        placeholder="Create a new password"
                                        type="text"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                </div>
                            </Field>
                        </FieldGroup>
                        {formError && (
                            <Alert variant="destructive" className="my-4">
                                <AlertCircleIcon className="me-2" />
                                <AlertTitle>{formError}</AlertTitle>
                            </Alert>
                        )}
                        <LoadingButton
                            className="w-full mt-8"
                            onAction={handleResetPassword}
                            isLoading={resetting}
                            loadingContent={<><Spinner /> Resetting</>}
                            content="Reset password"
                        />
                    </CardContent>
                </Card>
            </div>
        )
    }
    return (
        <Card className="mx-auto max-w-md">
            <CardHeader>
                <CardTitle>Verify your email</CardTitle>
                <CardDescription>
                    Enter the verification code we sent to your email address:{" "}
                    <span className="font-medium">{res.email}</span>.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Field>
                    <div className="flex items-center justify-between">
                        <FieldLabel htmlFor="otp-verification">
                            Verification code
                        </FieldLabel>
                        <Button
                            variant="outline"
                            size="xs"
                            onClick={handleSendOtp}
                            disabled={loading}
                        >
                            <RefreshCwIcon className={cn(loading ? "animate-spin" : "")} />
                            Resend Code
                        </Button>
                    </div>
                    <InputOTP
                        maxLength={6}
                        onChange={setOtp}
                        id="otp-verification"
                        required
                        disabled={attemptLeft === 0}
                    >
                        <div className="flex w-full justify-between items-center">
                            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator className="mx-2" />
                            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </div>
                    </InputOTP>
                </Field>
                {formError && (
                    <Alert variant="destructive" className="my-4">
                        <AlertCircleIcon className="me-2" />
                        <AlertTitle>{formError}</AlertTitle>
                    </Alert>
                )}
                {
                    attemptLeft < 3 && attemptLeft > 0 && (
                        <Alert variant={"destructive"} className="my-4">
                            <AlertCircleIcon className="me-2" />
                            <AlertTitle>You have {attemptLeft} attempt{attemptLeft > 1 ? "s" : ""} left</AlertTitle>
                        </Alert>
                    )
                }
                {
                    attemptLeft === 0 && (
                        <Alert variant={"destructive"} className="my-4">
                            <AlertCircleIcon className="me-2" />
                            <AlertTitle>No attempts left. Please click {`"Resend Code"`} to try again.</AlertTitle>
                        </Alert>
                    )
                }
            </CardContent>
            <CardFooter>
                <Field>
                    <button
                        onClick={handleVerifyOtp}
                        className={cn("btn-primary", (attemptLeft === 0) && "opacity-50 cursor-not-allowed")}
                        disabled={attemptLeft === 0}
                    >
                        Verify
                    </button>
                </Field>
            </CardFooter>
        </Card>
    )
}






// "use client";

// import { useState } from "react";

// import { cn } from "@/lib/utils"
// import {
//     Card,
//     CardContent,
//     CardDescription,
//     CardHeader,
// } from "@/components/ui/card"
// import {
//     Field,
//     FieldGroup,
//     FieldLabel,
// } from "@/components/ui/field"
// import { useRouter } from "next/navigation";
// import { Alert, AlertTitle } from "@/components/ui/alert";
// import { AlertCircleIcon } from "lucide-react";
// import LoadingButton from "@/components/ui/loadingButton";
// import { Spinner } from "@/components/ui/spinner";
// import { Input } from "@/components/ui/input";
// import { sendOtp } from "@/services/auth.service";
// import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
// export default function OtpCard({ res: initialRes }: {
//     res: {
//         hashedOtp: string;
//         email: string;
//     }
// }) {
//     const [res, setRes] = useState<{
//         hashedOtp: string;
//         email: string;
//     } | null>(initialRes);
//     const router = useRouter();

//     const [formError, setFormError] = useState<string | null>(null);
//     const [loading, setLoading] = useState(false);
//     const [otp, setOtp] = useState("");
//     const handleSendOtp = async () => {
//         setLoading(true);
//         try {
//             const response = await sendOtp({ email: res?.email || "" });
//             if (!response.ok) {
//                 setFormError(response.message || "Failed to send OTP");
//                 return;
//             }
//             else {
//                 setRes(response.data || null);
//             }

//             // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         } catch (error: any) {
//             setFormError(error.message || "Failed to send OTP");
//         } finally {
//             setLoading(false);
//         }
//     }
//     return (
//         <div className={cn("flex flex-col gap-6")}>
//             <Card className="py-14 px-4">
//                 <CardHeader>
//                     <h2 className="w-full text-center font-fancy">Verify Email</h2>
//                     <CardDescription className="text-center">
//                         We emailed an OTP to {res?.email}. Please enter the OTP below to verify your email.
//                     </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                     <FieldGroup >
//                         <InputOTP className="justify-center" maxLength={6} defaultValue={otp} onChange={(value) => setOtp(value)}>
//                             <InputOTPGroup>
//                                 <InputOTPSlot index={0} />
//                                 <InputOTPSlot index={1} />
//                                 <InputOTPSlot index={2} />
//                                 <InputOTPSlot index={3} />
//                                 <InputOTPSlot index={4} />
//                                 <InputOTPSlot index={5} />
//                             </InputOTPGroup>
//                         </InputOTP>
//                     </FieldGroup>
//                     {formError && (
//                         <Alert variant="destructive" className="my-4">
//                             <AlertCircleIcon className="me-2" />
//                             <AlertTitle>{formError}</AlertTitle>
//                         </Alert>
//                     )}
//                     <LoadingButton
//                         className="w-full mt-8"
//                         onAction={() => { }}
//                         isLoading={loading}
//                         loadingContent={<><Spinner /> Verifying</>}
//                         content="Verify OTP"
//                     />
//                 </CardContent>
//             </Card>
//         </div>
//     );
// }