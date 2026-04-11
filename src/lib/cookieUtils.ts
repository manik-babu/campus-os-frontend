"use server"

import { env } from "@/env";
import { cookies } from "next/headers"

export const setCookie = async (key: string, value: string) => {
    const cookieStore = await cookies();
    cookieStore.set(key, value, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    })
}