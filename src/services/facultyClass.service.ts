/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { IAttendanceData } from "@/@types/attendance";
import { IApiResponse } from "@/@types/axios";
import { IFacultyClass } from "@/@types/facultyClass";
import { httpClient } from "@/lib/axios/httpClient";


export const getFacultyClasses = async (semesterId: string): Promise<IApiResponse<IFacultyClass[]>> => {
    try {
        return await httpClient.get<IFacultyClass[]>(`/faculty/classes/${semesterId}`);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An error occurred while fetching faculty classes",
        };
    }
}

export const getStudents = async (classId: string): Promise<IApiResponse<IAttendanceData>> => {
    try {
        return await httpClient.get<IAttendanceData>(`/faculty/students/${classId}`);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An error occurred while fetching enrolled students",
        };
    }
}

