/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IAddAttendanceData } from "./types";
import { IApiResponse } from "@/@types/axios";

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

