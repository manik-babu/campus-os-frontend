"use client";
import { ISemester } from "@/@types/enrollment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getSemesters } from "@/services/shared.service";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ClassCardSkeleton from "@/components/skeletons/class/ClassCard";
import { toast } from "sonner";
import ClassCard from "./ClassCard";
import useFacultyClassStore from "@/zustand/facultyClass";
import { getFacultyClasses } from "@/services/facultyClass.service";


export default function FacultyClass() {
    const [isLoading, setIsLoading] = useState(false);

    const selectedSemesterId = useFacultyClassStore(state => state.selectedSemesterId);
    const semesters = useFacultyClassStore(state => state.semesters);
    const classes = useFacultyClassStore(state => state.classRooms);

    const setClassRooms = useFacultyClassStore(state => state.setClassRooms);
    const setSemesters = useFacultyClassStore(state => state.setSemesters);
    const setSelectedSemesterId = useFacultyClassStore(state => state.setSelectedSemesterId);

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

    const fetchclasses = async (semesterId: string) => {
        if (!semesterId) return;
        try {
            setIsLoading(true);
            const res = await getFacultyClasses(semesterId);
            if (!res.ok) {
                toast.error(res.message || "Failed to fetch enrolled courses");
            } else {
                if (res.data) {
                    // setclasses(res.data);
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
        if (classes === null) {
            fetchclasses(selectedSemesterId);
        }
    }, [selectedSemesterId]);
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">My classes</h2>
                <p className="text-muted-foreground">
                    View and manage your course classes for each semester
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
                                    onValueChange={(value) => { setSelectedSemesterId(value); fetchclasses(value); }}
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
                    isLoading || !classes ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <ClassCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : classes.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {classes.map((item) => (
                                <ClassCard key={item.id} classItem={item} />
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