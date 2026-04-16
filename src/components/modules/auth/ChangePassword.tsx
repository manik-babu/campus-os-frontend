"use client";

import AppField from "@/components/shared/AppField";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import { changePassword } from "@/services/auth.service";
import { changePasswordZodSchema } from "@/zod/auth/changePassword";
import { useForm } from "@tanstack/react-form";
import { AlertCircleIcon, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ChangePasswordPage() {
    const [formResponse, setFormResponse] = useState<{ ok: boolean; message: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm({
        defaultValues: {
            oldPassword: "",
            newPassword: "",
        },
        validators: {
            onSubmit: changePasswordZodSchema
        },
        onSubmit: async ({ value }) => {
            setIsLoading(true);
            try {
                const res = await changePassword(value);
                if (!res.ok) {
                    setFormResponse({
                        ok: false,
                        message: res.message || "Password change failed",
                    });
                    toast.error(res.message || "Password change failed", { id: "change-password" });
                }
                else {
                    setFormResponse({
                        ok: true,
                        message: "Password changed successfully",
                    });
                }
            } catch (error) {
                setFormResponse({
                    ok: false,
                    message: "An error occurred while changing the password."
                });
                toast.error("An error occurred while changing the password.", { id: "change-password" });
            }
            finally {
                setIsLoading(false);
            }
        }
    })
    return (
        <div>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Change Password</h2>
                <p className="text-muted-foreground">
                    Change your account password to keep your account secure.
                </p>
            </div>

            <div className="mt-6">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}
                    className="w-full"
                >
                    <FieldGroup className="flex gap-2 lg:flex-row flex-col">
                        <form.Field
                            name="oldPassword"
                        >
                            {
                                (field) => (
                                    <AppField
                                        field={field}
                                        label="Old Password"
                                        placeholder="Enter your old password"
                                        type="password"
                                    />
                                )
                            }
                        </form.Field>
                        <form.Field
                            name="newPassword"
                        >
                            {
                                (field) => (
                                    <AppField
                                        field={field}
                                        label="New Password"
                                        placeholder="Create new password"
                                        type="password"
                                    />
                                )
                            }
                        </form.Field>
                    </FieldGroup>
                    {
                        formResponse && (
                            formResponse.ok ? (
                                <Alert variant="default" className="text-green-500">
                                    <CheckCircle />
                                    <AlertTitle >{formResponse.message}</AlertTitle>
                                </Alert>
                            ) : (
                                <Alert variant="destructive">
                                    <AlertCircleIcon />
                                    <AlertTitle>{formResponse.message}</AlertTitle>
                                </Alert>
                            )
                        )
                    }
                    <Button
                        type="submit"
                        className="px-4 mt-2 py-2 bg-primary text-white rounded disabled:bg-gray-400"
                        disabled={isLoading}
                    >
                        {isLoading ? <><Spinner />Changing</> : "Change Password"}
                    </Button>

                </form>
            </div>
        </div>
    );
}