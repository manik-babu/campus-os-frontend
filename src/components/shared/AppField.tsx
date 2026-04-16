"use client";

import { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useState } from "react";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppFieldProps {
    field: AnyFieldApi;
    label: string;
    placeholder?: string;
    type?: "text" | "password" | "email";
    className?: string;
    disabled?: boolean;
    description?: string;
}


export default function AppField({
    field,
    label,
    placeholder,
    type = "text",
    className,
    disabled = false,
    description,
}: AppFieldProps) {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    const [isPassShowing, setIsPassShowing] = useState(false);
    return (
        <Field>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <div className="relative flex items-center">
                <Input
                    id={field.name}
                    placeholder={placeholder}
                    type={type === "password" && isPassShowing ? "text" : type}
                    className={cn(className, type === "password" && "pr-10")}
                    disabled={disabled}
                    onChange={(e) => field.handleChange(e.target.value)}
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
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
            <FieldDescription>{description}</FieldDescription>
        </Field>
    );
}