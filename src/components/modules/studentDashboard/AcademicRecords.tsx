/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IAcademicRecord } from "@/@types/studentDashboard";
import AcademicRecordsSkeleton from "@/components/skeletons/studentDashboard/AcademicRecordsSkeleton";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { getAcademicRecords } from "@/services/studentDashboard.service";
import { AlertCircleIcon, BookCheck, CircleCheckBig, CreditCard } from "lucide-react";
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
                <Card className={`p-6 border-0 shadow-md hover:shadow-lg transition-shadow duration-200 bg-linear-to-br from-green-50 to-green-100 `}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium mb-1">Completed Semesters</p>
                            <p className="text-4xl font-bold text-slate-900">{records.completedSemesters}</p>
                        </div>
                        <div className="text-slate-400 opacity-80">
                            <CircleCheckBig size={48} />
                        </div>
                    </div>
                </Card>
                <Card className={`p-6 border-0 shadow-md hover:shadow-lg transition-shadow duration-200 bg-linear-to-br from-blue-50 to-blue-100 `}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium mb-1">Completed Courses</p>
                            <p className="text-4xl font-bold text-slate-900">{records.completedCourses}</p>
                        </div>
                        <div className="text-slate-400 opacity-80">
                            <BookCheck size={48} />
                        </div>
                    </div>
                </Card>
                <Card className={`p-6 border-0 shadow-md hover:shadow-lg transition-shadow duration-200 bg-linear-to-br from-purple-50 to-purple-100 `}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-slate-600 text-sm font-medium mb-1">Earned Credits</p>
                            <p className="text-4xl font-bold text-slate-900">{records.earnedCredits}</p>
                        </div>
                        <div className="text-slate-400 opacity-80">
                            <CreditCard size={48} />
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
}