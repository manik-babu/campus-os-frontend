"use client";
import { ISemester } from "@/@types/enrollment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getEnrolledCourses } from "@/services/enrollment.service";
import { getSemesters } from "@/services/shared.service";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ClassCard from "./ClassCard";
import ClassCardSkeleton from "@/components/skeletons/class/ClassCard";
import useClassRoomsStore from "@/zustand/classRooms";
import { toast } from "sonner";


export default function ClassRoomLandingPage() {
    const [isLoading, setIsLoading] = useState(false);

    const selectedSemesterId = useClassRoomsStore(state => state.selectedSemesterId);
    const semesters = useClassRoomsStore(state => state.semesters);
    const enrollments = useClassRoomsStore(state => state.classRooms);

    const setClassRooms = useClassRoomsStore(state => state.setClassRooms);
    const setSemesters = useClassRoomsStore(state => state.setSemesters);
    const setSelectedSemesterId = useClassRoomsStore(state => state.setSelectedSemesterId);

    const fetchSemesters = async () => {
        try {
            const res = await getSemesters();
            if (!res.ok) {
                toast.error(res.message || "Failed to fetch semesters");
            } else {
                setSemesters(res.data as ISemester[]);
                if (res.data)
                    setSelectedSemesterId(res.data[0].id);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error fetching semesters:", error);
            toast.error(error.message || "An error occurred while fetching semesters");

        }
    };

    const fetchEnrollments = async (semesterId: string) => {
        if (!semesterId) return;
        try {
            setIsLoading(true);
            const res = await getEnrolledCourses(semesterId);
            if (!res.ok) {
                toast.error(res.message || "Failed to fetch enrolled courses");
            } else {
                if (res.data) {
                    // setEnrollments(res.data);
                    setClassRooms(res.data);
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while fetching enrolled courses");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (semesters === null)
            fetchSemesters();
    }, []);

    useEffect(() => {
        if (enrollments === null) {
            fetchEnrollments(selectedSemesterId);
        }
    }, [selectedSemesterId]);
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">My Enrollments</h2>
                <p className="text-muted-foreground">
                    View and manage your course enrollments for each semester
                </p>
            </div>

            {/* Semester Selection */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 max-w-xs">
                        <label className="text-sm font-medium text-foreground mb-2 block">
                            Select Semester
                        </label>
                        {
                            !semesters ?
                                <Skeleton className="w-32 h-8" />
                                :
                                <Select
                                    value={selectedSemesterId}
                                    onValueChange={(value) => { setSelectedSemesterId(value); fetchEnrollments(value); }}
                                >
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
                </div>
            </div>

            {/* Courses Table */}
            <div className="space-y-4">
                {
                    isLoading || !enrollments ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <ClassCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : enrollments.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {enrollments.map((enrollment) => (
                                <ClassCard key={enrollment.id} classItem={enrollment} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-border p-12 text-center">
                            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground mb-2">
                                No enrolled courses for this semester
                            </p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}