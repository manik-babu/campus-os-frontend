import * as z from "zod";
export const adminRegistrationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Invalid email address"),
    role: z.enum(["ADMIN"]),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], "Please select a valid gender"),
    phoneNumber: z.string().min(1, "Phone number is required").max(15, "Phone number is too long"),
    salary: z.string().min(1, "Salary is required"),
    presentAddress: z.string().min(1, "Present address is required"),
    permanentAddress: z.string().min(1, "Permanent address is required"),
    departmentId: z.string().min(1, "Department is required"),
});

export type AdminRegistrationData = z.infer<typeof adminRegistrationSchema>;