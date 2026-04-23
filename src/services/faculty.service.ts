/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAddAttendanceData } from "./types";
import { IApiResponse } from "@/@types/axios";
import { IStudentAttendanceData } from "@/@types/attendance";

export const takeAttendance = async (data: IAddAttendanceData[]): Promise<IApiResponse<null>> => {
    try {
        return httpClient.post<null>("/faculty/students/attendance", data);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An unknown error occurred",
        }
    }
}

export const getAttendance = async (classId: string, date: { year: string, month: string }): Promise<IApiResponse<IStudentAttendanceData>> => {
    try {
        return httpClient.get<IStudentAttendanceData>(`/faculty/students/attendance/${classId}?year=${date.year}&month=${date.month}`);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An unknown error occurred",
        }
    }
}

