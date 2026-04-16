/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { ISessionUser } from "@/@types/session";
import { httpClient } from "@/lib/axios/httpClient"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { env } from "@/env";
import { IApiResponse } from "@/@types/axios";

export const login = async ({ idNo, password }: { idNo: string, password: string }): Promise<IApiResponse<{ token: string; user: ISessionUser }>> => {
    try {
        const res = await httpClient.post<{ token: string; user: ISessionUser }>("/auth/login", {
            idNo,
            password,
        });
        return res;
    } catch (error: any) {
        console.error("Login error", error);
        return {
            ok: false,
            message: error.message || "Login failed",
        }
    }
}

export const getSession = async (): Promise<ISessionUser | null> => {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    if (!token) {
        return null;
    }
    let user: ISessionUser | null = null;
    try {
        user = jwt.verify(token as string, env.JWT_SECRET as string) as ISessionUser;
    } catch (error) {
        console.log("Error verifying token", error);
    }
    return user;
}

export const changePassword = async ({ oldPassword, newPassword }: { oldPassword: string, newPassword: string }): Promise<IApiResponse<boolean>> => {
    try {
        const res = await httpClient.patch<boolean>("/auth/change-password", {
            oldPassword,
            newPassword,
        });
        return res;
    } catch (error: any) {
        console.error("Password change error", error);
        return {
            ok: false,
            message: error.message || "Password change failed",
        }
    }
}

export const logout = async () => {
    const cookie = await cookies();
    cookie.delete("token");
}