export interface ISessionUser {
    id: string;
    name: string;
    role: UserRole;
    email: string;
    idNo: string;
    registrationNo: string;
    status: string;
}
export enum UserRole {
    STUDENT = "STUDENT",
    FACULTY = "FACULTY",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN",
}