"use client";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog";

import { IStudentProfile, IUserDetails } from "@/@types/userDetails";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { updateStudentAddress, updateStudentContact } from "@/services/studentDashboard.service";
import { Mail, Phone, MapPin, Users, GraduationCap, AlertCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import * as z from "zod";
import { Input } from "../ui/input";
import { FieldGroup } from "../ui/field";
import { Alert, AlertTitle } from "../ui/alert";
import { Button } from "../ui/button";

const contactSchema = z.object({
    email: z.email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 characters long").max(15, "Phone number cannot exceed 15 characters")
});
export default function StudentProfile({ user }: { user: IUserDetails }) {
    const profile = user.studentProfile as IStudentProfile;

    const statusColor = user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    const genderColor = user.gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800";
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(user.studentProfile?.phoneNumber || "");
    const [formError, setFormError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    //Address
    const [presentAddress, setPresentAddress] = useState(user.studentProfile?.presentAddress || "");
    const [permanentAddress, setPermanentAddress] = useState(user.studentProfile?.permanentAddress || "");
    const [formErrorAddr, setFormErrorAddr] = useState<string | null>(null);
    const [successMessageAddr, setSuccessMessageAddr] = useState<string | null>(null);


    const handleUpdate = async () => {
        if (!email || !phone) {
            setFormError("Email and phone number cannot be empty.");
            return;
        }
        setLoading(true);
        const validationResult = contactSchema.safeParse({ email, phoneNumber: phone });
        if (!validationResult.success) {
            setFormError("Invalid input type or required fields are missing.");
            setLoading(false);
            return;
        }
        try {
            const res = await updateStudentContact(email, phone);
            if (!res.ok) {
                setFormError(res.message);
            }
            else {
                setFormError(null);
                setSuccessMessage("Contact information updated successfully.");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setFormError(error.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }
    const handleUpdateAddr = async () => {
        if (!presentAddress || !permanentAddress) {
            setFormErrorAddr("Both present and permanent addresses are required.");
            return;
        }
        setLoading(true);
        try {
            const res = await updateStudentAddress(presentAddress, permanentAddress);
            if (!res.ok) {
                setFormErrorAddr(res.message);
            }
            else {
                setFormErrorAddr(null);
                setSuccessMessageAddr(res.message || "Address information updated successfully.");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setFormErrorAddr(error.message || "An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="rounded-lg border border-border bg-gradient-to-br from-card to-muted/30 p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    {/* Profile Image */}
                    <div className="flex-shrink-0">
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={120}
                                height={120}
                                className="h-32 w-32 rounded-2xl object-cover border-4 border-border"
                            />
                        ) : (
                            <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-4xl font-bold text-white border-4 border-border">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h3 className="font-bold text-foreground">{user.name}</h3>
                                <p className="text-muted-foreground text-sm mt-1">Student Account</p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Badge className={statusColor}>{user.status}</Badge>
                                <Badge className={genderColor}>{user.gender}</Badge>
                            </div>
                        </div>

                        {/* Quick Info */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
                            <div className="rounded-lg bg-background p-3">
                                <p className="text-xs text-muted-foreground">Registration No</p>
                                <p className="text-lg font-semibold text-foreground mt-1">{user.registrationNo}</p>
                            </div>
                            <div className="rounded-lg bg-background p-3">
                                <p className="text-xs text-muted-foreground">ID Number</p>
                                <p className="text-lg font-semibold text-foreground mt-1">{user.idNo}</p>
                            </div>
                            <div className="rounded-lg bg-background p-3">
                                <p className="text-xs text-muted-foreground">Batch</p>
                                <p className="text-lg font-semibold text-foreground mt-1">{profile?.batch?.batchNo}</p>
                            </div>
                            <div className="rounded-lg bg-background p-3">
                                <p className="text-xs text-muted-foreground">Blood Group</p>
                                <p className="text-lg font-semibold text-foreground mt-1">{profile?.bloodGroup || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-8 md:grid-cols-3">
                {/* Left Column */}
                <div className="md:col-span-2 space-y-6">
                    {/* Contact Information */}
                    <Card>
                        <CardHeader>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="w-fit">Edit info</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Edit Contact Information</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Update your email and phone number.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}>
                                            <FieldGroup className="gap-2">
                                                <div>
                                                    <label htmlFor="email" className="text-sm text-muted-foreground">Email</label>
                                                    <Input
                                                        id={"email"}
                                                        placeholder="Email"
                                                        type="email"
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        value={email}

                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="phone" className="text-sm text-muted-foreground">Phone</label>
                                                    <Input
                                                        id={"phone"}
                                                        placeholder="Phone"
                                                        type="text"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                    />

                                                </div>
                                            </FieldGroup>
                                            <FieldGroup className="gap-2 mt-2">
                                                {formError && (
                                                    <Alert variant="destructive">
                                                        <AlertCircleIcon className="h-4 w-4" />
                                                        <AlertTitle>{formError}</AlertTitle>
                                                    </Alert>
                                                )}
                                                {successMessage && (
                                                    <Alert className="text-green-800">
                                                        <AlertTitle>{successMessage}</AlertTitle>
                                                    </Alert>
                                                )}
                                            </FieldGroup>
                                        </form>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Close</AlertDialogCancel>
                                        <Button onClick={handleUpdate} disabled={loading}>
                                            {loading ? "Updating..." : "Update"}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <CardTitle className="flex items-center gap-2 text-xl font-fancy">
                                <Mail className="h-5 w-5 text-[#0052FF]" />
                                Contact Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                <div>
                                    <p className="text-xs text-muted-foreground">Email Address</p>
                                    <p className="text-foreground font-medium">{user.email}</p>
                                </div>
                            </div>
                            {profile?.phoneNumber && (
                                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                                    <Phone className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                                    <div>
                                        <p className="text-xs text-muted-foreground">Phone Number</p>
                                        <p className="text-foreground font-medium">{profile.phoneNumber}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Address Information */}
                    <Card>
                        <CardHeader>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button className="w-fit">Edit Address</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Edit Address Information</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Update your address details.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <div>
                                        <form onSubmit={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}>
                                            <FieldGroup className="gap-2">
                                                <div>
                                                    <label htmlFor="p-address" className="text-sm text-muted-foreground">Present Address</label>
                                                    <Input
                                                        id={"p-address"}
                                                        placeholder="Present address"
                                                        type="text"
                                                        onChange={(e) => setPresentAddress(e.target.value)}
                                                        value={presentAddress}

                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="par-address" className="text-sm text-muted-foreground">Permanent Address</label>
                                                    <Input
                                                        id={"par-address"}
                                                        placeholder="Permanent address"
                                                        type="text"
                                                        value={permanentAddress}
                                                        onChange={(e) => setPermanentAddress(e.target.value)}
                                                    />

                                                </div>
                                            </FieldGroup>
                                            <FieldGroup className="gap-2 mt-2">
                                                {formErrorAddr && (
                                                    <Alert variant="destructive">
                                                        <AlertCircleIcon className="h-4 w-4" />
                                                        <AlertTitle>{formErrorAddr}</AlertTitle>
                                                    </Alert>
                                                )}
                                                {successMessageAddr && (
                                                    <Alert className="text-green-800">
                                                        <AlertTitle>{successMessageAddr}</AlertTitle>
                                                    </Alert>
                                                )}
                                            </FieldGroup>
                                        </form>
                                    </div>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Close</AlertDialogCancel>
                                        <Button onClick={handleUpdateAddr} disabled={loading}>
                                            {loading ? "Updating..." : "Update"}
                                        </Button>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <CardTitle className="flex items-center gap-2 text-xl font-fancy">
                                <MapPin className="h-5 w-5 text-[#0052FF]" />
                                Address Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {profile?.presentAddress && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2">Present Address</p>
                                    <p className="text-foreground p-3 bg-muted/50 rounded-lg">{profile.presentAddress}</p>
                                </div>
                            )}
                            {profile?.permanentAddress && (
                                <div>
                                    <p className="text-xs text-muted-foreground mb-2">Permanent Address</p>
                                    <p className="text-foreground p-3 bg-muted/50 rounded-lg">{profile.permanentAddress}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Family Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-fancy">
                                <Users className="h-5 w-5 text-[#0052FF]" />
                                Family Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {profile?.fatherName && (
                                <div className="p-3 rounded-lg border border-border">
                                    <p className="text-xs text-muted-foreground mb-1">{`Father's Name`}</p>
                                    <p className="font-semibold text-foreground">{profile.fatherName}</p>
                                </div>
                            )}
                            {profile?.motherName && (
                                <div className="p-3 rounded-lg border border-border">
                                    <p className="text-xs text-muted-foreground mb-1">{`Mother's Name`}</p>
                                    <p className="font-semibold text-foreground">{profile.motherName}</p>
                                </div>
                            )}
                            {profile?.birthDate && (
                                <div className="p-3 rounded-lg border border-border">
                                    <p className="text-xs text-muted-foreground mb-1">Date of Birth</p>
                                    <p className="font-semibold text-foreground">{new Date(profile.birthDate).toLocaleDateString()}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Academic Background */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-xl font-fancy">
                                <GraduationCap className="h-5 w-5 text-[#0052FF]" />
                                Academic Background
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-4 md:grid-cols-2">
                                {profile?.schoolName && (
                                    <div className="p-4 rounded-lg border border-border">
                                        <p className="text-xs text-muted-foreground mb-2">School Name</p>
                                        <p className="font-semibold text-foreground">{profile.schoolName}</p>
                                        {profile.sscPassingYear && (
                                            <p className="text-sm text-muted-foreground mt-2">Year: {profile.sscPassingYear}</p>
                                        )}
                                        {profile.sscGpa && (
                                            <Badge className="mt-2">GPA: {profile.sscGpa}</Badge>
                                        )}
                                    </div>
                                )}
                                {profile?.collegeName && (
                                    <div className="p-4 rounded-lg border border-border">
                                        <p className="text-xs text-muted-foreground mb-2">College Name</p>
                                        <p className="font-semibold text-foreground">{profile.collegeName}</p>
                                        {profile.hscPassingYear && (
                                            <p className="text-sm text-muted-foreground mt-2">Year: {profile.hscPassingYear}</p>
                                        )}
                                        {profile.hscGpa && (
                                            <Badge className="mt-2">GPA: {profile.hscGpa}</Badge>
                                        )}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Academic Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-fancy">Academic Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <p className="text-xs text-muted-foreground">Batch</p>
                                <p className="text-lg font-semibold text-foreground mt-1">Batch {profile?.batch?.batchNo}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Department</p>
                                <p className="text-sm font-semibold text-foreground mt-1">{profile?.department?.name}</p>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Program</p>
                                <p className="text-sm font-semibold text-foreground mt-1">{profile?.program?.name}</p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Account Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-fancy">Account Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div>
                                <p className="text-xs text-muted-foreground">Role</p>
                                <Badge className="mt-1">Student</Badge>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Status</p>
                                <Badge className={`mt-1 ${statusColor}`}>{user.status}</Badge>
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">Member Since</p>
                                <p className="text-sm text-foreground mt-1">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}