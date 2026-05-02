import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

function StatCardSkeleton() {
    return (
        <Card className="p-6 border-0 shadow-md">
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-3" />
                    <Skeleton className="h-10 w-32" />
                </div>
                <Skeleton className="h-12 w-12 rounded-lg" />
            </div>
        </Card>
    );
}

function ChartSkeleton() {
    return (
        <Card>
            <div className="p-6 border-b">
                <Skeleton className="h-6 w-48 mb-2" />
                <Skeleton className="h-4 w-64" />
            </div>
            <div className="p-6">
                <div className="space-y-2">
                    {/* Chart bars skeleton */}
                    <div className="flex items-end gap-2 justify-between">
                        <div className="flex-1 flex flex-col items-center gap-2">
                            <Skeleton
                                className="w-full h-10"
                            />
                            <Skeleton className="h-3 w-20" />
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2">
                            <Skeleton
                                className="w-full h-16"
                            />
                            <Skeleton className="h-3 w-20" />
                        </div>
                        <div className="flex-1 flex flex-col items-center gap-2">
                            <Skeleton
                                className="w-full h-14"
                            />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-6 border-t space-y-2">
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3 w-64" />
            </div>
        </Card>
    );
}

export default function Loading() {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="py-8 space-y-3">
                <Skeleton className="h-10 w-40" />
                <Skeleton className="h-4 w-full max-w-md" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <StatCardSkeleton key={i} />
                ))}
            </div>

            {/* Chart Skeleton */}
            <ChartSkeleton />
        </div>
    );
}
