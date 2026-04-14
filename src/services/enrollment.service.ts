"use server";

import { IApiResponse } from "@/@types/axios";
import { ICourseOfferingsData, IEnrolledCourse } from "@/@types/enrollment";
import { httpClient } from "@/lib/axios/httpClient";


export const getEnrolledCourses = async (semesterId?: string): Promise<IApiResponse<IEnrolledCourse[]>> => {
    const res = await httpClient.get<IEnrolledCourse[]>("/students/enrollments", {
        params: {
            semesterId: semesterId || "",
        },
    });
    return res;
}
export const getCourseOfferings = async ({ search, batchId }: { search?: string; batchId?: string }): Promise<IApiResponse<ICourseOfferingsData>> => {
    const res = await httpClient.get<ICourseOfferingsData>("/common/course-offerings", {
        params: {
            search: search || "",
            batchId: batchId || "all",
        },
    });
    return res;
}

export const enrollSingleCourse = async (courseOfferingId: string): Promise<IApiResponse<{ courseTitle: string }>> => {
    const res = await httpClient.post<{ courseTitle: string }>("/students/enroll", { courseOfferingId });
    return res;
}

// export const dropEnrollment = async (enrollmentId: string): Promise<IApiResponse<null>> => {
//     const res = await httpClient.delete("/students/enrollments/drop", {
//         data: {
//             enrollmentId,
//         },
//     });
//     return res;
// }

