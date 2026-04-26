/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiResponse } from "@/@types/axios";
import { IDepartment } from "@/@types/superAdmin";
import { httpClient } from "@/lib/axios/httpClient";
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
export const getDepartments = async (): Promise<IApiResponse<IDepartment[]>> => {
    try {
        const res = await httpClient.get<IDepartment[]>("/public/departments");
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