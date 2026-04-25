
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

export interface IFacultyProfileData {
    designation: string;
    departmentId: string;
    phoneNumber: string;
    salary: number;
    presentAddress: string;
    permanentAddress: string;
    bloodGroup?: string;
}
export interface ICreatedFaculty {
    id: string;
    idNo: string;
    registrationNo: string;
    name: string;
    email: string;
}