"use client";

import { useState } from "react";

import { cn } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import {
    Field,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import { useRouter } from "next/navigation";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import LoadingButton from "@/components/ui/loadingButton";
import { Spinner } from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
import { sendOtp } from "@/services/auth.service";
import { InputOTPForm } from "./OtpCard";
export default function ResetPassword() {
    const [res, setRes] = useState<{
        hashedOtp: string;
        email: string;
    } | null>(null);
    const router = useRouter();

    const [formError, setFormError] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSendOtp = async () => {
        setLoading(true);
        if (!email) {
            setFormError("Please enter your email");
            return;
        }
        try {
            const response = await sendOtp({ email });
            if (!response.ok) {
                setFormError(response.message || "Failed to send OTP");
                return;
            }
            else {
                setRes(response.data || null);
            }

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setFormError(error.message || "Failed to send OTP");
        } finally {
            setLoading(false);
        }
    }
    if (res) {
        return <InputOTPForm res={res} time={new Date()} />
    }
    return (
        <div className={cn("flex flex-col gap-6")}>
            <Card className="py-14 px-4">
                <CardHeader>
                    <h2 className="w-full text-center font-fancy">Reset Password</h2>
                    <CardDescription className="text-center">
                        Enter your email below to receive a password reset OTP
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor={"email"}>Email</FieldLabel>
                            <div className="relative flex items-center">
                                <Input
                                    id={"email"}
                                    placeholder="Enter your email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                        onAction={handleSendOtp}
                        isLoading={loading}
                        loadingContent={<><Spinner /> Sending</>}
                        content="Send OTP"
                    />
                </CardContent>
            </Card>
        </div>
    );
}