"use client";

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
import { toast } from "sonner";
import { SemesterZodSchema } from "@/zod/superAdmin/superAdmin";
import { getSemesters } from "@/services/shared.service";
import { ISemester } from "@/@types/enrollment";
import { DatePickerSimple } from "@/components/shared/DatePicker";
import { addSemester } from "@/services/superAdmin.service";

export default function SuperAdminSemester() {
    const [loading, setLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [formError, setFormError] = useState<string | null>(null)
    const [semesters, setSemesters] = useState<ISemester[] | null>(null)

    const [classStart, setClassStart] = useState<Date | undefined>(undefined);
    const [classEnd, setClassEnd] = useState<Date | undefined>(undefined);
    const form = useForm({
        defaultValues: {
            name: "",
            description: ""
        },
        validators: {
            onSubmit: SemesterZodSchema
        },
        onSubmit: async ({ value }) => {
            setIsAdding(true)
            try {
                const start = classStart ? new Date(classStart) : undefined;
                const end = classEnd ? new Date(classEnd) : undefined;
                if (!start || !end) {
                    setFormError("Please provide both start and end dates for the semester.");
                    return;
                }
                if (start >= end) {
                    setFormError("Start date must be before end date.");
                    return;
                }
                const classStartString = start.toISOString();
                const classEndString = end.toISOString();
                const res = await addSemester({
                    name: value.name,
                    description: value.description,
                    classStart: classStartString,
                    classEnd: classEndString,
                });
                console.log(res)
                if (res.ok) {
                    toast.success(res.message || "Semester added successfully");
                    form.reset();
                    setAddNew(false);
                    fetchSemesters();
                } else {
                    setFormError(res.message || "Failed to add semester");
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setFormError(error.message || "Failed to add semester");
            }
            finally {
                setIsAdding(false)
            }
        }
    })
    const fetchSemesters = async () => {
        setLoading(true);
        try {
            const res = await getSemesters();
            if (res.ok && res.data) {
                setSemesters(res.data);
            } else {
                toast.error(res.message || "Failed to fetch semesters");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch semesters");
        }
        finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchSemesters();
    }, []);
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Manage Semesters</h2>
                <p className="text-muted-foreground">Manage and view academic semesters.</p>
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
                                <FieldGroup className="gap-4">
                                    <form.Field
                                        name="name"
                                    >
                                        {
                                            (field) => (
                                                <AppField
                                                    field={field}
                                                    label="Semester Name"
                                                    placeholder="e.g. Fall 2023"
                                                />
                                            )
                                        }
                                    </form.Field>
                                    <div className="space-y-3">
                                        <FieldLabel>Class Start Date</FieldLabel>
                                        <DatePickerSimple
                                            label="Choose start date"
                                            date={classStart}
                                            setDate={setClassStart}
                                            setTimeToEndOfDay={true}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <FieldLabel>Class End Date</FieldLabel>
                                        <DatePickerSimple
                                            label="Choose end date"
                                            date={classEnd}
                                            setDate={setClassEnd}
                                            setTimeToEndOfDay={true}
                                        />
                                    </div>
                                    <form.Field
                                        name="description"
                                    >
                                        {
                                            (field) => {
                                                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                                return (
                                                    <Field>
                                                        <FieldLabel htmlFor={field.name}>Semester Description</FieldLabel>
                                                        <Textarea
                                                            placeholder="Enter semester description..."
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
                                        formError && <Alert className="mt-8" variant={"destructive"}>
                                            <AlertCircleIcon />
                                            <AlertTitle>{formError}</AlertTitle>
                                        </Alert>
                                    }
                                </FieldGroup>
                                <div className="flex items-center gap-4 my-4">
                                    <Button onClick={() => { setAddNew(false); form.reset(); }} variant={"outline"}>Cancel</Button>
                                    <Button type="submit" disabled={isAdding}>
                                        {
                                            isAdding ? <><Spinner /> Adding</> : <><Plus /> Add Semester</>
                                        }
                                    </Button>
                                </div>
                            </Card>
                        </form>
                    </section>
                ) :
                    <Button onClick={() => setAddNew(true)}><Plus /> Add New Semester</Button>
            }
            <div className="mt-4">
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
                        {semesters && semesters.length > 0 ? (
                            semesters.map((semester) => (
                                <div key={semester.id} className="border rounded-lg p-4 mb-4 space-y-2">
                                    <h3 className="text-xl font-semibold">{semester.name}</h3>
                                    <p className="text-muted-foreground text-sm">{semester.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground my-8">No semesters found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}