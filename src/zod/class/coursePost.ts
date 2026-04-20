import { ClassPostType } from "@/@types/classes";
import * as z from "zod";

export const coursePostZodSchema = z.object({
    courseOfferingId: z.string(),
    message: z.string().nullable(),
    type: z.enum(ClassPostType),
    parentId: z.string().nullable(),
    assignmentDeadLine: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format"
    }).nullable(), // ISO date string
});

export type CoursePostInput = z.infer<typeof coursePostZodSchema>;