/**
 {
            name: "",
            email: "",
            role: "FACULTY",
            gender: "",
            designation: "",
            phoneNumber: "",
            salary: "",
            bloodGroup: "",
            presentAddress: "",
            permanentAddress: "",
        }
 */
import * as z from "zod";
export const facultyRegistrationSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().min(1, "Invalid email address"),
    role: z.enum(["FACULTY"]),
    gender: z.enum(["MALE", "FEMALE", "OTHER"], "Please select a valid gender"),
    designation: z.string().min(1, "Designation is required"),
    phoneNumber: z.string().min(1, "Phone number is required").max(15, "Phone number is too long"),
    salary: z.string().min(1, "Salary is required"),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], "Please select a valid blood group"),
    presentAddress: z.string().min(1, "Present address is required"),
    permanentAddress: z.string().min(1, "Permanent address is required"),
});

export type FacultyRegistrationData = z.infer<typeof facultyRegistrationSchema>;