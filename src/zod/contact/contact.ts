import * as z from "zod"

export const contactZodSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Email is required").email("Enter a valid email address"),
    message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
});