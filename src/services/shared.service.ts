/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { ISemester } from "@/@types/enrollment";
import { httpClient } from "@/lib/axios/httpClient";
import { IApiResponse } from "@/@types/axios";
import { IBatch } from "@/@types/shared";


export const getSemesters = async () => {
    const res = await httpClient.get<ISemester[]>("/common/semesters");
    return res;
}
export const getBatches = async (departmentId?: string): Promise<IApiResponse<IBatch[]>> => {
    try {
        return await httpClient.get<IBatch[]>("/common/batches", {
            params: {
                departmentId
            }
        });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch batches",
        }
    }
}