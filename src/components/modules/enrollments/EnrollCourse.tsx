"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICourseOfferingsData } from "@/@types/enrollment";
import { IBatch } from "@/@types/shared";
import { getCourseOfferings } from "@/services/enrollment.service";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search, BookOpen, Loader } from "lucide-react";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "@/components/skeletons/enrollments/CourseCardSkeleton";

export default function EnrollCourse({ courseOfferings, batches: initialBatches }: { courseOfferings: ICourseOfferingsData; batches: IBatch[] }) {
    const [offerings, setOfferings] = useState<ICourseOfferingsData>(courseOfferings);
    const [batches, setbatches] = useState<IBatch[]>([{ id: "all", batchNo: "All Batch" }, ...initialBatches]);
    const [selectedBatchId, setSelectedBatchId] = useState<string>("all");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchOfferings = async () => {
        setLoading(true);
        try {
            const res = await getCourseOfferings({ search: search, batchId: selectedBatchId });
            if (!res.ok) {
                toast.error(res.message || "Failed to fetch course offerings");
            }
            else {
                setOfferings(res.data as ICourseOfferingsData);
                console.log(res.data)
            }
        } catch (error: any) {
            toast.error(error.message || "An error occurred while fetching course offerings");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchOfferings();
    }, [selectedBatchId]);

    const getSelectedBatchName = () => {
        return batches.find((b) => b.id === selectedBatchId)?.batchNo || "";
    };
    const handleKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            fetchOfferings();
        }
    };

    const courses = offerings.courses || [];

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Add New Courses</h2>
                <p className="text-muted-foreground max-w-2xl">
                    Browse and add available courses to your enrollment. Select your batch and search for courses to get started.
                </p>
            </div>

            {/* Filters Section */}
            <div className="space-y-4">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                    {/* Batch Selection */}
                    <div className="flex-1">
                        <label className="text-sm font-medium text-foreground mb-2 block">
                            Select Batch
                        </label>
                        <Select value={selectedBatchId} onValueChange={setSelectedBatchId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose your batch" />
                            </SelectTrigger>
                            <SelectContent>
                                {batches?.map((batch) => (
                                    <SelectItem key={batch.id} value={batch.id}>
                                        {batch.batchNo}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Search Bar */}
                    <div className="flex-1">
                        <label className="text-sm font-medium text-foreground mb-2 block">
                            Search Courses
                        </label>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                placeholder="Search by code, title..."
                                className="pl-10"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={handleKeydown}
                            />
                        </div>
                    </div>
                </div>

                {/* Filter Info */}
                {selectedBatchId && (
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border">
                        <div className="text-sm">
                            <span className="text-muted-foreground">Batch: </span>
                            <span className="font-medium text-foreground">{getSelectedBatchName()}</span>
                            {search && (
                                <>
                                    <span className="text-muted-foreground"> • Search: </span>
                                    <span className="font-medium text-foreground">{`"${search}"`}</span>
                                </>
                            )}
                        </div>
                        <div className="text-sm font-medium text-foreground">
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <Loader className="h-4 w-4 animate-spin" />
                                    Loading...
                                </div>
                            ) : (
                                <>{courses.length} course{courses.length !== 1 ? "s" : ""}</>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Courses Section */}
            <div className="space-y-4">
                {
                    loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {Array.from({ length: 6 }).map((_, index) => (
                                <CourseCardSkeleton key={index} />
                            ))}
                        </div>
                    ) : courses.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course) => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-lg border border-dashed border-border p-12 text-center">
                            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                            <p className="text-muted-foreground mb-2">
                                {search ? "No courses match your search" : "No courses available for this batch"}
                            </p>
                            {search && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setSearch("")}
                                >
                                    Clear search
                                </Button>
                            )}
                        </div>
                    )
                }
            </div>
        </div>
    );
}
