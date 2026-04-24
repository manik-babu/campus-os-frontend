import { IAdmissionFormsData } from '@/@types/admission';
import { create } from 'zustand';

interface AdmissionFormState {
    data: IAdmissionFormsData | null;
    setData: (data: IAdmissionFormsData | null) => void;
    filter: {
        search: string;
        sortBy: "asc" | "desc";
        page: number;
    },
    setFilter: (filter: AdmissionFormState["filter"]) => void;
}


const useAdmissionFormStore = create<AdmissionFormState>((set) => ({
    data: null,
    filter: {
        search: "",
        sortBy: "desc",
        page: 1,
    },
    setData: (data) => set({ data }),
    setFilter: (filter) => set({ filter }),
}));

export default useAdmissionFormStore;