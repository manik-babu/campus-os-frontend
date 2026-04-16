import { Skeleton } from "@/components/ui/skeleton";

export default function AcademicRecordsSkeleton() {
    return (
        <div className="space-y-4 my-6 animate-pulse">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                <div className="rounded-lg p-4 bg-card">
                    <div className="text-sm text-muted-foreground">
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="text-2xl font-bold mt-1">
                        <Skeleton className="h-8 w-16" />
                    </div>
                </div>
                <div className="rounded-lg p-4 bg-card">
                    <div className="text-sm text-muted-foreground">
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="text-2xl font-bold mt-1">
                        <Skeleton className="h-8 w-16" />
                    </div>
                </div>
                <div className="rounded-lg p-4 bg-card">
                    <div className="text-sm text-muted-foreground">
                        <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="text-2xl font-bold mt-1">
                        <Skeleton className="h-8 w-16" />
                    </div>
                </div>
            </div>
        </div>
    );
}