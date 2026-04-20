import { IEnrolledCourse, ISemester } from '@/@types/enrollment';
import { create } from 'zustand';

interface ClassRoomsState {
    classRooms: IEnrolledCourse[] | null;
    semesters: ISemester[] | null;
    selectedSemesterId: string;
    setClassRooms: (classRooms: IEnrolledCourse[]) => void;
    setSemesters: (semesters: ISemester[] | null) => void;
    setSelectedSemesterId: (semesterId: string) => void;
}


const useClassRoomsStore = create<ClassRoomsState>((set) => ({
    classRooms: null,
    semesters: null,
    selectedSemesterId: "",
    setClassRooms: (classRooms) => set({ classRooms }),
    setSemesters: (semesters) => set({ semesters }),
    setSelectedSemesterId: (semesterId) => set({ selectedSemesterId: semesterId }),
}));

export default useClassRoomsStore;