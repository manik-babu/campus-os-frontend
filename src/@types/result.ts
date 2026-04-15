export interface ICourseResult {
    courseCode: string;
    courseTitle: string;
    credits: number;
    facultyName: string;
    result: IResult;
}

export interface IResult {
    classTest1: string;
    classTest2: string | null;
    midterm: string | null;
    final: string | null;
    attendance: string | null;
    grade: string | null;
    points: string | null;
}
