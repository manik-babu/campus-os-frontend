/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import { IApiResponse } from "@/@types/axios";
import { ICourseResult } from "@/@types/result";
import { httpClient } from "@/lib/axios/httpClient"

export const getResults = async (semesterId?: string): Promise<IApiResponse<ICourseResult[]>> => {
    try {
        const res = await httpClient.get<ICourseResult[]>("/students/results", {
            params: {
                semesterId,
            },
        });
        return res;
    } catch (error: any) {
        console.error("Error fetching results:", error);
        return {
            ok: false,
            message: error.message || "Failed to fetch results",
            status: 500,
        }
    }
}