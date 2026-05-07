"use client";

import { ICourseOffering } from "@/@types/enrollment";
import { BookOpen, Users } from "lucide-react";

export default function CourseCard({ course }: { course: ICourseOffering }) {
    return (
        <div
            key={course.id}
            className="rounded-lg justify-between border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-foreground/30 transition-all duration-200 flex flex-col"
        >
            {/* Course Header */}
            <div className="mb-4 flex-1 pb-4 border-b border-border">
                <div className="gap-4 flex flex-col mb-2">
                    <div className="flex gap-2 items-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 shrink-0 w-fit">
                            {course.course.code}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent text-blue-800 shrink-0 w-fit">
                            Batch {course.batch.batchNo}
                        </span>

                    </div>
                    <h3 className="text-lg font-bold text-foreground line-clamp-2">
                        {course.course.title}
                    </h3>
                </div>
            </div>

            {/* Course Details */}
            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{course.course.credits}</span> Credits
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{course.faculty.name}</span>
                    </span>
                </div>
            </div>

        </div>
    );
}