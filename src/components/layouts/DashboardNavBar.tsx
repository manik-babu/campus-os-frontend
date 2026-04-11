import { INavSection } from "@/@types/navItem";
import { getSession } from "@/services/auth.service";
import { getNavItems } from "@/utils/navItems";
import { redirect } from "next/navigation";
import DashboardNavbarContent from "./DashboardNavbarContent";

export default async function DashboardNavBar() {
    const user = await getSession();
    if (!user) {
        redirect("/erp-login");
    }
    const navItems: INavSection[] = getNavItems(user.role);
    return (
        <DashboardNavbarContent navItems={navItems} user={user} />
    );
}