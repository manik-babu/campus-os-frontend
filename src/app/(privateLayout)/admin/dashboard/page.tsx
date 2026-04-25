import { IAdminDashboardData, IAdminDashboardStudent, IAdminDashboardTotal } from "@/@types/admin";
import AdminDashboard from "@/components/modules/admin/dashboard/AdminDashboard";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getAdminDashboardData } from "@/services/admin.service";

export default async function Page() {
    const res = await getAdminDashboardData();
    if (!res.ok) {
        return <ErrorPage message={res.message || "Failed to load dashboard data"} statusCode={res.status} />
    };

    return (
        <AdminDashboard students={res.data?.students as IAdminDashboardStudent[]} total={res.data?.total as IAdminDashboardTotal} />
    );
}