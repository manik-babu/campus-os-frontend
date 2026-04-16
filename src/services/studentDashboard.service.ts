/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiResponse } from "@/@types/axios";
import { IAcademicRecord, IStudentResultChartData } from "@/@types/studentDashboard";
import { httpClient } from "@/lib/axios/httpClient";

export const getStudentResults = async (): Promise<IApiResponse<IStudentResultChartData[]>> => {
    try {
        const res = await httpClient.get<IStudentResultChartData[]>("/students/results/statics");
        return res;
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An error occurred while fetching student results.",
        }
    }
}
export const getAcademicRecords = async (): Promise<IApiResponse<IAcademicRecord>> => {
    try {
        const res = await httpClient.get<IAcademicRecord>("/students/academic-records");
        return res;
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An error occurred while fetching student academic records.",
        }
    }
}