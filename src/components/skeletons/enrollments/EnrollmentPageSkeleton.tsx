import { Skeleton } from "@/components/ui/skeleton";
import { TableBody, TableCell, TableHead, TableHeader, TableRow, Table } from "@/components/ui/table";

export function EnrollmentPageSkeleton() {
    return (
        <div className="space-y-8 animate-pulse">
            {/* Stats Cards Skeleton */}
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="rounded-lg p-4 border border-border">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-8 w-16" />
                        </div>
                    ))}
                </div>

                {/* Table Skeleton */}
                <div className="border rounded-lg overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead>
                                    <Skeleton className="h-4 w-20" />
                                </TableHead>
                                <TableHead>
                                    <Skeleton className="h-4 w-32" />
                                </TableHead>
                                <TableHead className="text-center">
                                    <Skeleton className="h-4 w-16 mx-auto" />
                                </TableHead>
                                <TableHead className="text-center">
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </TableHead>
                                <TableHead className="text-center">
                                    <Skeleton className="h-4 w-16 mx-auto" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, i) => (
                                <TableRow key={i} className="hover:bg-muted/50">
                                    <TableCell>
                                        <Skeleton className="h-4 w-16" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-4 w-40" />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Skeleton className="h-4 w-8 mx-auto" />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Skeleton className="h-4 w-24 mx-auto" />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <Skeleton className="h-6 w-20 mx-auto rounded-full" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
