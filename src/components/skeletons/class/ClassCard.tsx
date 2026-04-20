import { Skeleton } from "@/components/ui/skeleton";

export default function ClassCardSkeleton() {
    return (
        <div className="rounded-lg animate-pulse cursor-pointer border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-foreground/30 transition-all duration-200 flex flex-col justify-between">
            <div className="mb-4 flex-1 pb-4 border-b border-border">
                <div className="gap-4 flex flex-col mb-2">
                    <Skeleton className="w-24 h-6 rounded-full" />
                    <Skeleton className="w-full h-4" />
                    <Skeleton className="w-1/2 h-4" />
                </div>
            </div>
            <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 text-muted-foreground shrink-0" />
                <Skeleton className="h-4 w-40 text-muted-foreground shrink-0" />
            </div>
        </div>
    );
}