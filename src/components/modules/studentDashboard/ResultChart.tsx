"use client"

import { TrendingDown, TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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
import { IStudentResultChartData } from "@/@types/studentDashboard"
import { cn } from "@/lib/utils"

export const description = "A line chart showing SGPA across semesters"

const chartConfig = {
    sgpa: {
        label: "SGPA",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig

export function StudentResultChart({ chartData }: { chartData: IStudentResultChartData[] }) {
    const isImproving = () => {
        if (chartData.length <= 1) {
            return 0;
        }
        else {
            return chartData[chartData.length - 1].sgpa > chartData[chartData.length - 2].sgpa ? 1 : -1;
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Semester SGPA Progress</CardTitle>
                <CardDescription>Your SGPA trend across semesters</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer
                    className="aspect-auto h-62 w-full"
                    config={chartConfig}
                >
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="semesterName"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="sgpa"
                            type="natural"
                            stroke="var(--color-sgpa)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-sgpa)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 leading-none font-medium">
                    SGPA Progression {isImproving() < 0 ? <span className="text-red-500"><TrendingDown className="h-4 w-4" /></span> : <span className="text-green-500"><TrendingUp className="h-4 w-4" /></span>}
                </div>
                <div className="leading-none text-muted-foreground">
                    {
                        isImproving() !== 0 ? (
                            <p>
                                Your SGPA has {isImproving() === 1 ? 'improved' : 'declined'} over the semesters.
                            </p>
                        ) : <p>
                            Your first semester results are in! Keep up the good work to see your SGPA trend over time.
                        </p>
                    }
                </div>
            </CardFooter>
        </Card>
    )
}
