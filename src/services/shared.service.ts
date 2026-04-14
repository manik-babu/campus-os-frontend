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
    const res = await httpClient.get<IBatch[]>("/common/batches", {
        params: {
            departmentId: departmentId || ""
        }
    });
    return res;
}