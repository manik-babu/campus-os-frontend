"use client";

import { ProgramLevel, ProgramZodSchema } from "@/zod/superAdmin/programs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { AlertCircleIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import AppField from "@/components/shared/AppField";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IPrograms } from "@/@types/programs";
import { getPrograms } from "@/services/public.service";
import { toast } from "sonner";
import { addProgram } from "@/services/superAdmin.service";
const programLevels = [
    { value: ProgramLevel.UNDERGRADUATE, label: "Undergraduate" },
    { value: ProgramLevel.POSTGRADUATE, label: "Postgraduate" },
    { value: ProgramLevel.PHD, label: "PhD" },
];

export default function SuperAdminProgram() {
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [formError, setFormError] = useState<string | null>(null)
    const [programs, setPrograms] = useState<IPrograms[] | null>(null);
    const form = useForm({
        defaultValues: {
            name: "",
            shortName: "",
            level: "" as ProgramLevel,
            description: ""
        },
        validators: {
            onSubmit: ProgramZodSchema
        },
        onSubmit: async ({ value }) => {
            setIsAdding(true)
            try {
                const res = await addProgram(value);
                if (res.ok) {
                    toast.success(res.message || "Program added successfully");
                    form.reset();
                    setAddNew(false);
                    fetchPrograms();
                } else {
                    setFormError(res.message || "Failed to add program");
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setFormError(error.message || "Failed to add program");
            }
            finally {
                setIsAdding(false)
            }
        }
    })
    const fetchPrograms = async () => {
        setLoading(true);
        try {
            const res = await getPrograms();
            if (res.ok && res.data) {
                setPrograms(res.data);
            } else {
                toast.error(res.message || "Failed to fetch programs");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch programs");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPrograms();
    }, []);
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Manage Programs</h2>
                <p className="text-muted-foreground">Manage and view academic programs.</p>
            </div>
            {
                addNew ? (
                    <section className="space-y-4">
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}>
                            <Card className="p-4 w-3xl!">
                                <FieldGroup className="gap-2">
                                    <form.Field
                                        name="name"
                                    >
                                        {
                                            (field) => (
                                                <AppField
                                                    field={field}
                                                    label="Program Name"
                                                    placeholder="e.g. Bachelor of Science"
                                                />
                                            )
                                        }
                                    </form.Field>

                                    <form.Field
                                        name="shortName"
                                    >
                                        {
                                            (field) => (
                                                <AppField
                                                    field={field}
                                                    label="Short Name"
                                                    placeholder="e.g. BSc, BSc. (Hons)"
                                                />
                                            )
                                        }
                                    </form.Field>
                                    <form.Field
                                        name="level"
                                    >
                                        {
                                            (field) => (
                                                <div className="space-y-2">
                                                    <FieldLabel htmlFor={field.name}>Program Level</FieldLabel>
                                                    <Select
                                                        value={field.state.value}
                                                        onValueChange={(value) => { field.handleChange(value as ProgramLevel); }}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Choose a program level" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {programLevels?.map((level) => (
                                                                <SelectItem key={level.value} value={level.value}>
                                                                    {level.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )
                                        }
                                    </form.Field>
                                    <form.Field
                                        name="description"
                                    >
                                        {
                                            (field) => {
                                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                                return (
                                                    <Field>
                                                        <FieldLabel htmlFor={field.name}>Program Description</FieldLabel>
                                                        <Textarea
                                                            placeholder="Enter program description..."
                                                            value={field.state.value}
                                                            onChange={(e) => field.handleChange(e.target.value)}
                                                            aria-invalid={isInvalid}
                                                        />
                                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                                    </Field>
                                                )
                                            }
                                        }
                                    </form.Field>
                                    {
                                        formError && <Alert variant={"destructive"}>
                                            <AlertCircleIcon />
                                            <AlertTitle>{formError}</AlertTitle>
                                        </Alert>
                                    }
                                </FieldGroup>
                                <div className="flex items-center gap-4 my-4">
                                    <Button onClick={() => { setAddNew(false); form.reset(); }} variant={"outline"}>Cancel</Button>
                                    <Button type="submit" disabled={isAdding}>
                                        {
                                            isAdding ? <><Spinner /> Adding</> : <><Plus /> Add Program</>
                                        }
                                    </Button>
                                </div>
                            </Card>
                        </form>
                    </section>
                ) :
                    <Button onClick={() => setAddNew(true)}><Plus /> Add New Program</Button>
            }
            <div className="mt-8">
                {loading ? (
                    <div>
                        {
                            Array.from({ length: 10 }).map((_, index) => (
                                <div key={index} className="border rounded-lg p-4 mb-4 animate-pulse">
                                    <Skeleton className="h-6 w-32 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        {programs && programs.length > 0 ? (
                            programs.map((program) => (
                                <div key={program.id} className="border rounded-lg p-4 mb-4">
                                    <h3 className="text-xl font-semibold">{program.shortName} - {program.name}</h3>
                                    <p className="text-muted-foreground text-sm">{program.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground my-8">No programs found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}