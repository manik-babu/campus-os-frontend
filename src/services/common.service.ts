/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IApiResponse } from "@/@types/axios";
import { IUserDetails } from "@/@types/userDetails";
import { env } from "@/env";
import { httpClient } from "@/lib/axios/httpClient";
import { cookies } from "next/headers";


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
export const getAdmitCard = async (semesterId: string, exam: "Midterm" | "Final", studentId?: string): Promise<Blob> => {
    const cookieStore = await cookies();

    try {
        const res = await fetch(`${env.BACKEND_URL}/common/admit?semesterId=${semesterId}&exam=${exam}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/pdf",
                "Cookie": cookieStore.toString(), // Forward cookies for authentication
            },
        });

        // Create a blob URL from the PDF response
        const blob = await res.blob();
        return blob;
    } catch (error: any) {
        throw new Error(error.message || "Failed to fetch admit card details");
    }
}