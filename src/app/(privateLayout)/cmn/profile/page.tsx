import { UserRole } from "@/@types/session";
import AdminProfile from "@/components/profile/AdminProfile";
import FacultyProfile from "@/components/profile/FacultyProfile";
import StudentProfile from "@/components/profile/StudentProfile";
import SuperAdminProfile from "@/components/profile/SuperAdminProfile";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getUserDetails } from "@/services/common.service";

export default async function Profile() {
    const res = await getUserDetails();
    if (!res.ok)
        return <ErrorPage message={res.message} statusCode={res.status || 500} />

    if (res.data?.role === UserRole.ADMIN)
        return <AdminProfile user={res.data} />
    if (res.data?.role === UserRole.FACULTY)
        return <FacultyProfile user={res.data} />
    if (res.data?.role === UserRole.STUDENT)
        return <StudentProfile user={res.data} />
    if (res.data?.role === UserRole.SUPER_ADMIN)
        return <SuperAdminProfile user={res.data} />
    return <ErrorPage message="Invalid user role" statusCode={400} />
}