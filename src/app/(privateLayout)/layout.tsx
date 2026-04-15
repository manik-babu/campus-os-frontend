import DashboardNavBar from "@/components/layouts/DashboardNavBar";
import DashboardSideBar from "@/components/layouts/DashboardSideBar";
import { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
    title: "Uttara University",
    description: "Welcome to Uttara University!",
}

export default function PrivateLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex h-screen overflow-hidden">
            {/* Dashboard Sidebar */}
            <DashboardSideBar />

            <div className="flex flex-1 flex-col overflow-hidden">
                {/* DashboardNavbar */}
                <DashboardNavBar />
                {/* Dashboard Content */}
                <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
                    <div>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}