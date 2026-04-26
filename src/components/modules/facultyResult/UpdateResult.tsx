"use client"

import { IStudentMarks } from "@/@types/facultyClass";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { updateStudentMarks } from "@/services/faculty.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface UpdateResultProps {
    studentMarks: IStudentMarks[];
    markName: keyof IStudentMarks["marks"];
    label: string;
}
export default function UpdateResult({ studentMarks, markName, label }: UpdateResultProps) {
    const [isUpdating, setIsUpdating] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [marks, setMarks] = useState<Record<string, string | null>>({})

    useEffect(() => {
        const mrk = studentMarks.reduce((acc, student) => {
            acc[student.enrollmentId] = student.marks[markName];
            return acc;
        }, {} as Record<string, string | null>);

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMarks(mrk);
    }, [openUpdate]);
    const handleSubmit = async () => {
        try {
            const mark = () => {
                switch (markName) {
                    case "classTest1":
                        return { minMark: 0, maxMark: 10 };
                    case "classTest2":
                        return { minMark: 0, maxMark: 10 };
                    case "midterm":
                        return { minMark: 0, maxMark: 30 };
                    case "final":
                        return { minMark: 0, maxMark: 40 };
                    default:
                        return { minMark: 0, maxMark: 0 };
                }
            }
            const { minMark, maxMark } = mark();
            const isInvalid = Object.values(marks).some(mark => {
                const numMark = parseFloat(mark || "0");
                return isNaN(numMark) || numMark < minMark || numMark > maxMark;
            });
            if (isInvalid) {
                toast.error(`Please enter valid marks between ${minMark} and ${maxMark}`);
                return;
            }
            const formattedData = Object.entries(marks).map(([enrollmentId, mark]) => ({
                enrollmentId,
                mark: {
                    [markName]: mark ? parseFloat(mark) : null
                }
            }));
            setIsUpdating(true);
            const res = await updateStudentMarks(formattedData);
            if (!res.ok) {
                toast.error(res.message || "Failed to update marks");
            }
            else {
                toast.success(res.message || "Marks updated successfully", {
                    description: "Please refresh the page to see the updated marks"
                });
                setOpenUpdate(false);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An unknown error occurred");
        }
        finally {
            setIsUpdating(false);
        }

    }
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <Button variant={openUpdate ? "outline" : "default"} onClick={() => setOpenUpdate(!openUpdate)}>
                    {openUpdate ? "Cancel" : "Update"}
                </Button>
                <Button className={cn(openUpdate ? "block" : "hidden")} onClick={handleSubmit}>
                    {isUpdating ? "Cancel" : "Submit"}
                </Button>
            </div>
            <div className="rounded-lg border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold w-28">Student ID</TableHead>
                            <TableHead className="font-semibold w-64">Name</TableHead>
                            <TableHead className="font-semibold ">
                                {label}
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {studentMarks && studentMarks.map((student) => {
                            return (
                                <TableRow key={student.studentId} className="hover:bg-muted/50">
                                    <TableCell className="font-medium">{student.studentIdNo}</TableCell>
                                    <TableCell>{student.studentName}</TableCell>
                                    {
                                        openUpdate ?
                                            <TableCell >
                                                <Input
                                                    type="number"
                                                    defaultValue={marks[student.enrollmentId] || ""}
                                                    onChange={(e) => {
                                                        setMarks({
                                                            ...marks,
                                                            [student.enrollmentId]: e.target.value
                                                        })
                                                    }}
                                                />
                                            </TableCell>
                                            :
                                            <TableCell >{student.marks[markName] || "N/A"}</TableCell>
                                    }
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}