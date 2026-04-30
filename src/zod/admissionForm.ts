/**
 */
import * as z from "zod";
export enum AdmissionUserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER"
}

export const AdmissionFormZodSchema = z.object({
    programId: z.string().min(1, "Please select a program"),
    departmentId: z.string().min(1, "Please select a department"),
    name: z.string().min(1, "Name is required"),
    email: z.email().min(1, "Email is required"),
    fatherName: z.string().min(1, "Father's name is required"),
    motherName: z.string().min(1, "Mother's name is required"),
    birthDate: z.string().refine(date => !isNaN(Date.parse(date)), {
        message: "Invalid date format. Expected a valid date string.",
    }), // We will parse this to Date in the service layer
    permanentAddress: z.string().min(1, "Permanent address is required"),
    presentAddress: z.string().min(1, "Present address is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    schoolName: z.string().min(1, "School name is required"),
    collegeName: z.string().min(1, "College name is required"),
    sscGpa: z.string().refine(value => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= 0 && num <= 5;
    }, { message: "SSC GPA must be a number between 0 and 5" }),
    hscGpa: z.string().refine(value => {
        const num = parseFloat(value);
        return !isNaN(num) && num >= 0 && num <= 5;
    }, { message: "HSC GPA must be a number between 0 and 5" }),
    sscPassingYear: z.string().refine(value => {
        const num = parseInt(value);
        return !isNaN(num) && num >= 1900 && num <= new Date().getFullYear();
    }, { message: "Invalid SSC passing year" }),
    hscPassingYear: z.string().refine(value => {
        const num = parseInt(value);
        return !isNaN(num) && num >= 1900 && num <= new Date().getFullYear();
    }, { message: "Invalid HSC passing year" }),
    bloodGroup: z.string().nullable(),
    gender: z.string().min(1, "Please select a gender").refine(value => Object.values(AdmissionUserGender).includes(value as AdmissionUserGender), {
        message: "Invalid gender"
    })
})

