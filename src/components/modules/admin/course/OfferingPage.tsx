"use client";

import { ICourses } from "@/@types/admin";
import { ISemester } from "@/@types/enrollment";
import { IFacultyShort } from "@/@types/public";
import { IBatch } from "@/@types/shared";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { AddCourseOffering } from "@/services/admin.service";
import { AddCourseOfferingZodSchema } from "@/zod/course";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";

export default function CourseOfferingPage({ courses, batches, faculties, semester }: { courses: ICourses[], batches: IBatch[], faculties: IFacultyShort[], semester: ISemester }) {
    const [creating, setCreating] = useState(false)
    const [formError, setFormError] = useState<string | null>(null);
    const form = useForm({
        defaultValues: {
            courseId: "",
            batchId: "",
            facultyId: "",
            creditFees: "",
        },
        validators: {
            onSubmit: AddCourseOfferingZodSchema
        },
        onSubmit: async ({ value }) => {
            setCreating(true);
            try {
                const creditFees = parseFloat(value.creditFees);
                if (isNaN(creditFees) || creditFees < 0) {
                    setFormError("Credit fees must be a valid non-negative number.");
                    return;
                }
                const data = {
                    courseId: value.courseId,
                    batchId: value.batchId,
                    facultyId: value.facultyId,
                    creditFees: creditFees,
                    departmentId: courses[0].departmentId,
                    semesterId: semester.id
                }
                const res = await AddCourseOffering(data);
                if (res.ok) {
                    toast.success("Course offering created successfully");
                    form.reset();
                } else {
                    setFormError(res.message || "Failed to create course offering. Please try again.");
                }

                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error.message || "Failed to create course offering. Please try again.");
            }
            finally {
                setCreating(false);
            }
        }
    })

    return (
        <div>
            <section className="mt-6">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    form.handleSubmit();
                }}>
                    <Card className="max-w-2xl mx-auto p-4">
                        <h3>Add a new course offering for {semester.name}</h3>
                        <FieldGroup>
                            <form.Field
                                name="batchId"
                            >
                                {
                                    (field) => (
                                        <div className="space-y-2">
                                            <FieldLabel htmlFor={field.name}>Batch</FieldLabel>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value) => { field.handleChange(value); }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a batch" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {batches?.map((batch) => (
                                                        <SelectItem key={batch.id} value={batch.id}>
                                                            Batch {batch.batchNo}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FieldDescription>Select the batch for which you want to create this course offering. </FieldDescription>
                                        </div>

                                    )
                                }
                            </form.Field>

                            <form.Field
                                name="courseId"
                            >
                                {
                                    (field) => {
                                        return <div className="space-y-2">
                                            <FieldLabel htmlFor={field.name}>Course</FieldLabel>
                                            <Select
                                                value={field.state.value}
                                                onValueChange={(value) => { field.handleChange(value); }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue id={field.name} placeholder="Choose a course" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {courses?.map((course) => (
                                                        <SelectItem key={course.id} value={course.id}>
                                                            {course.title} ({course.code})
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FieldDescription>Select the course for which you want to create this offering. </FieldDescription>
                                        </div>
                                    }
                                }
                            </form.Field>

                            <form.Field
                                name="facultyId"
                            >
                                {
                                    (field) => (
                                        <div className="space-y-2 relative!">
                                            <FieldLabel htmlFor={field.name}>Faculty</FieldLabel>
                                            <Select

                                                value={field.state.value}
                                                onValueChange={(value) => { field.handleChange(value); }}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Choose a faculty" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {faculties?.map((faculty) => (
                                                        <SelectItem key={faculty.id} value={faculty.id}>
                                                            {faculty.idNo} - {faculty.name}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FieldDescription>Select the faculty member who will be teaching this course offering. </FieldDescription>
                                        </div>
                                    )
                                }
                            </form.Field>
                            <form.Field
                                name="creditFees"
                            >
                                {
                                    (field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
                                        return <div className="space-y-2">
                                            <FieldLabel htmlFor={field.name}>Credit Fees</FieldLabel>
                                            <Input
                                                type="text"
                                                id={field.name}
                                                value={field.state.value}
                                                onChange={(e) => { field.handleChange(e.target.value); }}
                                                className="w-48 border rounded-md p-2"
                                                placeholder="e.g 3000"
                                                aria-invalid={isInvalid}
                                            />
                                            {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                            <FieldDescription>Enter the credit fees for this course offering. </FieldDescription>
                                        </div>
                                    }
                                }
                            </form.Field>

                        </FieldGroup>
                        {formError && <Alert variant="destructive" className="my-4">
                            {formError}
                        </Alert>}
                        <FieldGroup className="flex flex-row items-center justify-between mt-4">
                            <Button
                                variant={"outline"}
                                onClick={() => form.reset()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit">
                                {
                                    creating ? <><Spinner /> Creating</> : "Create Offering"
                                }
                            </Button>
                        </FieldGroup>
                    </Card>
                </form>
            </section>
        </div >
    );
}