"use client";

import { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "../ui/textarea";

interface AppFieldProps {
    field: AnyFieldApi;
    label: string;
    placeholder?: string;
    type?: "text" | "password" | "email";
    className?: string;
    disabled?: boolean;
    description?: string;
    multiline?: boolean;
    rows?: number;
}


export default function AppField({
    field,
    label,
    placeholder,
    type = "text",
    className,
    disabled = false,
    description,
    multiline = false,
    rows = 4,
}: AppFieldProps) {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const [isPassShowing, setIsPassShowing] = useState(false);
    return (
        <Field>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            {multiline ? (
                <Textarea
                    id={field.name}
                    placeholder={placeholder}
                    className={cn(className)}
                    disabled={disabled}
                    rows={rows}
                    value={field.state.value ?? ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    aria-invalid={isInvalid}
                />
            ) : (
                <div className="relative flex items-center">
                    <Input
                        id={field.name}
                        placeholder={placeholder}
                        type={type === "password" && isPassShowing ? "text" : type}
                        className={cn(className, type === "password" && "pr-10")}
                        disabled={disabled}
                        value={field.state.value ?? ""}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        aria-invalid={isInvalid}

                    />
                    {
                        type === "password" && (
                            <Button
                                variant={"ghost"}
                                type="button"
                                onClick={() => setIsPassShowing((prev) => !prev)}
                                className="absolute right-0"
                            >
                                {isPassShowing ? <EyeOff /> : <Eye />}
                            </Button>
                        )
                    }
                </div>
            )}
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
            <FieldDescription>{description}</FieldDescription>
        </Field>
    );
}