import { ISuperAdminDashboardData } from "@/@types/superAdmin";
import { ErrorPage } from "@/components/shared/ErrorPage";
import { getSuperAdminDashboardData } from "@/services/superAdmin.service";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, BookOpen, GraduationCap, Briefcase, Shield } from "lucide-react";

export default async function Dashboard() {
    const res = await getSuperAdminDashboardData();
    if (!res.ok) {
        return <ErrorPage message={res.message} statusCode={res.status} />
    }
    const data: ISuperAdminDashboardData = res.data as ISuperAdminDashboardData;

    const stats = [
        {
            label: "Total Programs",
            value: data.total.totalPrograms,
            icon: BookOpen,
            color: "bg-blue-100 text-blue-600",
            lightColor: "bg-blue-50"
        },
        {
            label: "Total Departments",
            value: data.total.totalDepartments,
            icon: Briefcase,
            color: "bg-purple-100 text-purple-600",
            lightColor: "bg-purple-50"
        },
        {
            label: "Total Students",
            value: data.total.totalStudents,
            icon: GraduationCap,
            color: "bg-green-100 text-green-600",
            lightColor: "bg-green-50"
        },
        {
            label: "Total Faculties",
            value: data.total.totalFaculties,
            icon: Users,
            color: "bg-orange-100 text-orange-600",
            lightColor: "bg-orange-50"
        },
        {
            label: "Total Admins",
            value: data.total.totalAdmins,
            icon: Shield,
            color: "bg-red-100 text-red-600",
            lightColor: "bg-red-50"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 p-6 md:p-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-2">
                    Dashboard
                </h1>
                <p className="text-muted-foreground text-base md:text-lg">
                    Welcome back! Here&apos;s an overview of your institution.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                            <CardContent className="pt-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs md:text-sm font-medium text-muted-foreground mb-1">
                                            {stat.label}
                                        </p>
                                        <p className="text-2xl md:text-3xl font-bold text-foreground">
                                            {stat.value.toLocaleString()}
                                        </p>
                                    </div>
                                    <div className={`${stat.lightColor} p-3 rounded-lg`}>
                                        <Icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            {/* Department Table */}
            <Card className="shadow-sm border border-border/50">
                <CardHeader className="border-b border-border/50">
                    <CardTitle className="text-xl md:text-2xl">Departments Overview</CardTitle>
                    <CardDescription>
                        Student distribution across departments
                    </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="w-full overflow-x-auto">
                        <Table>
                            <TableHeader className="bg-muted/50">
                                <TableRow className="hover:bg-muted/50">
                                    <TableHead className="font-semibold text-foreground h-12 px-4 md:px-6">
                                        Department Name
                                    </TableHead>
                                    <TableHead className="font-semibold text-foreground h-12 px-4 md:px-6 text-right">
                                        Student Count
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.departments.length > 0 ? (
                                    data.departments.map((dept, index) => (
                                        <TableRow
                                            key={index}
                                            className="hover:bg-muted/50 transition-colors border-b border-border/50 last:border-0"
                                        >
                                            <TableCell className="px-4 md:px-6 py-4 font-medium text-foreground">
                                                {dept.name}
                                            </TableCell>
                                            <TableCell className="px-4 md:px-6 py-4 text-right">
                                                <span className="inline-flex items-center justify-center px-3 py-1 rounded-full text-sm font-semibold bg-blue-50 text-blue-700">
                                                    {dept.studentCount.toLocaleString()}
                                                </span>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={2} className="px-4 md:px-6 py-8 text-center text-muted-foreground">
                                            No departments found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}