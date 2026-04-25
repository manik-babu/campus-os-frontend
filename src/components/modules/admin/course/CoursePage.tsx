"use client";

import { ICourses } from "@/@types/admin";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { addNewCourse, getCourses } from "@/services/admin.service";
import { getSession } from "@/services/auth.service";
import { AddCourseZodSchema } from "@/zod/course";
import { useForm } from "@tanstack/react-form";
import { AlertCircleIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from "@/components/ui/field"
import AppField from "@/components/shared/AppField";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";

export default function CoursePage() {
    const [courses, setCourses] = useState<ICourses[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const form = useForm({
        defaultValues: {
            code: "",
            title: "",
            credits: "",
            description: "",
        },
        validators: {
            onSubmit: AddCourseZodSchema
        },
        onSubmit: async ({ value }) => {
            try {
                setIsAdding(true);
                const credits = parseInt(value.credits, 10);
                if (isNaN(credits) || credits <= 0) {
                    setFormError("Credits must be a positive number");
                    return;
                }

                const session = await getSession();
                if (!session || !session.departmentId) {
                    toast.error("Only department admin can add a course");
                    return;
                }
                const data = { ...value, credits, departmentId: session.departmentId };

                const res = await addNewCourse(data);
                if (res.ok) {
                    toast.success("Course added successfully");
                    fetchCourses();

                } else {
                    toast.error(res.message || "Failed to add course");
                    console.error("Failed to add course:", res.message);
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error.message || "An error occurred while adding the course");
            } finally {
                setIsAdding(false);
            }
        }
    });

    const fetchCourses = async () => {
        try {
            setLoading(true);
            const session = await getSession();
            if (!session || !session.departmentId) {
                toast.error("Only department admin can view courses");
                return;
            }
            const res = await getCourses(session.departmentId);
            if (res.ok && res.data) {
                setCourses(res.data);
            } else {
                toast.error(res.message || "Failed to fetch courses");
                console.error("Failed to fetch courses:", res.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error fetching courses:", error);
            toast.error(error.message || "An error occurred while fetching courses");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchCourses();
    }, []);
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Manage courses</h2>
                <p className="text-muted-foreground">Manage courses for your department.</p>
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
                                        name="code"
                                    >
                                        {
                                            (field) => (
                                                <AppField
                                                    field={field}
                                                    label="Course Code"
                                                    placeholder="Enter course code (e.g. CS101)"
                                                />
                                            )
                                        }
                                    </form.Field>

                                    <form.Field
                                        name="title"
                                    >
                                        {
                                            (field) => (
                                                <AppField
                                                    field={field}
                                                    label="Course Title"
                                                    placeholder="Enter course title"
                                                />
                                            )
                                        }
                                    </form.Field>
                                    <form.Field
                                        name="credits"
                                    >
                                        {
                                            (field) => (
                                                <AppField
                                                    field={field}
                                                    label="Credits"
                                                    placeholder="Enter number of credits"
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
                                                        <FieldLabel htmlFor={field.name}>Course Description</FieldLabel>
                                                        <Textarea
                                                            placeholder="Enter course description..."
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
                                            isAdding ? <><Spinner /> Adding</> : <><Plus /> Add Course</>
                                        }
                                    </Button>
                                </div>
                            </Card>
                        </form>
                    </section>
                ) :
                    <Button onClick={() => setAddNew(true)}><Plus /> Add New Course</Button>
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
                        {courses && courses.length > 0 ? (
                            courses.map((course) => (
                                <div key={course.id} className="border rounded-lg p-4 mb-4">
                                    <h3 className="text-xl font-semibold">{course.code} - {course.title}</h3>
                                    <p className="text-muted-foreground text-sm">{course.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground my-8">No courses found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}