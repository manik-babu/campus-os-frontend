/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { IAdminDashboardData, IBatchInput, ICourses, ICreatedFaculty, IFacultyProfileData } from "@/@types/admin";
import { IAdmissionFormDetails, IAdmissionFormsData, IRegisterUserData, IStudentProfileData } from "@/@types/admission";
import { IApiResponse } from "@/@types/axios";
import { IBatch } from "@/@types/shared";
import { httpClient } from "@/lib/axios/httpClient";
import { ICourseOfferingInput } from "./types";

export const getAdmissionForms = async (filter: { search: string; page: number; sortBy: "asc" | "desc" }): Promise<IApiResponse<IAdmissionFormsData>> => {
    try {
        return await httpClient.get("/admin/admission-forms", {
            params: filter,
        });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch admission forms",
        }
    }
}

export const getAdmissionFormDetails = async (formId: string): Promise<IApiResponse<IAdmissionFormDetails>> => {
    try {
        return await httpClient.get<IAdmissionFormDetails>(`/admin/admission-forms/${formId}`);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch admission form details",
        }
    }
}
export const admitStudent = async (userData: IRegisterUserData, profileData: IStudentProfileData): Promise<IApiResponse<null>> => {
    try {
        const formData = new FormData();
        formData.append("userData", JSON.stringify(userData));
        formData.append("profileData", JSON.stringify(profileData));
        return await httpClient.post("/auth/register", formData);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to admit student",
        }
    }
}
export const registerFaculty = async (image: File, userData: IRegisterUserData, profileData: IFacultyProfileData): Promise<IApiResponse<ICreatedFaculty>> => {
    try {
        const formData = new FormData();
        formData.append("image", image);
        formData.append("userData", JSON.stringify(userData));
        formData.append("profileData", JSON.stringify(profileData));
        return await httpClient.post<ICreatedFaculty>("/auth/register", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to register faculty",
        }
    }
}
export const updateAdmissionFormStatus = async (formId: string, status: "APPROVED" | "REJECTED"): Promise<IApiResponse<null>> => {
    try {
        return await httpClient.patch(`/admin/admission-forms/${formId}/status`, {
            status
        });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to update admission form status",
        }
    }
}

export const addNewBatch = async (data: IBatchInput): Promise<IApiResponse<IBatch>> => {
    try {
        return await httpClient.post<IBatch>("/admin/create-batch", data);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to add new batch",
        }
    }
}
export const getCourses = async (departmentId: string): Promise<IApiResponse<ICourses[]>> => {
    try {
        return await httpClient.get<ICourses[]>(`/public/courses?departmentId=${departmentId}`);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch courses",
        }
    }
}
export const addNewCourse = async (data: { code: string; title: string; description: string; credits: number; departmentId: string }): Promise<IApiResponse<null>> => {
    try {
        return await httpClient.post<null>("/admin/create-course", data);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to add new course",
        }
    }
}
export const AddCourseOffering = async (data: ICourseOfferingInput): Promise<IApiResponse<null>> => {
    try {
        return await httpClient.post<null>("/admin/create-course-offering", data);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to create course offering"
        }
    }
}

export const getAdminDashboardData = async (): Promise<IApiResponse<IAdminDashboardData>> => {
    try {
        return await httpClient.get<IAdminDashboardData>("/admin/dashboard");
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch dashboard data",
        }
    }
};