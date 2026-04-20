"use client";

import { IAttendanceStudent, IClassDetails } from "@/@types/attendance";
import { DatePickerSimple } from "@/components/shared/DatePicker";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { takeAttendance } from "@/services/faculty.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";


export default function TakeAttendance({ students, classDetails }: { students: IAttendanceStudent[]; classDetails: IClassDetails }) {
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [attendanceData, setAttendanceData] = useState<Record<string, boolean>>({});

    // Initialize attendanceData when students change
    useEffect(() => {
        const initialData = students.reduce((acc, student) => {
            acc[student.enrollmentId] = false; // Default to absent
            return acc;
        }, {} as Record<string, boolean>);
        setAttendanceData(initialData);
    }, [students]);
    const handleToggleAttendance = (enrollmentId: string) => {
        setAttendanceData((prev) => ({
            ...prev,
            [enrollmentId]: !prev[enrollmentId],
        }));
    };

    const handleAttendance = async () => {
        const data = Object.entries(attendanceData).map(([enrollmentId, isPresent]) => ({
            date: date ? date.toISOString() : new Date().toISOString(),
            enrollmentId,
            isPresent,
            courseOfferingId: classDetails.classId,
        }));
        console.table(data);
        setLoading(true);

        try {
            const res = await takeAttendance(data);
            if (res.ok) {
                toast.success(res.message || "Attendance recorded successfully");
            } else {
                console.log(res);
                toast.error(res.message || "Failed to record attendance");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while recording attendance");
        } finally {
            setLoading(false);
        }
    };

    const presentCount = Object.values(attendanceData).filter(Boolean).length;
    const totalCount = students.length;

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div className="flex-1">
                    <DatePickerSimple
                        date={date}
                        setDate={setDate}
                        label="Select date for attendance"
                        setTimeToEndOfDay={true}
                    />
                </div>
                <div className="text-sm">
                    <span className="font-semibold ">
                        {presentCount}
                    </span>
                    {" / "}
                    <span className="font-semibold">{totalCount}</span>
                    {" students marked present"}
                </div>
            </div>

            {/* Table Section */}
            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold text-center w-32">Status</TableHead>
                            <TableHead className="font-semibold w-48">Student ID</TableHead>
                            <TableHead className="font-semibold">Name</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.enrollmentId} className="hover:bg-muted/50">
                                <TableCell className="font-medium text-foreground text-center w-32">
                                    <Button
                                        onClick={() => handleToggleAttendance(student.enrollmentId)}
                                        variant={attendanceData[student.enrollmentId] ? "default" : "outline"}
                                    >
                                        {attendanceData[student.enrollmentId] ? "Present" : "Absent"}
                                    </Button>
                                </TableCell>
                                <TableCell className="text-foreground w-48">
                                    {student.studentIdNo}
                                </TableCell>
                                <TableCell className="text-foreground">
                                    {student.studentName}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Action Section */}
            <div className="flex justify-end gap-3">
                <Button
                    variant="outline"
                    onClick={() => {
                        setAttendanceData(
                            students.reduce((acc, student) => {
                                acc[student.enrollmentId] = false;
                                return acc;
                            }, {} as Record<string, boolean>)
                        );
                    }}
                    disabled={loading}
                >
                    Clear All
                </Button>
                <Button
                    onClick={handleAttendance}
                    disabled={!date || loading}
                >
                    {loading ? "Submitting..." : "Submit Attendance"}
                </Button>
            </div>
        </div>
    );
}