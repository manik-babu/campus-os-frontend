"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import TakeAttendance from "./TakeAttendance";
import { IAttendanceData } from "@/@types/attendance";
import { useParams } from "next/navigation";
import { getStudents } from "@/services/facultyClass.service";


export default function TakeAttendancePage() {
    const { classId } = useParams();
    const [data, setData] = useState<IAttendanceData | null>(null);

    const fetchAttendanceData = async () => {
        try {
            const res = await getStudents(classId as string);
            if (res.ok && res.data) {
                setData(res.data);
            } else {
                toast.error(res.message || "Failed to fetch attendance data");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An unknown error occurred");
        }
    }

    useEffect(() => {
        fetchAttendanceData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [classId]);
    if (!data || !data.classDetails || !data.students) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <TakeAttendance students={data?.students} classDetails={data?.classDetails} />
        </div>
    );
}   