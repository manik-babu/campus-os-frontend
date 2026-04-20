"use client";

import { IEnrolledCourse } from "@/@types/enrollment";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";


export default function ClassCard({ classItem }: { classItem: IEnrolledCourse }) {
    const router = useRouter();
    return (
        <div
            onClick={() => router.push(`/student/class-rooms/${classItem.offeringId}`)}
            key={classItem.id}
            className="rounded-lg cursor-pointer border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-foreground/30 transition-all duration-200 flex flex-col justify-between"
        >
            {/* Course Header */}
            <div className="mb-4 flex-1 pb-4 border-b border-border">
                <div className="gap-4 flex flex-col mb-2">
                    <div className="flex gap-2 items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shrink-0 w-fit">
                            {classItem.courseCode}
                        </span>
                    </div>
                    <h3 className="text-lg font-bold text-foreground line-clamp-2">
                        {classItem.courseTitle}
                    </h3>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{classItem.facultyName}</span>
                </span>
            </div>
        </div>
    );
}