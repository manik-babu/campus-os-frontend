import * as z from "zod";

export const changePasswordZodSchema = z.object({
    oldPassword: z.string().min(1, "Please enter your old password"),
    newPassword: z.string().min(6, "New password must be at least 6 characters long"),
});