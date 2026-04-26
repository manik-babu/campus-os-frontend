import { IResultClassDetails, IStudentMarks } from "@/@types/facultyClass";
import ResultHero from "@/components/modules/facultyResult/ResultHero";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getStudentMarks } from "@/services/faculty.service";
import { ResultMainPage } from "@/components/modules/facultyResult/ResultMainPage";

export default async function Result({ params }: { params: Promise<{ classId: string }> }) {
    const { classId } = await params;
    const res = await getStudentMarks(classId);
    if (!res.ok) {
        return (
            <ErrorPage message={res.message || "Failed to fetch student marks"} statusCode={res.status} />
        );
    }
    console.log(res.data);
    return (
        <div className="space-y-8">
            <ResultHero classDetails={res.data?.classDetails as IResultClassDetails} />
            <ResultMainPage studentMarks={res.data?.studentMarks as IStudentMarks[]} />
        </div>
    );
}