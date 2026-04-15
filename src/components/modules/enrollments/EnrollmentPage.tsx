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
import { EnrollmentPageSkeleton } from "@/components/skeletons/enrollments/EnrollmentPageSkeleton";


export default function EnrollmentPage() {
    const [selectedSemesterId, setSelectedSemesterId] = useState<string>("");

    const [semesters, setSemesters] = useState<ISemester[] | null>(null);
    const [enrollments, setEnrollments] = useState<IEnrolledCourse[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSemesters = async () => {
        try {
            const res = await getSemesters();
            if (!res.ok) {
                console.error("Failed to fetch semesters");
                setSemesters([]);
            } else {
                setSemesters(res.data as ISemester[]);
            }
        } catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };

    const fetchEnrollments = async (semesterId: string) => {
        if (!semesterId) {
            setEnrollments(null);
            return;
        }
        try {
            setIsLoading(true);
            const res = await getEnrolledCourses(semesterId);
            if (!res.ok) {
                console.error("Failed to fetch enrollments");
                setEnrollments([]);
            } else {
                if (res.data) {
                    setEnrollments(res.data);
                }
            }
        } catch (error) {
            console.error("Error fetching enrollments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSemesters();
    }, []);

    useEffect(() => {
        fetchEnrollments(selectedSemesterId);
    }, [selectedSemesterId]);

    const getSelectedSemesterName = () => {
        return semesters?.find((s) => s.id === selectedSemesterId)?.name || "";
    };

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
                    </div>

                    {/* Add Enrollment Button */}
                    <div className="flex items-end">
                        <Link href="/student/enrollments/enroll">
                            <Button className="w-full sm:w-auto gap-2">
                                <Plus className="h-4 w-4" />
                                Enroll Courses
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Semester Info */}
                {selectedSemesterId && getSelectedSemesterName() && (
                    <div className="text-sm text-muted-foreground">
                        Showing courses for: <span className="font-medium text-foreground">{getSelectedSemesterName()}</span>
                    </div>
                )}
            </div>

            {/* Courses Table */}
            {
                isLoading ?
                    <EnrollmentPageSkeleton /> :
                    <div className="space-y-4">
                        {selectedSemesterId && enrollments && enrollments.length > 0 && (
                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <div className="rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">Total Courses</p>
                                    <p className="text-2xl font-bold text-foreground mt-1">
                                        {enrollments.length}
                                    </p>
                                </div>
                                <div className="rounded-lg p-4">
                                    <p className="text-sm text-muted-foreground">Total Credits</p>
                                    <p className="text-2xl font-bold text-foreground mt-1">
                                        {enrollments.reduce((sum, e) => sum + (e.credits || 0), 0)}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="border rounded-lg overflow-hidden">
                            {selectedSemesterId ? (
                                isLoading ? (
                                    <div className="p-8 text-center text-muted-foreground">
                                        Loading courses...
                                    </div>
                                ) : enrollments && enrollments.length > 0 ? (
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-muted/50">
                                                <TableHead className="font-semibold">Course Code</TableHead>
                                                <TableHead className="font-semibold">Course Title</TableHead>
                                                <TableHead className="font-semibold text-center">Credits</TableHead>
                                                <TableHead className="font-semibold text-center">Instructor</TableHead>
                                                <TableHead className="font-semibold text-center">Status</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {enrollments.map((enrollment) => (
                                                <TableRow key={enrollment.id} className="hover:bg-muted/50">
                                                    <TableCell className="font-medium text-foreground">
                                                        {enrollment.courseCode}
                                                    </TableCell>
                                                    <TableCell className="text-foreground">
                                                        {enrollment.courseTitle}
                                                    </TableCell>
                                                    <TableCell className="text-center text-muted-foreground">
                                                        {enrollment.credits || "-"}
                                                    </TableCell>
                                                    <TableCell className="text-center text-muted-foreground">
                                                        {enrollment.facultyName || "-"}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                            Enrolled
                                                        </span>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                ) : (
                                    <div className="p-8 h-60 text-center text-muted-foreground flex flex-col items-center justify-center gap-4">
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                            <BookOpen className="h-6 w-6 text-muted-foreground" />
                                        </div>
                                        <p>No courses enrolled for this semester</p>
                                    </div>
                                )
                            ) : (
                                <div className="p-8 text-center text-muted-foreground">
                                    Please select a semester to view enrollments
                                </div>
                            )}
                        </div>
                    </div>
            }
        </div>
    );
}