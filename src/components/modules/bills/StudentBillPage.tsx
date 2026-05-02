"use client";

import { IBillDetails } from "@/@types/bill";
import { ISemester } from "@/@types/enrollment";
import { getBills } from "@/services/payment.service";
import { getSemesters } from "@/services/shared.service";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import BillTable from "./billTable";
import StudentBillSkeleton from "@/components/skeletons/bills/BillPageSkeleton";
import { Card } from "@/components/ui/card";
import PaymentCard from "./PaymentCard";
export default function StudentBills() {
    const [selectedSemesterId, setSelectedSemesterId] = useState<string>("");

    const [semesters, setSemesters] = useState<ISemester[] | null>(null);
    const [bill, setBill] = useState<IBillDetails | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const getSelectedSemesterName = () => {
        return semesters?.find((s) => s.id === selectedSemesterId)?.name || "";
    };


    const fetchSemesters = async () => {
        try {
            const res = await getSemesters();
            if (!res.ok) {
                console.error("Failed to fetch semesters");
                setSemesters([]);
            } else {
                setSemesters(res.data as ISemester[]);
                if (res.data)
                    setSelectedSemesterId(res.data[0].id);
            }
        } catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };
    const fetchBills = async (semesterId: string) => {
        if (!semesterId) {
            setBill(null);
            return;
        }
        try {
            setIsLoading(true);
            const res = await getBills(semesterId);
            if (!res.ok) {
                toast.error(res.message || "Failed to fetch bills");
                setBill(null);
            } else {
                if (res.data) {
                    setBill(res.data);
                }
                else {
                    setBill(null);
                }
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error fetching bills:", error);
            toast.error(error.message || "An error occurred while fetching bills");
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        fetchBills(selectedSemesterId);
    }, [selectedSemesterId]);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchSemesters();
    }, []);
    console.log(bill)
    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">My Bills</h2>
                <p className="text-muted-foreground">
                    View your academic bills for each semester
                </p>
            </div>

            {/* Semester Selection */}
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1 max-w-xs">
                        <label className="text-sm font-medium text-foreground mb-2 block">
                            Select Semester
                        </label>
                        {
                            !semesters ?
                                <Skeleton className="w-31 h-8" />
                                :
                                <Select value={selectedSemesterId} onValueChange={setSelectedSemesterId}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Choose a semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {semesters?.map((semester) => (
                                            <SelectItem key={semester.id} value={semester.id}>
                                                {semester.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                        }
                    </div>
                </div>

                {/* Semester Info */}
                {selectedSemesterId && getSelectedSemesterName() ? (
                    <div className="text-sm text-muted-foreground">
                        Showing results for: <span className="font-medium text-foreground">{getSelectedSemesterName()}</span>
                    </div>
                ) :
                    <Skeleton className="w-56 h-4" />
                }
            </div>
            <div className="space-y-4">
                {/* Bill Details */}
                {
                    isLoading || !semesters ? (
                        <StudentBillSkeleton />
                    ) :
                        (
                            bill === null ?
                                <div className="text-center text-muted-foreground py-10 border border-muted/50 rounded-lg h-56 flex items-center justify-center">
                                    <p>No bills found for the selected semester.</p>
                                </div>
                                :
                                <BillTable bill={bill} />
                        )
                }

            </div>
            <div className="space-y-4">
                {/* Payment History */}
                <h2>Payments</h2>
                <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {
                        bill?.payments.map((payment, id) => (
                            <PaymentCard key={id} payment={payment} billId={bill?.id || ""} />
                        ))
                    }
                </section>
            </div>
        </div>
    );
}