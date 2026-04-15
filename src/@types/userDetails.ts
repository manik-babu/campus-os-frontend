export interface IUserDetails {
    id: string;
    registrationNo: string;
    idNo: string;
    name: string;
    image: string;
    email: string;
    password: string;
    role: string;
    status: string;
    gender: string;
    createdAt: string;
    updatedAt: string;
    adminProfile: IAdminProfile | null;
    studentProfile: IStudentProfile | null;
    facultyProfile: IFacultyProfile | null;
}

export interface IAdminProfile {
    id: string;
    userId: string;
    departmentId: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
    department: Department;
}

export interface Department {
    name: string;
    shortName: string;
}

export interface IFacultyProfile {
    id: string;
    userId: string;
    designation: string;
    departmentId: string;
    phoneNumber: string;
    salary: string;
    bloodGroup: null;
    presentAddress: string;
    permanentAddress: string;
    createdAt: string;
    updatedAt: string;
    department: Department;
    graduations: Graduation[];
}

export interface Department {
    shortName: string;
    name: string;
}

export interface Graduation {
    id: string;
    facultyProfileId: string;
    degree: string;
    major: string;
    institute: string;
    passingYear: number;
    createdAt: string;
    updatedAt: string;
}


export interface IStudentProfile {
    id: string;
    userId: string;
    batchId: string;
    departmentId: string;
    programId: string;
    fatherName: string;
    motherName: string;
    birthDate: string;
    permanentAddress: string;
    presentAddress: string;
    phoneNumber: string;
    schoolName: string;
    collegeName: string;
    sscGpa: string;
    hscGpa: string;
    sscPassingYear: number;
    hscPassingYear: number;
    bloodGroup: string;
    createdAt: string;
    updatedAt: string;
    batch: Batch;
    department: Department;
    program: Department;
}

export interface Batch {
    batchNo: number;
}

export interface Department {
    shortName: string;
    name: string;
}
