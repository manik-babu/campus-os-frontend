"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

export default function AttendanceTableSkeleton() {
    // Generate 8 skeleton rows
    const skeletonRows = Array.from({ length: 8 }, (_, i) => i);

    // Generate 6 date columns for skeleton
    const dateColumns = Array.from({ length: 6 }, (_, i) => i);

    return (
        <div className="w-full rounded-lg border border-border bg-card overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50">
                        <TableHead className="font-semibold w-28">
                            <Skeleton className="h-5 w-20" />
                        </TableHead>
                        <TableHead className="font-semibold">
                            <Skeleton className="h-5 w-32" />
                        </TableHead>
                        {dateColumns.map((date) => (
                            <TableHead key={date} className="font-semibold text-center">
                                <Skeleton className="h-5 w-16 mx-auto" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {skeletonRows.map((row) => (
                        <TableRow key={row} className="hover:bg-muted/50">
                            <TableCell className="font-medium">
                                <Skeleton className="h-4 w-24" />
                            </TableCell>
                            <TableCell>
                                <Skeleton className="h-4 w-40" />
                            </TableCell>
                            {dateColumns.map((date) => (
                                <TableCell key={date} className="text-center">
                                    <Skeleton className="h-4 w-8 mx-auto" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}