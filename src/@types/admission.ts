export interface IAdmissionFormsData {
    forms: IAdmissionForm[];
    meta: Meta;
}

export interface IAdmissionForm {
    id: string;
    image: string;
    name: string;
    createdAt: string;
}

export interface Meta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}
export interface IAdmissionFormDetails {
    id: string;
    image: string;
    programId: string;
    departmentId: string;
    name: string;
    email: string;
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
    bloodGroup: null;
    sscDoc: string;
    hscDoc: string;
    createdAt: string;
    updatedAt: string;
    program: string;
    department: string;
    batchId: string;
    batchNo: string;
    gender: string;
}
export interface IStudentProfileData {
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
    sscGpa: number;
    hscGpa: number;
    sscPassingYear: number;
    hscPassingYear: number;
    bloodGroup: string | null;
    image: string;
}

export interface IRegisterUserData {
    name: string;
    email: string;
    password: string;
    role: string;
    gender: string;
}
export interface IAdmissionFormResponse {
    id: string;
    name: string;
    email: string;
    department: string;
    program: string;
    isPaidFee: boolean;
    fee: number;
}