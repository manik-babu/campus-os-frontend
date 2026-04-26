"use client"

import AppField from "@/components/shared/AppField";
import { FieldGroup, FieldLabel, FieldError } from "@/components/ui/field";
import ImagePicker from "@/components/ui/ImagePicker";
import { registerFaculty } from "@/services/admin.service";
import { getSession } from "@/services/auth.service";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { facultyRegistrationSchema } from "@/zod/facultyRegistration";
import SuccessAlertDialog from "@/components/shared/SuccessAlertDialog";
import { useRouter } from "next/navigation";
import { CircleCheckBig } from "lucide-react"

const GENDER_OPTIONS = [
    { value: "MALE", label: "Male" },
    { value: "FEMALE", label: "Female" },
    { value: "OTHER", label: "Other" },
];

const BLOOD_GROUP_OPTIONS = [
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
];

export default function FacultyRegistration() {
    const [image, setImage] = useState<File | null>(null);
    const [imageError, setImageError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [facultyIdNo, setFacultyIdNo] = useState("");
    const [facultyPass, setFacultyPass] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const form = useForm({
        defaultValues: {
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
        },
        validators: {
            onSubmit: facultyRegistrationSchema
        },
        onSubmit: async ({ value }) => {
            setLoading(true);
            try {
                const salary = parseFloat(value.salary);
                if (isNaN(salary) || salary < 0) {
                    toast.error("Salary must be a positive number");
                    setLoading(false);
                    return;
                }
                if (!image) {
                    setImageError("Please upload an image");
                    setLoading(false);
                    return;
                }
                setImageError(null);

                const session = await getSession();
                if (!session || !session.departmentId) {
                    throw new Error("Unauthorized access. Please login to access this page.");
                }

                const userData = {
                    name: value.name,
                    email: value.email,
                    password: value.email,
                    role: value.role,
                    gender: value.gender,
                }

                const profileData = {
                    departmentId: session?.departmentId,
                    designation: value.designation,
                    phoneNumber: value.phoneNumber,
                    salary: salary,
                    bloodGroup: value.bloodGroup,
                    presentAddress: value.presentAddress,
                    permanentAddress: value.permanentAddress,
                }
                const res = await registerFaculty(image, userData, profileData);
                console.log(res)
                if (res.ok && res.data) {
                    form.reset();
                    setImage(null);
                    setFacultyIdNo(res.data.idNo);
                    setFacultyPass(userData.password);
                    setSuccess(true);
                } else {
                    toast.error(res.message || "Failed to register faculty");
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error.message || "An error occurred while registering faculty");
            } finally {
                setLoading(false);
            }
        },
    })

    return (
        <div className="min-h-screen py-8 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold mb-2">Faculty Registration</h2>
                    <p className="text-muted-foreground">
                        Fill in the details to register a new faculty member
                    </p>
                </div>

                {/* Card Container */}
                <Card className="p-4">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                        className="space-y-8"
                    >
                        {/* Profile Image Section */}
                        <div className="flex flex-col justify-center items-center pb-6 border-b">
                            <div>
                                <ImagePicker
                                    error={imageError}
                                    image={image}
                                    setImage={setImage}
                                />
                                <h3 className="text-lg font-medium mt-4">Profile Image</h3>
                            </div>
                        </div>

                        {/* Personal Information Section */}
                        <div className="border-b pb-6">
                            <h2 className="text-lg font-semibold text-[#072DD0] mb-6 pb-2">
                                Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Name */}
                                <FieldGroup>
                                    <form.Field name="name">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Full Name"
                                                placeholder="e.g., Dr. John Smith"
                                                type="text"
                                            />
                                        )}
                                    </form.Field>
                                </FieldGroup>

                                {/* Email */}
                                <FieldGroup>
                                    <form.Field name="email">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Email Address"
                                                placeholder="e.g., john.smith@university.com"
                                                type="email"
                                            />
                                        )}
                                    </form.Field>
                                </FieldGroup>

                                {/* Gender */}
                                <div className="w-full">
                                    <FieldLabel className="mb-3">Gender</FieldLabel>
                                    <form.Field name="gender">
                                        {(field) => (
                                            <div>
                                                <Select
                                                    value={field.state.value}
                                                    onValueChange={field.handleChange}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select gender" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {GENDER_OPTIONS.map((option) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {field.state.meta.isTouched && !field.state.meta.isValid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </div>
                                        )}
                                    </form.Field>
                                </div>

                                {/* Phone Number */}
                                <FieldGroup>
                                    <form.Field name="phoneNumber">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Phone Number"
                                                placeholder="e.g., +1 (555) 123-4567"
                                                type="text"
                                            />
                                        )}
                                    </form.Field>
                                </FieldGroup>

                                {/* Blood Group */}
                                <div className="w-full">
                                    <FieldLabel className="mb-3">Blood Group</FieldLabel>
                                    <form.Field name="bloodGroup">
                                        {(field) => (
                                            <div>
                                                <Select
                                                    value={field.state.value}
                                                    onValueChange={field.handleChange}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder="Select blood group" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {BLOOD_GROUP_OPTIONS.map((option) => (
                                                            <SelectItem key={option.value} value={option.value}>
                                                                {option.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {field.state.meta.isTouched && !field.state.meta.isValid && (
                                                    <FieldError errors={field.state.meta.errors} />
                                                )}
                                            </div>
                                        )}
                                    </form.Field>
                                </div>
                            </div>
                        </div>

                        {/* Professional Information Section */}
                        <div className="border-b pb-6">
                            <h2 className="text-lg font-semibold text-[#072DD0] mb-6 pb-2">
                                Professional Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Designation */}
                                <FieldGroup>
                                    <form.Field name="designation">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Designation"
                                                placeholder="e.g., Assistant Professor"
                                                type="text"
                                            />
                                        )}
                                    </form.Field>
                                </FieldGroup>

                                {/* Salary */}
                                <FieldGroup>
                                    <form.Field name="salary">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Monthly Salary"
                                                placeholder="e.g., 50000"
                                                type="text"
                                            />
                                        )}
                                    </form.Field>
                                </FieldGroup>
                            </div>
                        </div>

                        {/* Address Information Section */}
                        <div>
                            <h2 className="text-lg font-semibold text-[#072DD0] mb-6 pb-2">
                                Address Information
                            </h2>
                            <div className="space-y-6">
                                {/* Present Address */}
                                <FieldGroup>
                                    <form.Field name="presentAddress">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Present Address"
                                                placeholder="e.g., 123 Main St, City, State, ZIP"
                                                type="text"
                                            />
                                        )}
                                    </form.Field>
                                </FieldGroup>

                                {/* Permanent Address */}
                                <FieldGroup>
                                    <form.Field name="permanentAddress">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Permanent Address"
                                                placeholder="e.g., 456 Oak Ave, City, State, ZIP"
                                                type="text"
                                            />
                                        )}
                                    </form.Field>
                                </FieldGroup>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4 pt-6 border-t">
                            <Button
                                type="submit"
                                disabled={loading}
                                variant={"default"}
                            >
                                {loading ? <><Spinner /> Registering</> : "Register Faculty"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
            <SuccessAlertDialog
                title="Faculty Registered"
                description={`The faculty member has been registered successfully.\nID: ${facultyIdNo}, Password: ${facultyPass}`}
                actionText="Ok"
                onAction={() => setSuccess(false)}
                open={success}
                icon={<CircleCheckBig className="text-green-500" size={48} />}
            />
        </div>
    );
}