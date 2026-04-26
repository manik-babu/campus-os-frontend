import { IStudentMarks } from "@/@types/facultyClass"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import StudentResultContainer from "./ResultContainer"
import UpdateResult from "./UpdateResult"

export function ResultMainPage({ studentMarks }: { studentMarks: IStudentMarks[] }) {
    return (
        <Tabs defaultValue="all" className="w-full">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="ct-1">CT 1</TabsTrigger>
                <TabsTrigger value="midterm">Midterm</TabsTrigger>
                <TabsTrigger value="ct-2">CT 2</TabsTrigger>
                <TabsTrigger value="final">Final</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
                <Card>
                    <CardHeader>
                        <CardTitle>Student Results</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <StudentResultContainer studentMarks={studentMarks} />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="ct-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Class Test 1 Marks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpdateResult studentMarks={studentMarks} markName="classTest1" label="CT 1" />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="midterm">
                <Card>
                    <CardHeader>
                        <CardTitle>Midterm Marks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpdateResult studentMarks={studentMarks} markName="midterm" label="Midterm" />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="ct-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Class Test 2 Marks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <UpdateResult studentMarks={studentMarks} markName="classTest2" label="CT 2" />
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="final">
                <Card>
                    <CardHeader>
                        <CardTitle>Final Marks</CardTitle>
                    </CardHeader>
                    <CardContent >
                        <UpdateResult studentMarks={studentMarks} markName="final" label="Final" />
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
