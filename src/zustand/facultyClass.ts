import { ISemester } from '@/@types/enrollment';
import { IFacultyClass } from '@/@types/facultyClass';
import { create } from 'zustand';

interface ClassRoomsState {
    classRooms: IFacultyClass[] | null;
    semesters: ISemester[] | null;
    selectedSemesterId: string;
    setClassRooms: (classRooms: IFacultyClass[]) => void;
    setSemesters: (semesters: ISemester[] | null) => void;
    setSelectedSemesterId: (semesterId: string) => void;
}


const useFacultyClassStore = create<ClassRoomsState>((set) => ({
    classRooms: null,
    semesters: null,
    selectedSemesterId: "",
    setClassRooms: (classRooms) => set({ classRooms }),
    setSemesters: (semesters) => set({ semesters }),
    setSelectedSemesterId: (semesterId) => set({ selectedSemesterId: semesterId }),
}));

export default useFacultyClassStore;