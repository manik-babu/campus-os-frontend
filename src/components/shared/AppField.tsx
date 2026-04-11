import { AnyFieldApi } from "@tanstack/react-form";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

interface AppFieldProps {
    field: AnyFieldApi;
    label: string;
    placeholder?: string;
    type?: "text" | "password" | "email";
    className?: string;
    disabled?: boolean;
}


export default function AppField({
    field,
    label,
    placeholder,
    type = "text",
    className,
    disabled = false,

}: AppFieldProps) {
    const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
    return (
        <Field>
            <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            <Input
                id={field.name}
                placeholder={placeholder}
                type={type}
                className={className}
                disabled={disabled}
                onChange={(e) => field.handleChange(e.target.value)}
                aria-invalid={isInvalid}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
        </Field>
    );
}