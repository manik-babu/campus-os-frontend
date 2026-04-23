"use client";

import { useState } from "react";
import TakeAttendancePage from "./Attendance";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ViewStudentAttendance from "./ViewStudentAttendance";

export default function MainAttendance() {
    const [takeAttendance, setTakeAttendance] = useState<boolean>(false);
    return (
        <div className="mt-8 space-y-4">
            <div className="flex gap-4">
                <Button variant={"outline"} onClick={() => setTakeAttendance(false)}>View Attendance</Button>
                <Button onClick={() => setTakeAttendance(true)}><Plus /> Take Attendance</Button>
            </div>
            {
                takeAttendance ?
                    <TakeAttendancePage />
                    :
                    <ViewStudentAttendance /> // Pass the actual classId here
            }
        </div>
    );
}