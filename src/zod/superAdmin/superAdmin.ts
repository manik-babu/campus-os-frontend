import * as z from "zod";
export const SemesterZodSchema = z.object({
    name: z.string().min(1, "Semester name is required"),
    description: z.string().min(1, "Semester description is required"),
});