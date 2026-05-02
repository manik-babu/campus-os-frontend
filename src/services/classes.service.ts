/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IGetClassSearch } from "./types";
import { IApiResponse } from "@/@types/axios";
import { IClassPost, IClassPostData, IPostCommentData } from "@/@types/classes";
import { ICourseOfferingInfo } from "@/@types/offeringInfo";
import { IPostInput } from "@/@types/facultyClass";

export const getClassPosts = async (classId: string, search: IGetClassSearch): Promise<IApiResponse<IClassPostData>> => {
    try {
        return await httpClient.get<IClassPostData>(`/classes/course-posts/${classId}`, {
            params: {
                search: search.search || "",
                type: search.type || "ALL",
                orderBy: search.orderBy || "desc",
                page: search.page || 1,
            }
        })
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An error occurred while fetching class posts",
        }
    }
}
export const courseOfferingInfo = async (courseOfferingId: string): Promise<IApiResponse<ICourseOfferingInfo>> => {
    try {
        return await httpClient.get<ICourseOfferingInfo>(`/common/course-offering-info/${courseOfferingId}`);
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An error occurred while fetching course offering info",
        }
    }
}

export const addCoursePost = async (dataInput: IPostInput): Promise<IApiResponse<IClassPost>> => {
    try {
        const { attachment, ...data } = dataInput;

        const formData = new FormData();
        if (attachment) {
            formData.append("attachment", attachment);
        }
        formData.append("data", JSON.stringify(data));

        return await httpClient.post<IClassPost>(`/classes/course-posts`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An error occurred while adding course post",
        };
    }
}

export const getComments = async (coursePostId: string, search: Omit<IGetClassSearch, "search" | "type">): Promise<IApiResponse<IPostCommentData>> => {
    try {
        return await httpClient.get<IPostCommentData>(`/classes/course-posts/comments/${coursePostId}`, {
            params: {
                orderBy: search.orderBy || "desc",
                page: search.page || 1,
            }
        })
    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An error occurred while fetching comments",
        }
    }
};

export const deleteCoursePost = async (postId: string): Promise<IApiResponse<boolean>> => {
    try {
        return await httpClient.delete<boolean>(`/classes/course-posts/${postId}`);

    } catch (error: any) {
        return {
            ok: false,
            message: error.message || "An error occurred while deleting course post",
            data: false
        }
    }
};      