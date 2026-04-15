"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function ProfileSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Header Section */}
            <div className="rounded-lg border border-border bg-gradient-to-br from-card to-muted/30 p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    {/* Profile Image */}
                    <Skeleton className="h-32 w-32 rounded-2xl flex-shrink-0" />

                    {/* Profile Info */}
                    <div className="flex-1 space-y-4 w-full">
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-8 w-64" />
                                <Skeleton className="h-4 w-48" />
                            </div>
                            <div className="flex gap-2">
                                <Skeleton className="h-6 w-24 rounded-full" />
                                <Skeleton className="h-6 w-24 rounded-full" />
                            </div>
                        </div>

                        {/* Quick Info/Stats Grid */}
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mt-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="rounded-lg bg-background p-3 space-y-2">
                                    <Skeleton className="h-3 w-20" />
                                    <Skeleton className="h-6 w-32" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Optional Banner Section (for SuperAdmin) */}
            <div className="rounded-lg border-2 border-[#0052FF]/30 bg-gradient-to-r from-[#0052FF]/5 to-[#4D7CFF]/5 p-6 space-y-3">
                <div className="flex items-start gap-4">
                    <Skeleton className="h-6 w-6 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-6 w-64" />
                        <Skeleton className="h-4 w-full" />
                        <div className="grid gap-2 sm:grid-cols-2">
                            {[...Array(4)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-full" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Cards */}
            <div className="grid gap-8 md:grid-cols-3">
                {/* Left Column - Larger Cards */}
                <div className="md:col-span-2 space-y-6">
                    {[...Array(3)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-48" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[...Array(3)].map((_, j) => (
                                    <div key={j} className="space-y-2">
                                        <Skeleton className="h-3 w-24" />
                                        <Skeleton className="h-10 w-full" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Right Column - Smaller Cards */}
                <div className="space-y-6">
                    {[...Array(2)].map((_, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <Skeleton className="h-6 w-40" />
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[...Array(4)].map((_, j) => (
                                    <div key={j} className="space-y-2">
                                        <Skeleton className="h-3 w-20" />
                                        <Skeleton className="h-5 w-full" />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Additional Full-Width Card (for User Details) */}
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-40" />
                </CardHeader>
                <CardContent>
                    <div className="grid gap-6 md:grid-cols-2">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="space-y-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-6 w-full" />
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t border-border space-y-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}