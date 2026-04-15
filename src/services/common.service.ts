/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiResponse } from "@/@types/axios";
import { IUserDetails } from "@/@types/userDetails";
import { httpClient } from "@/lib/axios/httpClient";


export const getUserDetails = async (userId?: string): Promise<IApiResponse<IUserDetails | null>> => {
    try {
        const res = await httpClient.get<IUserDetails | null>("/common/user-details", {
            params: {
                userId
            }
        });
        return res;
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch user details",
            status: 500,
        }
    }
}