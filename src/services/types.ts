
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