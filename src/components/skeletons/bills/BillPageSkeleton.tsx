
import { Skeleton } from "@/components/ui/skeleton";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
export default function StudentBillSkeleton() {
    return (
        <div className="rounded-lg border border-border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>
                            <Skeleton className="h-4 w-20" />
                        </TableHead>
                        <TableHead className="flex">
                            <Skeleton className="h-4 w-24" />
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow >
                        <TableCell>
                            <Skeleton className="h-4 w-28" />
                        </TableCell>
                        <TableCell className=" w-32">
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell >
                            <Skeleton className="h-4 w-36" />
                        </TableCell>
                        <TableCell className=" w-32">
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell className=" w-32">
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                    </TableRow>

                    {/* Payment calculation */}
                    <TableRow className="border-t font-semibold text-right bg-foreground/5">
                        <TableCell className="flex justify-end">
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-26" />
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-t font-semibold text-right bg-foreground/5">
                        <TableCell className="flex justify-end">
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                    </TableRow>
                    <TableRow className="border-t font-semibold text-right bg-foreground/5">
                        <TableCell className="flex justify-end">
                            <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                            <Skeleton className="h-4 w-24" />
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}