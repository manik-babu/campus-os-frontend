"use client";

import { IUserDetails } from "@/@types/userDetails";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Shield, Calendar, Clock, Server } from "lucide-react";
import Image from "next/image";

export default function SuperAdminProfile({ user }: { user: IUserDetails }) {
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
                                className="h-32 w-32 rounded-2xl object-cover border-4 border-border shadow-lg"
                            />
                        ) : (
                            <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-[#0052FF] to-[#4D7CFF] flex items-center justify-center text-4xl font-bold text-white border-4 border-border shadow-lg">
                                {user.name.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1">
                        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-foreground">{user.name}</h3>
                                    <Badge className="bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white h-fit">
                                        <Shield className="h-4 w-4 mr-1" />
                                        Super Admin
                                    </Badge>
                                </div>
                                <p className="text-muted-foreground text-sm mt-1">System Administrator with Full Access</p>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <Badge className={statusColor}>{user.status}</Badge>
                                <Badge className={genderColor}>{user.gender}</Badge>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
                            <div className="rounded-lg bg-background p-3">
                                <p className="text-xs text-muted-foreground">User ID</p>
                                <p className="text-lg font-mono font-semibold text-foreground mt-1 truncate">{user.id.slice(0, 8)}...</p>
                            </div>
                            <div className="rounded-lg bg-background p-3">
                                <p className="text-xs text-muted-foreground">Registration No</p>
                                <p className="text-lg font-semibold text-foreground mt-1">{user.registrationNo}</p>
                            </div>
                            <div className="rounded-lg bg-background p-3">
                                <p className="text-xs text-muted-foreground">ID Number</p>
                                <p className="text-lg font-semibold text-foreground mt-1">{user.idNo}</p>
                            </div>
                            <div className="rounded-lg bg-background p-3">
                                <p className="text-xs text-muted-foreground">Access Level</p>
                                <p className="text-lg font-semibold text-[#0052FF] mt-1">Full</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Admin Privileges Banner */}
            <div className="rounded-lg border-2 border-[#0052FF]/30 bg-gradient-to-r from-[#0052FF]/5 to-[#4D7CFF]/5 p-6">
                <div className="flex items-start gap-4">
                    <Shield className="h-6 w-6 text-[#0052FF] flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="font-bold text-[#0052FF] text-lg mb-2">System Administrator Privileges</h3>
                        <p className="text-muted-foreground text-sm mb-3">This account has unrestricted access to all system functions and administrative controls.</p>
                        <div className="grid gap-2 sm:grid-cols-2 text-sm">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#0052FF]"></div>
                                <span>Full System Access</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#0052FF]"></div>
                                <span>User Management</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#0052FF]"></div>
                                <span>System Configuration</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-[#0052FF]"></div>
                                <span>Audit Logs</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-8 md:grid-cols-2">
                {/* Account Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-fancy">
                            <Mail className="h-5 w-5 text-[#0052FF]" />
                            Account Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">Email Address</p>
                            <div className="p-3 rounded-lg border border-border bg-muted/50">
                                <p className="font-medium text-foreground break-all">{user.email}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">Role</p>
                            <Badge className="bg-gradient-to-r from-[#0052FF] to-[#4D7CFF] text-white">
                                <Shield className="h-4 w-4 mr-1" />
                                {user.role}
                            </Badge>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">Account Status</p>
                            <Badge className={statusColor}>{user.status}</Badge>
                        </div>
                    </CardContent>
                </Card>

                {/* System Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl font-fancy">
                            <Server className="h-5 w-5 text-[#0052FF]" />
                            System Information
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">Account Created</p>
                            <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/50">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <p className="text-foreground font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">Last Updated</p>
                            <div className="flex items-center gap-2 p-3 rounded-lg border border-border bg-muted/50">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <p className="text-foreground font-medium">{new Date(user.updatedAt).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* User Details Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-fancy">User Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">Full Name</p>
                            <p className="text-lg font-semibold text-foreground">{user.name}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">Registration Number</p>
                            <p className="text-lg font-semibold text-foreground">{user.registrationNo}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">ID Number</p>
                            <p className="text-lg font-semibold text-foreground">{user.idNo}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-2">Gender</p>
                            <Badge className={genderColor}>{user.gender}</Badge>
                        </div>
                    </div>
                    <div className="mt-6 pt-6 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-2">User ID</p>
                        <p className="text-sm font-mono text-foreground break-all p-3 rounded-lg bg-muted/50">{user.id}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}