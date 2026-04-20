export interface IAttendanceData {
    classDetails: IClassDetails;
    students: IAttendanceStudent[];
}

export interface IClassDetails {
    classId: string;
    courseName: string;
    courseCode: string;
    semester: string;
    batch: number;
    department: string;
}

export interface IAttendanceStudent {
    enrollmentId: string;
    studentId: string;
    studentIdNo: string;
    studentName: string;
}
