"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { IAdminDashboardStudent } from "@/@types/admin"

const chartConfig = {
    studentCount: {
        label: "Students",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function AdminStudentChart({ students }: { students: IAdminDashboardStudent[] }) {
    // Transform students data for the chart
    const chartData = students.map((student) => ({
        batch: `Batch ${student.batchNo}`,
        studentCount: student.studentCount,
    }))

    // Calculate total students and trending info
    const totalStudents = students.reduce((sum, student) => sum + student.studentCount, 0)
    const averageStudentsPerBatch = Math.round(totalStudents / students.length)

    return (
        <Card>
            <CardHeader>
                <CardTitle>Student Distribution by Batch</CardTitle>
                <CardDescription>Total: {totalStudents} students across {students.length} batches</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className="aspect-auto h-62 w-full"
                    config={chartConfig}
                >
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="batch"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar dataKey="studentCount" fill="var(--color-studentCount)" radius={8} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    Average {averageStudentsPerBatch} students per batch <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing student count distribution across all batches
                </div>
            </CardFooter>
        </Card>
    )
}
