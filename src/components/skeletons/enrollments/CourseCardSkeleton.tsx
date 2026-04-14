import { Skeleton } from "@/components/ui/skeleton";

export default function CourseCardSkeleton() {
    return (
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm flex flex-col">
            {/* Course Header */}
            <div className="mb-4 pb-4 border-b border-border">
                <div className="gap-4 flex flex-col mb-2">
                    {/* Badges */}
                    <div className="flex gap-2 items-center">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                    {/* Title */}
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-6 w-3/4" />
                    </div>
                </div>
            </div>

            {/* Course Details */}
            <div className="space-y-3 mb-6 flex-1">
                {/* Credits */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full flex-shrink-0" />
                    <Skeleton className="h-4 w-32" />
                </div>

                {/* Instructor */}
                <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-4 rounded-full flex-shrink-0" />
                    <Skeleton className="h-4 w-40" />
                </div>
            </div>

            {/* Button */}
            <Skeleton className="h-10 w-full rounded-md" />
        </div>
    );
}