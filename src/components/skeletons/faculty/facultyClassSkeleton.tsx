import { Skeleton } from "@/components/ui/skeleton";

export function FacultyClassSkeleton() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array(6).fill(0).map((_, index) => (
                <div
                    key={index}
                    className="rounded-lg cursor-pointer border border-border bg-card p-6 shadow-sm hover:shadow-md hover:border-foreground/30 transition-all duration-200 flex flex-col justify-between"
                >
                    <div className="mb-4 flex-1 pb-4 border-b border-border">
                        <div className="gap-4 flex flex-col mb-2">
                            <div className="flex gap-2 items-center">
                                <Skeleton className="w-12 h-4" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground line-clamp-2">
                                <Skeleton className="w-48 h-6" />
                            </h3>
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">
                                    <Skeleton className="w-24 h-4" />
                                </span>
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                        <Skeleton className="w-full h-10" />
                        <Skeleton className="w-full h-10" />
                    </div>
                </div>
            ))}
        </div>
    );
}
