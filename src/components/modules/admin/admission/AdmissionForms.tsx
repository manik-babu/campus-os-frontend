"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAdmissionForms } from "@/services/admin.service";
import useAdmissionFormStore from "@/zustand/admission";
import { Search } from "lucide-react";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";
import FormDetails from "./FormDetails";
import FormCard from "./FormCard";
import { Button } from "@/components/ui/button";
import { AdmissionFormCardSkeleton } from "@/components/skeletons/AdmissionFormCard";

export default function AdmissionForms() {
    const data = useAdmissionFormStore(state => state.data);
    const filter = useAdmissionFormStore(state => state.filter);
    const setData = useAdmissionFormStore(state => state.setData);
    const setFilter = useAdmissionFormStore(state => state.setFilter);
    const [paginating, setPaginating] = useState(false);

    const [search, setSearch] = useState<string>(filter.search);
    const [sortBy, setSortBy] = useState<"asc" | "desc">(filter.sortBy);

    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        try {
            setLoading(true);
            const filterData = { search, sortBy, page: 1 };
            setFilter(filterData);
            const res = await getAdmissionForms(filterData);
            if (res.ok && res.data) {
                if (res.data?.meta.page === 1) {
                    setData(res.data);
                }
                else {
                    setData({
                        forms: [...(data?.forms || []), ...res.data.forms],
                        meta: res.data.meta,
                    });
                }
            } else {
                toast.error(res.message || "Failed to fetch admission forms");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while fetching admission forms");
        }
        finally {
            setLoading(false);
        }
    }
    const paginateData = async (pg: number) => {
        try {
            setPaginating(true);
            const filterData = { search, sortBy, page: pg };
            setFilter(filterData);
            const res = await getAdmissionForms(filterData);
            if (res.ok && res.data) {
                if (res.data?.meta.page === 1) {
                    setData(res.data);
                }
                else {
                    setData({
                        forms: [...(data?.forms || []), ...res.data.forms],
                        meta: res.data.meta,
                    });
                }
            } else {
                toast.error(res.message || "Failed to fetch admission forms");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error.message || "An error occurred while fetching admission forms");
        }
        finally {
            setPaginating(false);
        }
    }
    useEffect(() => {
        if (!data) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            fetchData();
        }
    }, []);
    const handlePagination = () => {
        if (data?.meta.page && data?.meta.page < data?.meta.totalPages) {
            const nextPage = data?.meta.page + 1;
            paginateData(nextPage);
        }
    }
    return (
        <div>
            <h3 className="mb-4">Admission Forms</h3>
            <div className="flex items-center gap-2 p-4 bg-card rounded-xl mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by code, title..."
                        className="pl-10"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                fetchData();
                            }
                        }}
                    />
                </div>
                <Select
                    value={sortBy}
                    onValueChange={(value) => { setSortBy(value as "asc" | "desc"); fetchData(); }}
                >
                    <SelectTrigger className="ml-2">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">
                            Oldest
                        </SelectItem>
                        <SelectItem value="desc">
                            Newest
                        </SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {
                loading ? (
                    <AdmissionFormCardSkeleton />
                ) : (
                    <div className="flex flex-col space-y-4">
                        {
                            data?.forms.length === 0 ? (
                                <p>No forms found.</p>
                            ) :
                                data?.forms.map((form) => (
                                    <FormCard key={form.id} form={form} />
                                ))
                        }
                        {
                            data &&
                            <div className="flex justify-center items-center my-8">
                                {
                                    paginating ? (
                                        <p>Loading...</p>
                                    ) :
                                        (data?.meta.page && data?.meta.page < data?.meta.totalPages) ?
                                            <Button variant={"outline"} onClick={handlePagination}>Load More</Button>
                                            :
                                            <p className="text-sm text-muted-foreground">No more forms to load.</p>
                                }
                            </div>
                        }
                    </div>
                )
            }
        </div>
    );
}