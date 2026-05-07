export const metadata = {
    title: "Super Admin Dashboard - Uttara University",
    description: "Super admin dashboard for managing Uttara University resources and data.",
};

export default function SuperAdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    )
}