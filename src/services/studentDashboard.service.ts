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

// profile update 
export const updateStudentContact = async (email: string, phoneNumber: string): Promise<IApiResponse<null>> => {
    try {

        return await httpClient.patch<null>("/students/update-contact", { email, phoneNumber });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to update contact information",
        }
    }
}
export const updateStudentAddress = async (presentAddress: string, permanentAddress: string): Promise<IApiResponse<null>> => {
    try {

        return await httpClient.patch<null>("/students/update-address", { presentAddress, permanentAddress });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to update address information",
        }
    }
}