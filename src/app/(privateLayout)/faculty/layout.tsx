export const metadata = {
    title: "Faculty Dashboard - Uttara University",
    description: "Faculty dashboard for managing Uttara University resources and data.",
};

export default function FacultyLayout({
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