/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IAdmissionFormDetails, IAdmissionFormsData, IRegisterUserData, IStudentProfileData } from "@/@types/admission";
import { IApiResponse } from "@/@types/axios";
import { httpClient } from "@/lib/axios/httpClient";

export const getAdmissionForms = async (filter: { search: string; page: number; sortBy: "asc" | "desc" }): Promise<IApiResponse<IAdmissionFormsData>> => {
    try {
        return await httpClient.get("/admin/admission-forms", {
            params: filter,
        });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch admission forms",
        }
    }
}

export const getAdmissionFormDetails = async (formId: string): Promise<IApiResponse<IAdmissionFormDetails>> => {
    try {
        return await httpClient.get<IAdmissionFormDetails>(`/admin/admission-forms/${formId}`);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to fetch admission form details",
        }
    }
}
export const admitStudent = async (userData: IRegisterUserData, profileData: IStudentProfileData): Promise<IApiResponse<null>> => {
    try {
        const formData = new FormData();
        formData.append("userData", JSON.stringify(userData));
        formData.append("profileData", JSON.stringify(profileData));
        return await httpClient.post("/auth/register", formData);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to admit student",
        }
    }
}
export const updateAdmissionFormStatus = async (formId: string, status: "APPROVED" | "REJECTED"): Promise<IApiResponse<null>> => {
    try {
        return await httpClient.patch(`/admin/admission-forms/${formId}/status`, {
            status
        });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "Failed to update admission form status",
        }
    }
}