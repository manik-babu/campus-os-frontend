import { IBillDetails } from "@/@types/bill";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
export default function BillTable({ bill }: { bill: IBillDetails }) {
    return (
        <div className="rounded-lg border border-border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Particulars</TableHead>
                        <TableHead className="text-right">Amount (BDT)</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bill.billItems.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.name}</TableCell>
                            <TableCell className="text-right w-32">{parseFloat(item.totalAmount).toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                    <TableRow className="border-t font-semibold text-right bg-foreground/5">
                        <TableCell>Total Fees:</TableCell>
                        <TableCell className="text-right">{bill.totalAmount.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow className="border-t font-semibold text-right bg-foreground/5">
                        <TableCell>Total Paid:</TableCell>
                        <TableCell className="text-right">{bill.totalPayments.toFixed(2)}</TableCell>
                    </TableRow>
                    <TableRow className="border-t font-semibold text-right bg-foreground/5">
                        <TableCell>Total Due:</TableCell>
                        <TableCell className="text-right">{bill.dueAmount.toFixed(2)}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
}