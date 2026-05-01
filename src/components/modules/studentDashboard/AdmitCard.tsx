"use client";

import { ISemester } from "@/@types/enrollment";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { env } from "@/env";
import { getSession } from "@/services/auth.service";
import { getAdmitCard } from "@/services/common.service";
import { getSemesters } from "@/services/shared.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AdmitCard() {
    const [semesters, setSemesters] = useState<ISemester[] | null>(null);

    const [selectedSemesterId, setSelectedSemesterId] = useState<string>("");
    const [selectedExam, setSelectedExam] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const fetchSemesters = async () => {
        try {
            const res = await getSemesters();
            if (!res.ok) {
                console.error("Failed to fetch semesters");
                setSemesters([]);
            } else {
                setSemesters(res.data as ISemester[]);
                if (res.data)
                    setSelectedSemesterId(res.data[0].id);
            }
        } catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSemesters();
    }, []);
    const handleDownloadAdmitCard = async () => {
        if (!selectedSemesterId || !selectedExam) {
            toast.error("Please select both semester and exam type");
            return;
        }
        setLoading(true);
        const session = await getSession();
        try {
            const blob = await getAdmitCard(selectedSemesterId, selectedExam as "Midterm" | "Final", session?.idNo);
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link and trigger download
            const link = document.createElement('a');
            link.href = url;
            link.download = `${session?.idNo}_${selectedExam}_Admit_Card.pdf`;
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Failed to download admit card");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            {/* Header Section */}
            <div className="space-y-2 mb-6">
                <h2 className="text-3xl font-bold text-foreground">My Enrollments</h2>
                <p className="text-muted-foreground">
                    View and manage your course enrollments for each semester
                </p>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex-1 max-w-xs">
                    <label className="text-sm font-medium text-foreground mb-2 block">
                        Select Semester
                    </label>
                    {
                        !semesters ?
                            <Skeleton className="w-32 h-8" />
                            :
                            <Select value={selectedSemesterId} onValueChange={setSelectedSemesterId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose a semester" />
                                </SelectTrigger>
                                <SelectContent>
                                    {semesters?.map((semester) => (
                                        <SelectItem key={semester.id} value={semester.id}>
                                            {semester.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                    }
                </div>
                <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                        Select Exam
                    </label>
                    {
                        !semesters ?
                            <Skeleton className="w-32 h-8" />
                            :
                            <Select value={selectedExam} onValueChange={setSelectedExam}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Choose exam" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value={"Midterm"}>
                                        Midterm
                                    </SelectItem>
                                    <SelectItem value={"Final"}>
                                        Final
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                    }
                </div>
            </div>
            <div>
                <Button className="mt-4" disabled={!selectedSemesterId || !selectedExam || loading} onClick={handleDownloadAdmitCard}>
                    {
                        loading ? <><Spinner /> Downloading...</> : "Download Admit Card"
                    }
                </Button>
            </div>
        </div>
    );
}