"use client";

import { IAdminDashboardTotal } from "@/@types/admin";
import { Users, BookOpen, GraduationCap, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
    label: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

function StatCard({ label, value, icon, color }: StatCardProps) {
    return (
        <Card className={`p-6 border-0 shadow-md hover:shadow-lg transition-shadow duration-200 bg-gradient-to-br ${color}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-slate-600 text-sm font-medium mb-1">{label}</p>
                    <p className="text-4xl font-bold text-slate-900">{value}</p>
                </div>
                <div className="text-slate-400 opacity-80">
                    {icon}
                </div>
            </div>
        </Card>
    );
}

export default function AdminDashboardHero({ total }: { total: IAdminDashboardTotal }) {
    const stats = [
        {
            label: "Total Admission Forms",
            value: total.admissionForms,
            icon: <Users size={48} />,
            color: "from-blue-50 to-blue-100",
        },
        {
            label: "Total Faculties",
            value: total.faculties,
            icon: <GraduationCap size={48} />,
            color: "from-purple-50 to-purple-100",
        },
        {
            label: "Total Courses",
            value: total.courses,
            icon: <BookOpen size={48} />,
            color: "from-amber-50 to-amber-100",
        },
        {
            label: "Total Batches",
            value: total.batches,
            icon: <Calendar size={48} />,
            color: "from-emerald-50 to-emerald-100",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header Section */}
            <div className="py-8">
                <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
                <p className="text-muted-foreground">
                    Welcome to your admin dashboard. {`Here's`} an overview of your institution.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard
                        key={index}
                        label={stat.label}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>
        </div>
    );
}