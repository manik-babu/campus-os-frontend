export interface IDepartment {
    id: string;
    name: string;
    shortName: string;
    description: string;
}

export interface IAdminRegistrationData {
    departmentId: string;
    phoneNumber: string;
    salary: number;
    presentAddress: string;
    permanentAddress: string;
}