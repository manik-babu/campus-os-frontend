import ClassDetails from "@/components/modules/faculty/ClassDetails";
import MainAttendance from "@/components/modules/faculty/MainAttendance";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getStudents } from "@/services/facultyClass.service";

export default async function Page({ params }: { params: Promise<{ classId: string }> }) {
    const { classId } = await params;
    const res = await getStudents(classId);
    if (!res.ok || !res.data) {
        return <ErrorPage message={res.message || "Failed to fetch attendance data"} statusCode={res.status} />
    }
    return (
        <div>
            <ClassDetails classDetails={res.data.classDetails} />
            <MainAttendance />
        </div>
    );
}