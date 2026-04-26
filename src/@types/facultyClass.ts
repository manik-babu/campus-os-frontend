import { ClassPostType } from "./classes";

export interface IFacultyClass {
    id: string;
    courseCode: string;
    courseName: string;
    department: string;
    batch: number;
}

export interface IPostInput {
    message: string | null;
    type: ClassPostType;
    attachment: File | null;
    assignmentDeadLine: string | null; // ISO date string
    courseOfferingId: string;
    parentId: string | null;
}

export interface IStudentMarkData {
    classDetails: IResultClassDetails;
    studentMarks: IStudentMarks[];
}

export interface IStudentMarks {
    enrollmentId: string;
    studentId: string;
    studentIdNo: string;
    studentName: string;
    marks: Marks;
}

export interface Marks {
    classTest1: string | null;
    classTest2: string | null;
    midterm: string | null;
    final: string | null;
    attendance: string | null;
}

export interface IResultClassDetails {
    classId: string;
    courseName: string;
    courseCode: string;
    semester: string;
    batch: number;
    department: string;
}

