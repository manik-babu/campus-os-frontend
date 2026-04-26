
export interface IGetCourseOfferingsProps {
    search?: string;
    batchId?: string;
}
export interface IGetClassSearch {
    search?: string,
    type?: string,
    orderBy?: string,
    page?: number
}

export interface IAddAttendanceData {
    date: string;
    enrollmentId: string;
    isPresent: boolean;
    courseOfferingId: string;
}

export interface ICourseOfferingInput {
    departmentId: string;
    courseId: string;
    facultyId: string;
    batchId: string;
    semesterId: string;
    creditFees: number;
}
export interface IMarkInput {
    enrollmentId: string;
    mark: Mark;
}

export interface Mark {
    classTest1?: string | null;
    classTest2?: string | null;
    midterm?: string | null;
    final?: string | null;
    attendance?: string | null;
}
