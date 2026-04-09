/* eslint-disable @typescript-eslint/no-unused-vars */
import { IAxiosHttpGet } from '@/@types/axios';
import { env } from '@/env';
import axios from 'axios';

const httpInstance = () => {
    const instance = axios.create({
        baseURL: env.NEXT_PUBLIC_BACKEND_URL,
        timeout: 20000,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return instance;
}

const httpGet = async (endpoint: string, options?: IAxiosHttpGet) => {
    try {
        const res = await httpInstance().get(endpoint, {
            params: options?.params,
            headers: options?.headers
        });
        return res.data;
    } catch (error) {
        console.log(`GET request to ${endpoint} failed:`, error);
        throw error;
    }
}
const httpPost = async (endpoint: string, data: unknown, options?: IAxiosHttpGet) => {
    try {
        const res = await httpInstance().post(endpoint, data, {
            params: options?.params,
            headers: options?.headers
        });
        return res.data;
    } catch (error) {
        console.log(`POST request to ${endpoint} failed:`, error);
        throw error;
    }
}
const httpPut = async (endpoint: string, data: unknown, options?: IAxiosHttpGet) => {
    try {
        const res = await httpInstance().put(endpoint, data, {
            params: options?.params,
            headers: options?.headers
        });
        return res.data;
    } catch (error) {
        console.log(`PUT request to ${endpoint} failed:`, error);
        throw error;
    }
}
const httpDelete = async (endpoint: string, options?: IAxiosHttpGet) => {
    try {
        const res = await httpInstance().delete(endpoint, {
            params: options?.params,
            headers: options?.headers
        });
        return res.data;
    } catch (error) {
        console.log(`DELETE request to ${endpoint} failed:`, error);
        throw error;
    }
}
const httpPatch = async (endpoint: string, data: unknown, options?: IAxiosHttpGet) => {
    try {
        const res = await httpInstance().patch(endpoint, data, {
            params: options?.params,
            headers: options?.headers
        });
        return res.data;
    } catch (error) {
        console.log(`PATCH request to ${endpoint} failed:`, error);
        throw error;
    }
}

export const httpClient = {
    get: httpGet,
    post: httpPost,
    put: httpPut,
    delete: httpDelete,
    patch: httpPatch
}

