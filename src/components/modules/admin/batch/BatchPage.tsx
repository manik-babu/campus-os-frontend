"use client";

import { IBatch } from "@/@types/shared";
import AppField from "@/components/shared/AppField";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { addNewBatch } from "@/services/admin.service";
import { getSession } from "@/services/auth.service";
import { getUserDetails } from "@/services/common.service";
import { getBatches } from "@/services/shared.service";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BatchPage() {
    const [batches, setBatches] = useState<IBatch[] | null>(null);
    const [loading, setLoading] = useState(false);
    const [description, setDescription] = useState<string>("");
    const [addNew, setAddNew] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const fetchBatches = async () => {
        try {
            setLoading(true);
            const res = await getBatches();
            if (res.ok && res.data) {
                setBatches(res.data);
            } else {
                toast.error(res.message || "Failed to fetch batches");
                console.error("Failed to fetch batches:", res.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error("Error fetching batches:", error);
            toast.error(error.message || "An error occurred while fetching batches");
        }
        finally {
            setLoading(false);
        }
    }
    const handleAddBatch = async () => {
        try {
            if (!description.trim()) {
                toast.error("Description cannot be empty");
                return;
            }
            setIsAdding(true);
            const session = await getSession();
            if (!session || !session.departmentId) {
                toast.error("Only department admin can add a batch");
                return;
            }
            const data = {
                description: description.trim(),
                departmentId: session.departmentId,
            }
            const res = await addNewBatch(data);
            if (res.ok) {
                toast.success("Batch added successfully");
                setDescription("");
                setAddNew(false);
                fetchBatches();

            } else {
                toast.error(res.message || "Failed to add batch");
                console.error("Failed to add batch:", res.message);
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while adding the batch");
        } finally {
            setIsAdding(false);
        }
    }

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchBatches();
    }, []);
    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold">Manage Batches</h2>
                <p className="text-muted-foreground">Manage batches for your department.</p>
            </div>
            {
                addNew ? (
                    <section className="space-y-4">
                        <Textarea
                            placeholder="Enter batch description..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <p className="text-sm text-muted-foreground">
                            Add a new batch with the provided description. This will create a new batch for the department.
                        </p>
                        <div className="flex items-center gap-4">
                            <Button onClick={() => setDescription("")} variant={"outline"}>Cancel</Button>
                            <Button onClick={handleAddBatch}>
                                {
                                    isAdding ? <><Spinner /> Adding</> : <><Plus /> Add Batch</>
                                }
                            </Button>
                        </div>
                    </section>
                ) :
                    <Button onClick={() => setAddNew(true)}><Plus /> Add New Batch</Button>
            }
            <div className="mt-8">
                {loading ? (
                    <div>
                        {
                            Array.from({ length: 3 }).map((_, index) => (
                                <div key={index} className="border rounded-lg p-4 mb-4 animate-pulse">
                                    <Skeleton className="h-6 w-32 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                            ))
                        }
                    </div>
                ) : (
                    <div>
                        {batches && batches.length > 0 ? (
                            batches.map((batch) => (
                                <div key={batch.id} className="border rounded-lg p-4 mb-4">
                                    <h3 className="text-xl font-semibold">Batch {batch.batchNo}</h3>
                                    <p className="text-muted-foreground text-sm">{batch.description}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground my-8">No batches found.</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}