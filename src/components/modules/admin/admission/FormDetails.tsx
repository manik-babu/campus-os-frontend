"use client";

import { IAdmissionFormDetails, IStudentProfileData } from "@/@types/admission";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import { formattedDate } from "@/utils/FormattedTime";
import { X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { UserRole } from "@/@types/session";
import { admitStudent, updateAdmissionFormStatus } from "@/services/admin.service";
import { Spinner } from "@/components/ui/spinner";

export default function FormDetails({ form }: { form: IAdmissionFormDetails }) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [rejecting, setRejecting] = useState(false);

    const handleAdmin = async () => {
        try {
            setLoading(true);
            const userData = {
                name: form.name,
                email: form.email,
                password: form.email,
                role: UserRole.STUDENT,
                gender: "MALE" //TODO: add gender field in form
            };
            const profileData: IStudentProfileData = {
                batchId: form.batchId,
                departmentId: form.departmentId,
                programId: form.programId,
                fatherName: form.fatherName,
                motherName: form.motherName,
                birthDate: form.birthDate,
                permanentAddress: form.permanentAddress,
                presentAddress: form.presentAddress,
                phoneNumber: form.phoneNumber,
                schoolName: form.schoolName,
                collegeName: form.collegeName,
                sscGpa: Number(form.sscGpa),
                hscGpa: Number(form.hscGpa),
                sscPassingYear: form.sscPassingYear,
                hscPassingYear: form.hscPassingYear,
                bloodGroup: form.bloodGroup,
                image: form.image
            };
            const res = await admitStudent(userData, profileData);
            console.log(res)
            if (res.ok) {
                toast.success("Student admitted successfully");
                await updateAdmissionFormStatus(form.id, "APPROVED");
            } else {
                toast.error(res.message || "Failed to admit student");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error occurred while admitting student:", error);
            toast.error(error.message || "Failed to admit student. Please try again.");
        }
        finally {
            setLoading(false);
        }
    };
    const rejectForm = async () => {
        try {
            setRejecting(true);
            const res = await updateAdmissionFormStatus(form.id, "REJECTED");
            if (res.ok) {
                toast.success("Admission form rejected successfully");
            } else {
                toast.error(res.message || "Failed to reject admission form. Please try again.");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error occurred while rejecting admission form:", error);
            toast.error(error.message || "Failed to reject admission form. Please try again.");
        }
        finally {
            setRejecting(false);
        }
    }
    return (
        <div>
            <div className="max-w-6xl mx-auto space-y-4">
                {/* Header Section */}
                <Card className="p-4">
                    <h3>Personal Information</h3>
                    <div className="px-8 pb-8">

                        <div className="flex gap-8 -mt-16 mb-8">
                            {/* Student Image */}
                            <div className="relative w-32 h-40 rounded-lg border-4 border-white shadow-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                <Image
                                    src={form.image}
                                    alt={form.name}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Basic Info */}
                            <div className="flex-1 pt-4">
                                <h2 className="text-3xl font-bold text-gray-900 mb-2">{form.name}</h2>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Program</p>
                                        <p className="text-sm font-semibold text-gray-900">{form.program}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Department</p>
                                        <p className="text-sm font-semibold text-gray-900">{form.department}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Applied Date</p>
                                        <p className="text-sm font-semibold text-gray-900">{formattedDate(form.createdAt)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Academic Information Section */}
                <Card className="p-4">
                    <h3>Academic Information</h3>
                    <div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="font-semibold text-muted-foreground mb-4 text-sm uppercase tracking-wide">SSC Details</h3>
                                <InfoRow label="School Name" value={form.schoolName} />
                                <InfoRow label="SSC GPA" value={form.sscGpa} />
                                <InfoRow label="Passing Year" value={form.sscPassingYear} />
                            </div>
                            <div>
                                <h3 className="font-semibold text-muted-foreground mb-4 text-sm uppercase tracking-wide">HSC Details</h3>
                                <InfoRow label="College Name" value={form.collegeName} />
                                <InfoRow label="HSC GPA" value={form.hscGpa} />
                                <InfoRow label="Passing Year" value={form.hscPassingYear} />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Personal Information Section */}
                <Card className="p-4">
                    <div>
                        <h3>Personal Information</h3>
                    </div>
                    <div>
                        <div className="grid md:grid-cols-2 gap-8">
                            <div>
                                <InfoRow label="Email Address" value={form.email} />
                                <InfoRow label="Phone Number" value={form.phoneNumber} />
                                <InfoRow label="Date of Birth" value={formattedDate(form.birthDate)} />
                                <InfoRow label="Blood Group" value={form.bloodGroup || "N/A"} />
                            </div>
                            <div>
                                <InfoRow label="Father's Name" value={form.fatherName} />
                                <InfoRow label="Mother's Name" value={form.motherName} />
                                <InfoRow label="Permanent Address" value={form.permanentAddress} />
                                <InfoRow label="Present Address" value={form.presentAddress} />
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Documents Section */}
                <Card className="p-4">
                    <div>
                        <h3 className="text-[#072DD0]!">Education Documents</h3>
                    </div>
                    <div className="px-8 py-8">
                        <div className="flex flex-wrap gap-12 justify-start">
                            <DocumentThumbnail setSelectedImage={setSelectedImage} label="SSC Certificate" src={form.sscDoc} />
                            <DocumentThumbnail setSelectedImage={setSelectedImage} label="HSC Certificate" src={form.hscDoc} />
                        </div>
                        <p className="text-xs text-gray-500 mt-6">
                            💡 Click on any document thumbnail to view in full screen
                        </p>
                    </div>
                </Card>
                <div className="w-full flex justify-start items-center gap-4 my-8">
                    <Button variant={"outline"} onClick={rejectForm} disabled={rejecting} size="lg">
                        {rejecting ? <><Spinner /> Rejecting</> : "Reject Form"}
                    </Button>
                    <Button onClick={handleAdmin} disabled={loading} size="lg">
                        {loading ? <><Spinner /> Admitting</> : "Admit Student"}
                    </Button>
                    <p className="text-muted-foreground">Admit student to last batch: <span className="text-purple-600">batch {form.batchNo}</span></p>
                </div>
            </div>
        </div>
    );
}

const InfoRow = ({ label, value }: { label: string; value: string | number | null }) => (
    <div className="grid grid-cols-2 gap-4 py-3 border-b border-gray-100 last:border-b-0">
        <div className="text-sm font-medium text-gray-600">{label}</div>
        <div className="text-sm text-gray-900 font-semibold">
            {value && value !== "null" ? String(value) : "N/A"}
        </div>
    </div>
);
const DocumentThumbnail = ({ label, src, setSelectedImage }: { label: string; src: string; setSelectedImage: Dispatch<SetStateAction<string | null>> }) => (
    <div className="flex flex-col items-center gap-2">
        <button
            onClick={() => setSelectedImage(src)}
            className="relative w-32 h-40 border-2 border-gray-200 rounded-lg overflow-hidden hover:border-blue-500 transition-colors duration-200 bg-gray-50 hover:shadow-lg"
        >
            <Image
                src={src}
                alt={label}
                fill
                className="object-cover"
            />
        </button>
        <span className="text-xs font-medium text-gray-600">{label}</span>
    </div>
);
