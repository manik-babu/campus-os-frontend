import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./services/auth.service";
import { UserRole } from "./@types/session";

export const proxy = async (request: NextRequest) => {
    try {
        const path = request.nextUrl.pathname;
        const session = await getSession();
        if (!session && path !== "/erp-login") {
            return NextResponse.redirect(new URL("/erp-login", request.url));
        }
        if (session && path === "/erp-login") {
            if (session.role === UserRole.SUPER_ADMIN) {
                return NextResponse.redirect(new URL("/super-admin/dashboard", request.url));
            }
            else {
                return NextResponse.redirect(new URL(`/${session.role.toLowerCase()}/dashboard`, request.url));
            }
        }

        if (path.startsWith("/student") && session?.role !== UserRole.STUDENT) {
            return NextResponse.redirect(new URL("/erp-login", request.url));
        }
        if (path.startsWith("/faculty") && session?.role !== UserRole.FACULTY) {
            return NextResponse.redirect(new URL("/erp-login", request.url));
        }
        if (path.startsWith("/admin") && session?.role !== UserRole.ADMIN) {
            return NextResponse.redirect(new URL("/erp-login", request.url));
        }
        if (path.startsWith("/super-admin") && session?.role !== UserRole.SUPER_ADMIN) {
            return NextResponse.redirect(new URL("/erp-login", request.url));
        }


        return NextResponse.next();

    } catch (error) {
        console.error("Error in proxy middleware", error);
    }
}

export const config = {
    matcher: [
        "/erp-login",
        "/student/:path*",
        "/faculty/:path*",
        "/admin/:path*",
        "/super-admin/:path*",
    ]
}