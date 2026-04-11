/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IApiResponse, IAxiosHttpGet } from '@/@types/axios';
import { env } from '@/env';
import axios from 'axios';
import { cookies } from 'next/headers';

const httpInstance = async () => {
    const cookie = await cookies();
    return axios.create({
        baseURL: env.NEXT_PUBLIC_BACKEND_URL,
        timeout: 20000,
        withCredentials: true, // Enable cookies for cross-origin requests
        headers: {
            'Content-Type': 'application/json',
            "Cookie": cookie.toString() // Include cookies in the request headers
        },
    });
}

const httpGet = async <T>(endpoint: string, options?: IAxiosHttpGet): Promise<IApiResponse<T>> => {
    const instance = await httpInstance();
    const res = await instance.get<IApiResponse<T>>(endpoint, {
        params: options?.params,
        headers: options?.headers
    }).then((res) => res.data).catch((error) => error.response.data);
    return res;
}
const httpPost = async <T>(endpoint: string, data: unknown, options?: IAxiosHttpGet): Promise<IApiResponse<T>> => {
    const instance = await httpInstance();
    const res = await instance.post<IApiResponse<T>>(endpoint, data, {
        params: options?.params,
        headers: options?.headers
    }).then((res) => res.data).catch((error) => error.response.data);
    return res;
}
const httpPut = async <T>(endpoint: string, data: unknown, options?: IAxiosHttpGet): Promise<IApiResponse<T>> => {
    const instance = await httpInstance();
    const res = await instance.put<IApiResponse<T>>(endpoint, data, {
        params: options?.params,
        headers: options?.headers
    }).then((res) => res.data).catch((error) => error.response.data);
    return res;
}
const httpDelete = async <T>(endpoint: string, options?: IAxiosHttpGet): Promise<IApiResponse<T>> => {
    const instance = await httpInstance();
    const res = await instance.delete<IApiResponse<T>>(endpoint, {
        params: options?.params,
        headers: options?.headers
    }).then((res) => res.data).catch((error) => error.response.data);
    return res;
}
const httpPatch = async <T>(endpoint: string, data: unknown, options?: IAxiosHttpGet): Promise<IApiResponse<T>> => {
    const instance = await httpInstance();
    const res = await instance.patch<IApiResponse<T>>(endpoint, data, {
        params: options?.params,
        headers: options?.headers
    }).then((res) => res.data).catch((error) => error.response.data);
    return res;
}

export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete,
    patch: httpPatch
}

