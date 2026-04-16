"use client";
import { ISemester } from "@/@types/enrollment";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getSemesters } from "@/services/shared.service";
import { useEffect, useState } from "react";
import { BookOpen } from "lucide-react";
import { getResults } from "@/services/result.service";
import { ICourseResult } from "@/@types/result";
import AverageSgpa from "./AverageSgpa";
import { ResultPageSkeleton } from "@/components/skeletons/result/ResultPageSkeleton";
import { Skeleton } from "@/components/ui/skeleton";


export default function ResultPage() {
    const [selectedSemesterId, setSelectedSemesterId] = useState<string>("");

    const [semesters, setSemesters] = useState<ISemester[] | null>(null);
    const [results, setResults] = useState<ICourseResult[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchSemesters = async () => {
        try {
            const res = await getSemesters();
            if (!res.ok) {
                console.error("Failed to fetch semesters");
                setSemesters([]);
            } else {
                setSemesters(res.data as ISemester[]);
                if (res.data)
                    setSelectedSemesterId(res.data[0].id as string)
            }
        } catch (error) {
            console.error("Error fetching semesters:", error);
        }
    };

    const fetchResults = async (semesterId: string) => {
        if (!semesterId) {
            setResults(null);
            return;
        }
        try {
            setIsLoading(true);
            const res = await getResults(semesterId);
            if (!res.ok) {
                console.error("Failed to fetch results");
                setResults([]);
            } else {
                if (res.data) {
                    setResults(res.data);
                }
            }
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchSemesters();
    }, []);

    useEffect(() => {
        fetchResults(selectedSemesterId);
    }, [selectedSemesterId]);

    const getSelectedSemesterName = () => {
        return semesters?.find((s) => s.id === selectedSemesterId)?.name || "";
    };

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">My Results</h2>
                <p className="text-muted-foreground">
                    View your academic results for each semester
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

            {/* Result Table */}
            {
                isLoading || !semesters ?
                    <ResultPageSkeleton /> :
                    <div className="space-y-4">

                        {selectedSemesterId ? (results && results.length > 0 ? (
                            <div className="rounded-lg border border-border overflow-hidden">
                                <Table>
                                    <TableHeader className="bg-muted/50">
                                        <TableRow className="hover:bg-muted/50">
                                            <TableHead className="font-semibold">Course Code</TableHead>
                                            <TableHead className="font-semibold">Course Title</TableHead>
                                            <TableHead className="text-center font-semibold">CT1</TableHead>
                                            <TableHead className="text-center font-semibold">CT2</TableHead>
                                            <TableHead className="text-center font-semibold">Midterm</TableHead>
                                            <TableHead className="text-center font-semibold">Final</TableHead>
                                            <TableHead className="text-center font-semibold">Attend.</TableHead>
                                            <TableHead className="text-center font-semibold">Points</TableHead>
                                            <TableHead className="text-center font-semibold">Grade</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {results.map((result, idx) => (
                                            <TableRow key={idx} className="hover:bg-muted/30 transition-colors">
                                                <TableCell>
                                                    <span className="px-3 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/20 text-xs font-mono font-bold text-[#0052FF]">
                                                        {result.courseCode}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="font-medium text-foreground">{result.courseTitle}</TableCell>
                                                <TableCell className="text-center">
                                                    <span className="px-2 py-1 text-sm font-semibold">
                                                        {result.result.classTest1 || "N/A"}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="px-2 py-1 text-sm font-semibold">
                                                        {result.result.classTest2 || "N/A"}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="px-2 py-1 text-sm font-semibold">
                                                        {result.result.midterm || "N/A"}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="px-2 py-1 text-sm font-semibold">
                                                        {result.result.final || "N/A"}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="px-2 py-1 text-sm font-semibold">
                                                        {result.result.attendance ? `${result.result.attendance}` : "N/A"}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="px-3 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/20 text-sm font-bold text-[#0052FF]">
                                                        {result.result.points ? parseFloat(result.result.points).toFixed(2) : "N/A"}
                                                    </span>
                                                </TableCell>
                                                <TableCell className="text-center">
                                                    <span className="px-3 py-1 rounded-full bg-[#0052FF]/10 border border-[#0052FF]/20 text-sm font-bold text-[#0052FF]">
                                                        {result.result.grade || "N/A"}
                                                    </span>
                                                </TableCell>

                                            </TableRow>
                                        ))}
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-right font-semibold text-foreground pr-4">
                                                SGPA
                                            </TableCell>
                                            <TableCell colSpan={2} className="text-left font-semibold text-foreground pr-4">
                                                <AverageSgpa results={results} />
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>

                        ) : (
                            <div className="p-8 h-60 text-center text-muted-foreground flex flex-col items-center justify-center gap-4 rounded-lg border border-border">
                                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <p>No results available for this semester</p>
                            </div>
                        )
                        ) : (
                            <div className="p-8 text-center text-muted-foreground rounded-lg border border-border">
                                Please select a semester to view results
                            </div>
                        )}
                    </div>
            }
        </div>
    );
}