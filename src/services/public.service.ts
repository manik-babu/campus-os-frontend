/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiResponse } from "@/@types/axios";
import { IPrograms } from "@/@types/programs";
import { IFacultyShort } from "@/@types/public";
import { httpClient } from "@/lib/axios/httpClient";

export const getFacultiesShort = async (departmentId?: string): Promise<IApiResponse<IFacultyShort[]>> => {
    try {
        return await httpClient.get<IFacultyShort[]>(`/public/faculty`, {
            params: {
                departmentId: departmentId || null,
                short: true,
            }
        });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch faculties",
        }
    }
}
export const getFaculties = async (departmentId?: string): Promise<IApiResponse<IFacultyShort[]>> => {
    try {
        return await httpClient.get<IFacultyShort[]>(`/public/faculty`, {
            params: {
                departmentId: departmentId || null,
                short: false,
            }
        });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch faculties",
        }
    }
}
export const getPrograms = async (): Promise<IApiResponse<IPrograms[]>> => {
    try {
        const res = await httpClient.get<IPrograms[]>("/public/programs");
        return res;
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch programs",
        }
    }
}