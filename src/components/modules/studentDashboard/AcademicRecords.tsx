/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IAcademicRecord } from "@/@types/studentDashboard";
import AcademicRecordsSkeleton from "@/components/skeletons/studentDashboard/AcademicRecordsSkeleton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { getAcademicRecords } from "@/services/studentDashboard.service";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function AcademicRecords() {
    const [records, setRecords] = useState<IAcademicRecord | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchResult = async () => {
        setLoading(true);
        try {
            const res = await getAcademicRecords();
            if (!res.ok) {
                setFetchError(res.message || "Failed to fetch results.");
            } else {
                setRecords(res.data || null);
            }
        } catch (error: any) {
            console.error("An error occurred while fetching results:", error);
            setFetchError(error.message || "An unexpected error occurred while fetching results.");
        }
        finally {
            setLoading(false);
        }
    }

    // Fetch results when the component mounts
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchResult();
    }, []);
    if (fetchError) {
        return (
            <Alert variant={"destructive"}>
                <AlertCircleIcon />
                <AlertTitle>{fetchError}</AlertTitle>
            </Alert>
        )
    }

    if (loading || !records) {
        return <AcademicRecordsSkeleton />
    }
    return (
        <div className="space-y-4 my-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <div className="rounded-lg p-4 bg-card">
                    <p className="text-sm text-muted-foreground">Completed Semesters</p>
                    <p className="text-2xl font-bold text-blue-500 mt-1">
                        {records.completedSemesters}
                    </p>
                </div>
                <div className="rounded-lg p-4 bg-card">
                    <p className="text-sm text-muted-foreground">Completed Courses</p>
                    <p className="text-2xl font-bold text-green-500 mt-1">
                        {records.completedCourses}
                    </p>
                </div>
                <div className="rounded-lg p-4 bg-card">
                    <p className="text-sm text-muted-foreground">Earned Credits</p>
                    <p className="text-2xl font-bold text-purple-500 mt-1">
                        {records.earnedCredits}
                    </p>
                </div>
            </div>
        </div>
    );
}