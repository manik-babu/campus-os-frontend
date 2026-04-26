import * as z from "zod";
export const DepartmentZodSchema = z.object({
    name: z.string().min(1, "Department name is required"),
    shortName: z.string().min(1, "Department short name is required"),
    programId: z.string().min(1, "Program selection is required"),
    description: z.string().min(1, "Department description is required"),
});

export type DepartmentFormData = z.infer<typeof DepartmentZodSchema>;