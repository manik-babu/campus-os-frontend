"use client";
import { IEnrolledCourse, ISemester } from "@/@types/enrollment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getEnrolledCourses } from "@/services/enrollment.service";
import { getSemesters } from "@/services/shared.service";
import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getFacultyClasses } from "@/services/facultyClass.service";
import { IFacultyClass } from "@/@types/facultyClass";
import { FacultyClassSkeleton } from "@/components/skeletons/faculty/facultyClassSkeleton";
import ClassCard from "./ClassCard";


export default function FacultyClasses() {
    const [selectedSemesterId, setSelectedSemesterId] = useState<string>("");

    const [semesters, setSemesters] = useState<ISemester[] | null>(null);
    const [classes, setClasses] = useState<IFacultyClass[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const fetchClasses = async (semesterId: string) => {
        if (!semesterId) {
            setClasses(null);
            return;
        }
        try {
            setIsLoading(true);
            const res = await getFacultyClasses(semesterId);
            if (!res.ok) {
                console.error("Failed to fetch classes");
                setClasses([]);
            } else {
                if (res.data) {
                    setClasses(res.data);
                }
            }
        } catch (error) {
            console.error("Error fetching classes:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSemesters();
    }, []);

    useEffect(() => {
        fetchClasses(selectedSemesterId);
    }, [selectedSemesterId]);

    const getSelectedSemesterName = () => {
        return semesters?.find((s) => s.id === selectedSemesterId)?.name || "";
    };

    return (
        <div className="space-y-4">
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
                </div>

                {/* Semester Info */}
                {selectedSemesterId && getSelectedSemesterName() ? (
                    <div className="text-sm text-muted-foreground">
                        Showing results for: <span className="font-medium text-foreground">{getSelectedSemesterName()}</span>
                    </div>
                ) :
                    <Skeleton className="w-56 h-4" />
                }
            </div>

            {/* Courses Table */}
            {
                isLoading || !semesters ?
                    <FacultyClassSkeleton />
                    :
                    <div className="space-y-2">
                        <div>
                            {selectedSemesterId ? (
                                isLoading ? (
                                    <div className="p-8 text-center text-muted-foreground">
                                        Loading courses...
                                    </div>
                                ) : classes && classes.length > 0 ? (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {classes.map((classItem) => (
                                            <ClassCard key={classItem.id} classItem={classItem} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="p-8 h-60 text-center text-muted-foreground flex flex-col items-center justify-center gap-4">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p>No classes for this semester</p>
                                    </div>
                                )
                            ) : (
                                <div className="p-8 text-center text-muted-foreground">
                                    Please select a semester to view classes
                                </div>
                            )}
                        </div>
                    </div>
            }
        </div>
    );
}