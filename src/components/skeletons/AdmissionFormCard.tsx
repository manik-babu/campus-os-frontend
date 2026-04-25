import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function AdmissionFormCardSkeleton() {
    return (
        <div className="flex flex-col space-y-4 animate-pulse">
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <Card key={index} className="flex flex-row items-center gap-4 p-4">
                        <Skeleton className="w-25 h-25 rounded-md" />

                        <section className="flex-1">
                            <Skeleton className="h-6 w-32 mb-2" />
                            <Skeleton className="h-4 w-48" />
                        </section>
                    </Card>
                ))
            }
        </div>
    );
}
