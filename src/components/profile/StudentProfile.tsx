"use client";

import { IStudentProfile, IUserDetails } from "@/@types/userDetails";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, BookOpen, Users, GraduationCap, Award } from "lucide-react";
import Image from "next/image";

export default function StudentProfile({ user }: { user: IUserDetails }) {
    const profile = user.studentProfile as IStudentProfile;

    const statusColor = user.status === "active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
    const genderColor = user.gender === "Male" ? "bg-blue-100 text-blue-800" : "bg-pink-100 text-pink-800";

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