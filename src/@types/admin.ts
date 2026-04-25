
export interface IBatchInput {
    departmentId: string;
    description: string;
}

export interface ICourses {
    id: string;
    code: string;
    title: string;
    description: string;
    credits: number;
    departmentId: string;
    createdAt: string;
    updatedAt: string;
}
