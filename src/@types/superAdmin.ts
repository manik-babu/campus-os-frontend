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

export interface ISuperAdminDashboardData {
    total: ISuperAdminTotalUserData;
    departments: Department[];
}
export interface ISuperAdminTotalUserData {
    totalPrograms: number;
    totalDepartments: number;
    totalStudents: number;
    totalFaculties: number;
    totalAdmins: number;
}
export interface Department {
    name: string;
    studentCount: number;
}
