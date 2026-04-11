import * as z from "zod"

export const loginZodSchema = z.object({
    idNo: z.string().min(1, "ID number is required"),
    password: z.string().min(1, "Password is required"),
});