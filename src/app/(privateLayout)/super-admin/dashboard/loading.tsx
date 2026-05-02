import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Loading() {
    return (
        <div className="min-h-screen bg-linear-to-b from-background to-muted/20 p-6 md:p-8 animate-pulse">
            {/* Header Skeleton */}
            <div className="mb-8">
                <Skeleton className="h-10 w-48 mb-2" />
                <Skeleton className="h-5 w-96" />
            </div>

            {/* Stats Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[...Array(5)].map((_, index) => (
                    <Card key={index}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex-1">
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-8 w-16" />
                                </div>
                                <Skeleton className="h-14 w-14 rounded-lg" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Department Table Skeleton */}
            <Card className="shadow-sm border border-border/50">
                <CardHeader className="border-b border-border/50">
                    <CardTitle><Skeleton className="h-7 w-48" /></CardTitle>
                    <CardDescription><Skeleton className="h-4 w-64 mt-2" /></CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="w-full">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow>
                                    <TableHead className="h-12 px-4 md:px-6">
                                        <Skeleton className="h-4 w-32" />
                                    </TableHead>
                                    <TableHead className="h-12 px-4 md:px-6 text-right">
                                        <Skeleton className="h-4 w-24 ml-auto" />
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {[...Array(8)].map((_, index) => (
                                    <TableRow key={index} className="border-b border-border/50 last:border-0">
                                        <TableCell className="px-4 md:px-6 py-4">
                                            <Skeleton className="h-4 w-40" />
                                        </TableCell>
                                        <TableCell className="px-4 md:px-6 py-4 text-right">
                                            <Skeleton className="h-8 w-20 ml-auto rounded-full" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}