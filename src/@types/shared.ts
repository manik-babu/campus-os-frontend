export interface IBatch {
    id: string;
    batchNo: string;
    description: string;
}
export interface IMeta {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}