export interface IEnrolledCourse {
    id: string;
    courseCode: string;
    courseTitle: string;
    credits: number;
    facultyName: string;
    offeringId: string;
}

export interface ISemester {
    id: string;
    name: string;
    description?: string;
    startDate: string;
    endDate: string;
}
export interface ICourseOfferingsData {
    courses: ICourseOffering[];
    meta: Meta;
}

export interface ICourseOffering {
    id: string;
    creditFees: string;
    course: Course;
    semester: Faculty;
    faculty: Faculty;
    batch: Batch;
}

export interface Batch {
    batchNo: number;
}

export interface Course {
    code: string;
    title: string;
    credits: number;
}

export interface Faculty {
    name: string;
    image: string;
}

export interface Meta {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
}

