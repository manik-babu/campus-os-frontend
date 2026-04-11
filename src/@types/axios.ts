export interface IAxiosHttpGet {
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
}

export type IApiResponse<T = unknown> = {
    ok: boolean;
    message: string;
    status?: number;
    data?: T;
    error?: unknown;
    zodErrors?: IZodError[];
};

export interface IApiError {
    ok: boolean;
    status: number;
    message: string;
    error: unknown;
    zodErrors?: IZodError[];
}
interface IZodError {
    path: string,
    message: string
}