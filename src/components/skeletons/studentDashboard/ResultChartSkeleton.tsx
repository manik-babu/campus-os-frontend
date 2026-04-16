import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ResultChartSkeleton() {
    return (
        <Card className="animate-pulse">
            <CardHeader>
                <CardTitle><Skeleton className="h-4 w-40" /></CardTitle>
                <CardDescription><Skeleton className="h-3 w-56" /></CardDescription>
            </CardHeader>
            <CardContent>
                <Skeleton className="aspect-auto h-62 w-full" />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    <Skeleton className="h-4 w-40" />
                </div>
                <div className="leading-none text-muted-foreground">
                    <Skeleton className="h-3 w-96" />
                </div>
            </CardFooter>
        </Card>
    );
}