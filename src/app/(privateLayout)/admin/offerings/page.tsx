import { ICourses } from "@/@types/admin";
import { ISemester } from "@/@types/enrollment";
import { IFacultyShort } from "@/@types/public";
import { IBatch } from "@/@types/shared";
import CourseOfferingPage from "@/components/modules/admin/course/OfferingPage";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getCourses } from "@/services/admin.service";
import { getSession } from "@/services/auth.service";
import { getFacultiesShort } from "@/services/public.service";
import { getBatches, getSemesters } from "@/services/shared.service";

export default async function Offerings() {
    const session = await getSession();
    if (!session || !session.departmentId) {
        return <ErrorPage message="Unauthorized access. Please login to access this page." />
    }
    const [courses, batches, faculties, semesters] = await Promise.all([getCourses(session?.departmentId), getBatches(), getFacultiesShort(session?.departmentId), getSemesters()]);
    console.log({
        faculties
    })
    if (!courses.ok || !batches.ok || !faculties.ok || !semesters.ok) {
        return <ErrorPage message="Failed to load data. Please try again later." />
    }
    const sortedCourses = courses.data?.sort((a, b) => a.title.localeCompare(b.title));
    const sortedFaculties = faculties.data?.sort((a, b) => a.idNo.localeCompare(b.idNo));
    console.log({
        semesters
    })
    return (
        <CourseOfferingPage courses={sortedCourses as ICourses[]} batches={batches.data as IBatch[]} faculties={sortedFaculties as IFacultyShort[]} semester={semesters.data?.[0] as ISemester} />
    );
}