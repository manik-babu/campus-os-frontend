"use client";

import { IAttendanceRecord, IStudentAttendanceData } from "@/@types/attendance";
import { getAttendance } from "@/services/faculty.service";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { months } from "@/data/attendance";
import AttendanceTableSkeleton from "@/components/skeletons/attendance/AttendanceTable";

export default function ViewStudentAttendance() {
    const { classId } = useParams();
    const [attendance, setAttendance] = useState<IStudentAttendanceData | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [year, setYear] = useState<string>((new Date().getFullYear()).toString());
    const [month, setMonth] = useState<string>((new Date().getMonth() + 1).toString());


    const fetchAttendance = async () => {
        setLoading(true);
        try {
            console.table({ classId, year, month });
            if (!classId || !year || !month) {
                toast.error("Class ID, Year, and Month are required to fetch attendance data");
                return;
            }
            const res = await getAttendance(classId as string, { year, month });
            if (res.ok && res.data) {
                setAttendance(res.data);
            } else {
                // Handle error case, e.g., show a toast or message
                toast.error(res.message || "Failed to fetch attendance data");
                console.error(res.message || "Failed to fetch attendance data");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error("An unexpected error occurred");
            console.error("An unexpected error occurred", error);
        }
        finally {
            setLoading(false);
        }
    }
    const getDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.getDate();
    }

    useEffect(() => {
        // Fetch attendance data for the given classId
        fetchAttendance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        fetchAttendance();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [month, year]);
    return (
        <div className="space-y-2">
            <div className="flex gap-2">
                <Select value={month} onValueChange={(value) => { setMonth(value); }}>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose a month" />
                    </SelectTrigger>
                    <SelectContent>
                        {months.map((month) => (
                            <SelectItem key={month.value} value={month.value.toString()}>
                                {month.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={year} onValueChange={(value) => { setYear(value); }}>
                    <SelectTrigger>
                        <SelectValue placeholder="Choose a year" />
                    </SelectTrigger>
                    <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i).map((y) => (
                            <SelectItem key={y} value={y.toString()}>
                                {y}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            {
                loading ?
                    <AttendanceTableSkeleton />
                    :
                    attendance && attendance.dates.length > 0 ? (
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50">
                                    <TableHead className="font-semibold w-28">Student ID</TableHead>
                                    <TableHead className="font-semibold">Name</TableHead>
                                    {
                                        attendance && attendance.dates.map((date) => (
                                            <TableHead key={date} className="font-semibold text-center">
                                                {getDate(date)}
                                            </TableHead>
                                        ))
                                    }
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {attendance && attendance.records.map((record: IAttendanceRecord) => (
                                    <TableRow key={record.studentIdNo} className="hover:bg-muted/50">
                                        <TableCell className="font-medium text-foreground">
                                            {record.studentIdNo}
                                        </TableCell>
                                        <TableCell className="text-foreground">
                                            {record.studentName}
                                        </TableCell>
                                        {
                                            record.attendance.map((status, index) => (
                                                <TableCell key={index} className="text-center text-muted-foreground">
                                                    {
                                                        status ? "P" : "A"
                                                    }
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )
                        :
                        <div className="flex justify-center items-center bg-card rounded-xl text-muted-foreground h-44">
                            No attendance data available for the selected month and year.
                        </div>
            }
        </div>
    );
}