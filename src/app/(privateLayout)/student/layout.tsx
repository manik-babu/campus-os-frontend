export const metadata = {
    title: "Student Dashboard - Uttara University",
    description: "Student dashboard for managing Uttara University resources and data.",
};

export default function StudentLayout({
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