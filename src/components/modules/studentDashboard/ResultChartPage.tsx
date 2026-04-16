/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IStudentResultChartData } from "@/@types/studentDashboard";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { getStudentResults } from "@/services/studentDashboard.service";
import { AlertCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { StudentResultChart } from "./ResultChart";
import ResultChartSkeleton from "@/components/skeletons/studentDashboard/ResultChartSkeleton";

export default function ResultChart() {
    const [result, setResult] = useState<IStudentResultChartData[] | null>(null);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchResult = async () => {
        setLoading(true);
        try {
            const res = await getStudentResults();
            if (!res.ok) {
                setFetchError(res.message || "Failed to fetch results.");
            } else {
                setResult(res.data || []);
            }
        } catch (error: any) {
            console.error("An error occurred while fetching results:", error);
            setFetchError(error.message || "An unexpected error occurred while fetching results.");
        }
        finally {
            setLoading(false);
        }
    }

    // Fetch results when the component mounts
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchResult();
    }, []);
    if (fetchError) {
        return (
            <Alert variant={"destructive"}>
                <AlertCircleIcon />
                <AlertTitle>{fetchError}</AlertTitle>
            </Alert>
        )
    }

    if (loading || !result) {
        return <ResultChartSkeleton />
    }
    if (result.length === 0) {
        return (
            <Alert variant={"default"}>
                <AlertCircleIcon />
                <AlertTitle>No results available</AlertTitle>
                Your semester results will appear here once they are available.
            </Alert>
        )
    }

    return (
        <StudentResultChart chartData={result} />
    )

}