"use client";

import { IStudentMarks } from "@/@types/facultyClass";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
const marksFor = ["CT 1", "Midterm", "CT 2", "Final", "Attend.", "Total"];

export default function StudentResultContainer({ studentMarks }: { studentMarks: IStudentMarks[] }) {
    return (
        <div>
            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold w-28">Student ID</TableHead>
                            <TableHead className="font-semibold">Name</TableHead>
                            {marksFor.map((mark) => (
                                <TableHead key={mark} className="font-semibold text-center">
                                    {mark}
                                </TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentMarks && studentMarks.map((student) => {
                            const totalMarks = [student.marks.classTest1, student.marks.midterm, student.marks.classTest2, student.marks.final]
                                .map(mark => mark ? parseFloat(mark) : 0)
                                .reduce((acc, mark) => acc + mark, 0);
                            return (
                                <TableRow key={student.studentId} className="hover:bg-muted/50">
                                    <TableCell className="font-medium">{student.studentIdNo}</TableCell>
                                    <TableCell>{student.studentName}</TableCell>
                                    <TableCell className="text-center">{student.marks.classTest1 || "N/A"}</TableCell>
                                    <TableCell className="text-center">{student.marks.midterm || "N/A"}</TableCell>
                                    <TableCell className="text-center">{student.marks.classTest2 || "N/A"}</TableCell>
                                    <TableCell className="text-center">{student.marks.final || "N/A"}</TableCell>
                                    <TableCell className="text-center">{student.marks.attendance || "N/A"}</TableCell>
                                    <TableCell className="text-center font-semibold">{totalMarks > 0 ? totalMarks.toFixed(2) : "N/A"}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}