import { ICourseResult } from "@/@types/result";

export default function AverageSgpa({ results }: { results: ICourseResult[] }) {
    const isAllResultsAvailable = results.every(result => result.result.grade !== null);

    if (isAllResultsAvailable) {
        const averageSgpa = results.reduce((acc, result) => {
            const points = parseFloat(result.result.points || "0");
            return acc + points;
        }, 0) / results.length;
        return (
            <>{averageSgpa.toFixed(2)}</>
        );
    }
    else {
        return (
            <>N/A</>
        );
    }
}