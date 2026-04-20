import { INavSection } from "@/@types/navItem";
import { } from "lucide-react"
const adminNavItems: INavSection[] = [
    {
        items: [
            {
                title: "Dashboard",
                href: "/admin/dashboard",
                icon: "LayoutDashboard",
            },
            {
                title: "My Profile",
                href: "/cmn/profile",
                icon: "User",
            },

        ],
    },
    {
        title: "Admissions",
        items: [
            {
                title: "Admission Forms",
                href: "/admin/admission-forms",
                icon: "FileText",
            },
            {
                title: "Register",
                href: "/admin/register",
                icon: "UserPlus",
            }
        ]
    }, {
        title: "Academics",
        items: [
            {
                title: "Batches",
                href: "/admin/batches/add",
                icon: "Layers",
            },
            {
                title: "Courses",
                href: "/admin/courses/add",
                icon: "BookOpen",
            },
            {
                title: "Offerings",
                href: "/admin/offerings/add",
                icon: "Layers",
            }
        ]
    },
    {
        title: "Settings",
        items: [
            {
                title: "Change Password",
                href: "/cmn/settings/change-password",
                icon: "Settings",
            },
        ]
    }
];

const facultyNavItems: INavSection[] = [
    {
        items: [
            {
                title: "Dashboard",
                href: "/faculty/dashboard",
                icon: "LayoutDashboard",
            },
            {
                title: "My Profile",
                href: "/cmn/profile",
                icon: "User",
            },

        ],
    },
    {
        title: "Academics",
        items: [
            {
                title: "Class Rooms",
                href: "/faculty/class-rooms",
                icon: "BookOpen",
            },
            {
                title: "Classes",
                href: "/faculty/classes",
                icon: "Layers",
            },
        ]
    },
    {
        title: "Settings",
        items: [
            {
                title: "Change Password",
                href: "/cmn/settings/change-password",
                icon: "Settings",
            },
        ]
    }
];

const studentNavItems: INavSection[] = [
    {
        items: [
            {
                title: "Dashboard",
                href: "/student/dashboard",
                icon: "LayoutDashboard",
            },
            {
                title: "My Profile",
                href: "/cmn/profile",
                icon: "User",
            },

        ],
    },
    {
        title: "Academics",
        items: [
            {
                title: "Class Rooms",
                href: "/student/class-rooms",
                icon: "Layers",
            },
            {
                title: "My Enrollments",
                href: "/student/enrollments",
                icon: "CheckSquare",
            },
            {
                title: "My Results",
                href: "/student/results",
                icon: "FileText",
            }
        ]
    },
    {
        title: "Payments",
        items: [
            {
                title: "My Payments",
                href: "/student/payments",
                icon: "CreditCard",
            },
        ]
    },
    {
        title: "Settings",
        items: [
            {
                title: "Change Password",
                href: "/cmn/settings/change-password",
                icon: "Settings",
            },
        ]
    }
]

const superAdminNavItems: INavSection[] = [
    {
        items: [
            {
                title: "Dashboard",
                href: "/super-admin/dashboard",
                icon: "LayoutDashboard",
            },
            {
                title: "My Profile",
                href: "/cmn/profile",
                icon: "User",
            },

        ],
    },
    {
        title: "Academics",
        items: [
            {
                title: "Programs",
                href: "/super-admin/programs",
                icon: "BookOpen",
            },
            {
                title: "Departments",
                href: "/super-admin/departments",
                icon: "Layers",
            },
            {
                title: "Semesters",
                href: "/super-admin/semesters",
                icon: "Calendar",
            }
        ]
    },
    {
        title: "User Management",
        items: [
            {
                title: "Admins",
                href: "/super-admin/users",
                icon: "UserPlus",
            },
        ]
    },
    {
        title: "Settings",
        items: [
            {
                title: "Change Password",
                href: "/cmn/settings/change-password",
                icon: "Settings",
            },
        ]
    }
]

export { adminNavItems, facultyNavItems, studentNavItems, superAdminNavItems };