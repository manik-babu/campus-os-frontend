/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiResponse } from "@/@types/axios";
import { IBillDetails } from "@/@types/bill";
import { httpClient } from "@/lib/axios/httpClient";

export const getBills = async (semesterId: string): Promise<IApiResponse<IBillDetails>> => {
    try {
        const res = await httpClient.get<IBillDetails>(`/students/bill/${semesterId}`);
        return res;
    } catch (error: any) {
        console.log("Failed to fetch bills");
        return {
            ok: false,
            message: error.message || "An error occurred while fetching bills",
        }
    }
}