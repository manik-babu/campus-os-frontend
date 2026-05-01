"use client";

import { IPrograms } from "@/@types/programs";
import { IDepartment } from "@/@types/superAdmin";
import AppField from "@/components/shared/AppField";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImagePicker from "@/components/ui/ImagePicker";
import { getPrograms, submitAdmissionForm } from "@/services/public.service";
import { getDepartments } from "@/services/superAdmin.service";
import { AdmissionFormZodSchema, AdmissionUserGender } from "@/zod/admissionForm";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

export default function AdmissionForm() {
    const router = useRouter();
    const [programs, setPrograms] = useState<IPrograms[] | null>(null);
    const [departments, setDepartments] = useState<IDepartment[] | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [image, setImage] = useState<File | null>(null);
    const [sscDoc, setSscDoc] = useState<File | null>(null);
    const [hscDoc, setHscDoc] = useState<File | null>(null);

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - i).sort();

    const form = useForm({
        defaultValues: {
            programId: "",
            departmentId: "",
            name: "",
            email: "",
            fatherName: "",
            motherName: "",
            birthDate: "",
            permanentAddress: "",
            presentAddress: "",
            phoneNumber: "",
            schoolName: "",
            collegeName: "",
            sscGpa: "",
            hscGpa: "",
            sscPassingYear: "",
            hscPassingYear: "",
            bloodGroup: "" as string | null,
            gender: "",
        },
        validators: {
            onSubmit: AdmissionFormZodSchema
        },
        onSubmit: async ({ value }) => {
            try {
                setIsSubmitting(true);
                if (!image) {
                    toast.error("Please upload a profile picture.");
                    return;
                }
                if (!sscDoc) {
                    toast.error("Please upload your SSC certificate.");
                    return;
                }
                if (!hscDoc) {
                    toast.error("Please upload your HSC certificate.");
                    return;
                }
                const data = {
                    ...value,
                    sscGpa: parseFloat(value.sscGpa),
                    hscGpa: parseFloat(value.hscGpa),
                    sscPassingYear: parseInt(value.sscPassingYear),
                    hscPassingYear: parseInt(value.hscPassingYear),
                    birthDate: new Date(value.birthDate).toISOString(), // Send birthDate as string, backend will handle the conversion
                }
                const formData = new FormData();
                formData.append("data", JSON.stringify(data));
                formData.append("image", image);
                formData.append("sscDoc", sscDoc);
                formData.append("hscDoc", hscDoc);

                const res = await submitAdmissionForm(formData);
                console.log(res);
                if (res.ok && res.data) {
                    localStorage.setItem("admissionFormData", JSON.stringify(res.data));
                    form.reset();
                    setImage(null);
                    setSscDoc(null);
                    setHscDoc(null);
                    router.push("/admission/payment");
                } else {
                    toast.error(res.message || "Failed to submit the form");
                }
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                toast.error(error.message || "An error occurred while submitting the form")
            }
            finally {
                setIsSubmitting(false);
            }
        }
    });

    const fetchPrograms = async () => {
        try {
            const res = await getPrograms();
            if (res.ok && res.data) {
                setPrograms(res.data);
            } else {
                toast.error(res.message || "Failed to fetch programs");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch programs");
        }
    }
    const getExistingForm = async () => {
        const data = localStorage.getItem("admissionFormData");
        if (data) {
            router.push("/admission/payment");
        }
    }

    useEffect(() => {
        fetchPrograms();
        getExistingForm();
    }, []);

    const fetchDepartments = async (programId: string) => {
        try {
            const res = await getDepartments(programId);
            if (res.ok && res.data) {
                const sortedDepartments = res.data.sort((a, b) => a.name.localeCompare(b.name));
                setDepartments(sortedDepartments);
            } else {
                toast.error(res.message || "Failed to fetch departments");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Failed to fetch departments");
        }
    }

    return (

        <div className="space-y-8 pb-8 p-4 mt-16">
            {/* Header Section */}
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground font-fancy">University Admission Form</h1>
                <p className="text-muted-foreground">
                    Complete all fields below to apply for admission. Please provide accurate information.
                </p>
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    form.handleSubmit();
                }}>
                <div className="space-y-6">
                    {/* Program & Department Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-fancy">
                                <div className="h-1 w-1 rounded-full bg-[#0052FF]" />
                                Program & Department
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup className="grid gap-6 sm:grid-cols-2">
                                <form.Field name="programId">
                                    {(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                                        return (
                                            <div className="space-y-2">
                                                <FieldLabel htmlFor={field.name}>Program</FieldLabel>
                                                <Select
                                                    value={field.state.value || ""}
                                                    onValueChange={(value) => {
                                                        field.handleChange(value);
                                                        fetchDepartments(value);
                                                        form.setFieldValue("departmentId", "");
                                                    }}
                                                >
                                                    <SelectTrigger aria-invalid={isInvalid}>
                                                        <SelectValue placeholder="Choose a program" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {programs?.map((program) => (
                                                            <SelectItem key={program.id} value={program.id}>
                                                                {program.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                            </div>
                                        )
                                    }}
                                </form.Field>
                                <form.Field name="departmentId">
                                    {(field) => {
                                        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                                        return (
                                            <div className="space-y-2">
                                                <FieldLabel htmlFor={field.name}>Department</FieldLabel>
                                                <Select
                                                    value={field.state.value || ""}
                                                    onValueChange={(value) => {
                                                        field.handleChange(value);
                                                    }}

                                                >
                                                    <SelectTrigger aria-invalid={isInvalid} disabled={!field.form.getFieldValue("programId")}>
                                                        <SelectValue placeholder="Choose a department" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {departments?.map((department) => (
                                                            <SelectItem key={department.id} value={department.id}>
                                                                {department.name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                            </div>
                                        )
                                    }}
                                </form.Field>
                            </FieldGroup>
                        </CardContent>
                    </Card>

                    {/* Personal Information Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-fancy">
                                <div className="h-1 w-1 rounded-full bg-[#0052FF]" />
                                Personal Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup className="space-y-6">
                                <form.Field name="name">
                                    {(field) => (
                                        <AppField
                                            field={field}
                                            label="Full Name"
                                            placeholder="Enter your full name"
                                        />
                                    )}
                                </form.Field>

                                <div className="grid gap-6 sm:grid-cols-2">
                                    <form.Field name="email">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Email Address"
                                                placeholder="example@email.com"
                                                type="email"
                                            />
                                        )}
                                    </form.Field>
                                    <form.Field name="phoneNumber">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Phone Number"
                                                placeholder="+880 1234567890"
                                            />
                                        )}
                                    </form.Field>
                                </div>

                                <div className="grid gap-6 sm:grid-cols-3">
                                    <form.Field name="gender">
                                        {(field) => {
                                            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                                            return (
                                                <div className="space-y-2">
                                                    <FieldLabel htmlFor={field.name}>Gender</FieldLabel>
                                                    <Select
                                                        value={field.state.value}
                                                        onValueChange={(value) => field.handleChange(value)}
                                                    >
                                                        <SelectTrigger aria-invalid={isInvalid}>
                                                            <SelectValue placeholder="Select gender" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value={AdmissionUserGender.MALE}>Male</SelectItem>
                                                            <SelectItem value={AdmissionUserGender.FEMALE}>Female</SelectItem>
                                                            <SelectItem value={AdmissionUserGender.OTHER}>Other</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                                </div>
                                            )
                                        }}
                                    </form.Field>
                                    <form.Field name="bloodGroup">
                                        {(field) => {
                                            return (
                                                <div className="space-y-2">
                                                    <FieldLabel htmlFor={field.name}>Blood Group (Optional)</FieldLabel>
                                                    <Select
                                                        value={field.state.value || ""}
                                                        onValueChange={(value) => field.handleChange(value)}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select blood group" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="A+">A+</SelectItem>
                                                            <SelectItem value="A-">A-</SelectItem>
                                                            <SelectItem value="B+">B+</SelectItem>
                                                            <SelectItem value="B-">B-</SelectItem>
                                                            <SelectItem value="AB+">AB+</SelectItem>
                                                            <SelectItem value="AB-">AB-</SelectItem>
                                                            <SelectItem value="O+">O+</SelectItem>
                                                            <SelectItem value="O-">O-</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                            )
                                        }}
                                    </form.Field>
                                    <form.Field name="birthDate">
                                        {(field) => (
                                            <AppField
                                                field={field}
                                                label="Date of Birth"
                                                placeholder="YYYY-MM-DD"
                                                type="text"
                                            />
                                        )}
                                    </form.Field>
                                </div>
                            </FieldGroup>
                        </CardContent>
                    </Card>

                    {/* Contact Information Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-fancy">
                                <div className="h-1 w-1 rounded-full bg-[#0052FF]" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup className="space-y-4">
                                <form.Field name="presentAddress">
                                    {(field) => (
                                        <AppField
                                            field={field}
                                            label="Present Address"
                                            placeholder="Enter your current address"
                                        />
                                    )}
                                </form.Field>
                                <form.Field name="permanentAddress">
                                    {(field) => (
                                        <AppField
                                            field={field}
                                            label="Permanent Address"
                                            placeholder="Enter your permanent address"
                                        />
                                    )}
                                </form.Field>
                            </FieldGroup>
                        </CardContent>
                    </Card>

                    {/* Family Information Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-fancy">
                                <div className="h-1 w-1 rounded-full bg-[#0052FF]" />
                                Family Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup className="grid gap-6 sm:grid-cols-2">
                                <form.Field name="fatherName">
                                    {(field) => (
                                        <AppField
                                            field={field}
                                            label="Father's Name"
                                            placeholder="Enter father's name"
                                        />
                                    )}
                                </form.Field>
                                <form.Field name="motherName">
                                    {(field) => (
                                        <AppField
                                            field={field}
                                            label="Mother's Name"
                                            placeholder="Enter mother's name"
                                        />
                                    )}
                                </form.Field>
                            </FieldGroup>
                        </CardContent>
                    </Card>

                    {/* Academic Background Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-fancy">
                                <div className="h-1 w-1 rounded-full bg-[#0052FF]" />
                                Academic Background
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup className="space-y-6">
                                {/* Secondary School */}
                                <div className="space-y-4 pb-6 border-b border-border/50">
                                    <h4 className="font-semibold text-foreground">Secondary School (SSC)</h4>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <form.Field name="schoolName">
                                            {(field) => (
                                                <AppField
                                                    field={field}
                                                    label="School Name"
                                                    placeholder="Enter school name"
                                                />
                                            )}
                                        </form.Field>
                                        <form.Field name="sscGpa">
                                            {(field) => (
                                                <AppField
                                                    field={field}
                                                    label="GPA"
                                                    placeholder="e.g., 5.00"
                                                />
                                            )}
                                        </form.Field>
                                    </div>
                                    <form.Field name="sscPassingYear">
                                        {(field) => (
                                            <div className="space-y-2">
                                                <FieldLabel htmlFor={field.name}>Passing Year</FieldLabel>
                                                <Select
                                                    value={field.state.value}
                                                    onValueChange={(value) => field.handleChange(value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select passing year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {years.reverse().map((year) => (
                                                            <SelectItem key={year} value={year.toString()}>
                                                                {year}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </form.Field>
                                </div>

                                {/* Higher Secondary School */}
                                <div className="space-y-4">
                                    <h4 className="font-semibold text-foreground">Higher Secondary School (HSC)</h4>
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        <form.Field name="collegeName">
                                            {(field) => (
                                                <AppField
                                                    field={field}
                                                    label="College Name"
                                                    placeholder="Enter college name"
                                                />
                                            )}
                                        </form.Field>
                                        <form.Field name="hscGpa">
                                            {(field) => (
                                                <AppField
                                                    field={field}
                                                    label="GPA"
                                                    placeholder="e.g., 5.00"
                                                />
                                            )}
                                        </form.Field>
                                    </div>
                                    <form.Field name="hscPassingYear">
                                        {(field) => (
                                            <div className="space-y-2">
                                                <FieldLabel htmlFor={field.name}>Passing Year</FieldLabel>
                                                <Select
                                                    value={field.state.value}
                                                    onValueChange={(value) => field.handleChange(value)}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select passing year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {years.reverse().map((year) => (
                                                            <SelectItem key={year} value={year.toString()}>
                                                                {year}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        )}
                                    </form.Field>
                                </div>
                            </FieldGroup>
                        </CardContent>
                    </Card>

                    {/* Doc Upload Section */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 font-fancy">
                                <FileUp className="h-5 w-5 text-[#0052FF]" />
                                Upload Docs
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <FieldGroup className="grid gap-8 sm:grid-cols-3">
                                <div className="space-y-2">
                                    <FieldLabel>Profile Picture</FieldLabel>
                                    <ImagePicker
                                        image={image}
                                        setImage={setImage}
                                        error={null}
                                        id="admission-profile"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>SSC Certificate</FieldLabel>
                                    <ImagePicker
                                        image={sscDoc}
                                        setImage={setSscDoc}
                                        error={null}
                                        id="admission-ssc-doc"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FieldLabel>HSC Certificate</FieldLabel>
                                    <ImagePicker
                                        image={hscDoc}
                                        setImage={setHscDoc}
                                        error={null}
                                        id="admission-hsc-doc"
                                    />
                                </div>
                            </FieldGroup>
                        </CardContent>
                    </Card>

                    {/* Submit Section */}
                    <div className="flex gap-4 justify-end pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="gap-2 btn-primary"
                        >
                            {isSubmitting ? (
                                <>
                                    <Spinner />
                                    Submitting...
                                </>
                            ) : (
                                "Submit Application"
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}