export interface IBillDetails {
    id: string;
    billItems: IBillItem[];
    payments: IPayments[];
    semester: string;
    totalAmount: number;
    totalPayments: number;
    dueAmount: number;
}

export interface IBillItem {
    id: string;
    name: string;
    totalAmount: string;
}
export interface IPayments {
    name: string;
    amount: string;
    isPaid: boolean;
    isDisabled: boolean;
}
