/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ICreatedFaculty } from "@/@types/admin";
import { IRegisterUserData } from "@/@types/admission";
import { IApiResponse } from "@/@types/axios";
import { IAdminRegistrationData, IDepartment, ISuperAdminDashboardData } from "@/@types/superAdmin";
import { httpClient } from "@/lib/axios/httpClient";
import { AdminRegistrationData } from "@/zod/adminRegistration";
import { DepartmentFormData } from "@/zod/superAdmin/department";
import { ProgramFormData } from "@/zod/superAdmin/programs";

export const addProgram = async (data: ProgramFormData): Promise<IApiResponse<null>> => {
    try {
        const res = await httpClient.post<null>("/super-admin/create-program", data);
        return res;
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to add program",
        }
    }
}
export const addDepartment = async (data: DepartmentFormData): Promise<IApiResponse<null>> => {
    try {
        const res = await httpClient.post<null>("/super-admin/create-department", data);
        return res;
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to add department",
        }
    }
}
export const getDepartments = async (programId?: string): Promise<IApiResponse<IDepartment[]>> => {
    try {
        const res = await httpClient.get<IDepartment[]>("/public/departments", {
            params: {
                programId: programId
            }
        });
        return res;
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch departments",
        }
    }
}
export const addSemester = async (data: {
    name: string;
    classStart: string;
    classEnd: string;
    description: string;
}): Promise<IApiResponse<null>> => {
    try {
        const res = await httpClient.post<null>("/super-admin/create-semester", data);
        return res;
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to add semester",
        }
    }
}

export const registerAdmin = async (image: File, userData: IRegisterUserData, profileData: IAdminRegistrationData): Promise<IApiResponse<ICreatedFaculty>> => {
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
            message: error.message || "Failed to register admin",
        }
    }
}

export const getSuperAdminDashboardData = async (): Promise<IApiResponse<ISuperAdminDashboardData>> => {
    try {
        const res = await httpClient.get<ISuperAdminDashboardData>("/super-admin/dashboard-data");
        return res;
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch dashboard data",
        }
    }
}