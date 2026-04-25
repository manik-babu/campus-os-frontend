import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AddCourseOfferingPageSkeleton() {
    return (
        <div className="animate-pulse">
            <section className="mt-6">
                <Card className="max-w-2xl mx-auto p-4">
                    {/* Title */}
                    <div className="mb-6">
                        <Skeleton className="h-6 w-64 mb-2" />
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-6">
                        {/* Batch Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-12" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-3 w-96" />
                        </div>

                        {/* Course Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-3 w-96" />
                        </div>

                        {/* Faculty Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-10 w-full" />
                            <Skeleton className="h-3 w-96" />
                        </div>

                        {/* Credit Fees Field */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-10 w-48" />
                            <Skeleton className="h-3 w-96" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-row items-center justify-between mt-6">
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-40" />
                    </div>
                </Card>
            </section>
        </div>
    );
}
