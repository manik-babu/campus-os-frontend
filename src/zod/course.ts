import * as z from "zod";

export const AddCourseZodSchema = z.object({
    code: z.string().min(1, "Course code is required"),
    title: z.string().min(1, "Course title is required"),
    description: z.string().min(1, "Description is required"),
    credits: z.string().min(1, "Credits must be a positive number"),
});

export const AddCourseOfferingZodSchema = z.object({
    courseId: z.string().min(1, "Course ID is required"),
    batchId: z.string().min(1, "Batch ID is required"),
    facultyId: z.string().min(1, "Faculty ID is required"),
    creditFees: z.string().min(1, "Credit fees must be a positive number"),
});