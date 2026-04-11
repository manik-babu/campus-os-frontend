"use server"

import { ISessionUser } from "@/@types/session";
import { httpClient } from "@/lib/axios/httpClient"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export const login = async ({ idNo, password }: { idNo: string, password: string }) => {
    try {
        const res = await httpClient.post<{ token: string }>("/auth/login", {
            idNo,
            password,
        });
        return res;
    } catch (error) {
        console.error("Login error", error);
        throw error;
    }
}

export const getSession = async () => {
    const cookie = await cookies();
    const token = cookie.get("token")?.value;

    let user: ISessionUser | null = null;
    try {
        user = jwt.verify(token as string, env.JWT_SECRET as string) as ISessionUser;
    } catch (error) {
        console.log("Error verifying token", error);
    }
    return user;
}