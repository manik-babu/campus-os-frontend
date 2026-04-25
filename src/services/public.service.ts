/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiResponse } from "@/@types/axios";
import { IFacultyShort } from "@/@types/public";
import { httpClient } from "@/lib/axios/httpClient";

export const getFacultiesShort = async (departmentId: string): Promise<IApiResponse<IFacultyShort[]>> => {
    try {
        return await httpClient.get<IFacultyShort[]>(`/public/faculty/${departmentId}?short=true`);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch faculties",
        }
    }
}
export const getFaculties = async (departmentId: string): Promise<IApiResponse<IFacultyShort[]>> => {
    try {
        return await httpClient.get<IFacultyShort[]>(`/public/faculty/${departmentId}?short=false`);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch faculties",
        }
    }
}