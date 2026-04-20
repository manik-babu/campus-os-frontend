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
