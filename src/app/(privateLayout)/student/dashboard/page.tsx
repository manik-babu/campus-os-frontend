import AcademicRecords from "@/components/modules/studentDashboard/AcademicRecords";
import ResultChart from "@/components/modules/studentDashboard/ResultChartPage";

export default function StudentDashboard() {
    return (
        <div>
            <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Student Dashboard</h2>
                <p className="text-muted-foreground">
                    View your academic progress, semester-wise SGPA trends, and more.
                </p>
            </div>
            <AcademicRecords />
            <ResultChart />
        </div>
    );
}