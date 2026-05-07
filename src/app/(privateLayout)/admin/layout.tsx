
export const metadata = {
    title: "Admin Dashboard - Uttara University",
    description: "Admin dashboard for managing Uttara University resources and data.",
};

export default function AdminLayout({
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