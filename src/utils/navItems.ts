import { UserRole } from "@/@types/session";
import { adminNavItems, facultyNavItems, studentNavItems, superAdminNavItems } from "@/data/navItem";

export const getNavItems = (role: UserRole) => {
    switch (role) {
        case UserRole.ADMIN:
            return adminNavItems;
        case UserRole.FACULTY:
            return facultyNavItems;
        case UserRole.STUDENT:
            return studentNavItems;
        case UserRole.SUPER_ADMIN:
            return superAdminNavItems;
        default:
            return [];
    }
};