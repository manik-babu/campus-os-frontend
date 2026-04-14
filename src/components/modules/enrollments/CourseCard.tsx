"use client";

import { ICourseOffering } from "@/@types/enrollment";
import { Button } from "@/components/ui/button";
import { enrollSingleCourse } from "@/services/enrollment.service";
import { BookOpen, Plus, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import AlertDialogSmallWithMedia from "@/components/shared/AlertDialog";

export default function CourseCard({ course }: { course: ICourseOffering }) {
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const handleEnrollCourse = async (courseId: string) => {
        setIsLoading(true);
        toast.loading("Enrolling in the course", {
            id: "enroll-course",
        });
        try {
            const res = await enrollSingleCourse(courseId);
            if (!res.ok) {
                toast.error(res.message || "Failed to enroll in the course", {
                    id: "enroll-course",
                });
            }
            else {
                toast.success(res.message, {
                    id: "enroll-course",
                    description: `You have successfully enrolled in ${res.data?.courseTitle}`,
                });
                setIsEnrolled(true);
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "Failed to enroll in the course", {
                id: "enroll-course",
            });
        }
        finally {
            setIsLoading(false);
        }
    };
    return (
        <div
            key={course.id}
            className="rounded-lg border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-foreground/30 transition-all duration-200 flex flex-col"
        >
            {/* Course Header */}
            <div className="mb-4 pb-4 border-b border-border">
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
            <div className="space-y-3 mb-6 flex-1">
                {/* Credits */}
                {course.course.credits && (
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{course.course.credits}</span> Credits
                        </span>
                    </div>
                )}

                {/* Instructor */}
                {course.faculty.name && (
                    <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                            <span className="font-medium text-foreground">{course.faculty.name}</span>
                        </span>
                    </div>
                )}
            </div>

            {/* Enroll Button */}
            <AlertDialogSmallWithMedia
                onAction={() => handleEnrollCourse(course.id)}
                actionText="Enroll"
                cancelText="Cancel"
                title={`Enroll in This Course?`}
                description={`Once enrolled, the course will be added to your academic dashboard.`}
                icon={<BookOpen className="h-6 w-6 text-muted-foreground" />}
            >
                <Button
                    variant={isEnrolled ? "outline" : "default"}
                    className="w-full gap-2"
                    disabled={isLoading}
                >
                    <Plus className="h-4 w-4" />
                    {isEnrolled ? "Enrolled" : "Enroll Course"}
                </Button>
            </AlertDialogSmallWithMedia>

        </div>
    );
}