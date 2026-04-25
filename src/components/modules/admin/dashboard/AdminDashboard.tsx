"use client";

import { IAdminDashboardStudent, IAdminDashboardTotal } from "@/@types/admin";
import { AdminStudentChart } from "./AdminDashboardChart";
import AdminDashboardHero from "./AdminDashboardHero";

export default function AdminDashboard({ students, total }: { students: IAdminDashboardStudent[]; total: IAdminDashboardTotal }) {
    return (
        <div className="space-y-6">
            <AdminDashboardHero total={total} />
            <AdminStudentChart students={students} />
        </div>
    );
}