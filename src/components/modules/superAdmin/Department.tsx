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
import { addDepartment, getDepartments } from "@/services/superAdmin.service";
import { DepartmentZodSchema } from "@/zod/superAdmin/department";
import { IDepartment } from "@/@types/superAdmin";

export default function SuperAdminDepartment() {
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [formError, setFormError] = useState<string | null>(null)
    const [programs, setPrograms] = useState<IPrograms[] | null>(null);
    const [departments, setDepartments] = useState<IDepartment[] | null>(null);
    const form = useForm({
        defaultValues: {
            programId: "",
            name: "",
            shortName: "",
            description: ""
        },
        validators: {
            onSubmit: DepartmentZodSchema
        },
        onSubmit: async ({ value }) => {
            setIsAdding(true)
            try {
                const res = await addDepartment(value);
                if (res.ok) {
                    toast.success(res.message || "Department added successfully");
                    form.reset();
                    setAddNew(false);
                    fetchDepartments();
                } else {
                    setFormError(res.message || "Failed to add department");
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setFormError(error.message || "Failed to add department");
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
    const fetchDepartments = async () => {
        setLoading(true);
        try {
            const res = await getDepartments();
            if (res.ok && res.data) {
                setDepartments(res.data);
            } else {
                toast.error(res.message || "Failed to fetch departments");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch departments");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchPrograms();
        fetchDepartments();
    }, []);
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Manage Departments</h2>
                <p className="text-muted-foreground">Manage and view academic departments.</p>
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
                                        name="programId"
                                    >
                                        {
                                            (field) => (
                                                <div className="space-y-2">
                                                    <FieldLabel htmlFor={field.name}>Program</FieldLabel>
                                                    <Select
                                                        value={field.state.value}
                                                        onValueChange={(value) => { field.handleChange(value as ProgramLevel); }}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Choose a program" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {programs?.map((program) => (
                                                                <SelectItem key={program.id} value={program.id}>
                                                                    {program.shortName} - {program.name}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )
                                        }
                                    </form.Field>
                                    <form.Field
                                        name="name"
                                    >
                                        {
                                            (field) => (
                                                <AppField
                                                    field={field}
                                                    label="Department Name"
                                                    placeholder="e.g. Computer Science"
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
                                                    placeholder="e.g. CS, EEE"
                                                />
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
                                                        <FieldLabel htmlFor={field.name}>Department Description</FieldLabel>
                                                        <Textarea
                                                            placeholder="Enter department description..."
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
                                            isAdding ? <><Spinner /> Adding</> : <><Plus /> Add Department</>
                                        }
                                    </Button>
                                </div>
                            </Card>
                        </form>
                    </section>
                ) :
                    <Button onClick={() => setAddNew(true)}><Plus /> Add New Department</Button>
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
                        {departments && departments.length > 0 ? (
                            departments.map((department) => (
                                <div key={department.id} className="border rounded-lg p-4 mb-4 space-y-2">
                                    <h3 className="text-xl font-semibold">{department.shortName} - {department.name}</h3>
                                    <p className="text-muted-foreground text-sm">{department.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground my-8">No departments found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}