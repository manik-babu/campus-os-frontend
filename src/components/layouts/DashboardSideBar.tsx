import { INavSection } from "@/@types/navItem";
import { getSession } from "@/services/auth.service";
import { getNavItems } from "@/utils/navItems";
import { redirect } from "next/navigation";
import DashboardSideBarContent from "./DashboardSideBarContent";


export default async function DashboardSideBar() {
    const user = await getSession();
    if (!user) {
        redirect("/erp-login");
    }
    const navItems: INavSection[] = getNavItems(user.role);
    return (
        <DashboardSideBarContent navItems={navItems} user={user} className="hidden md:flex" />
    );
}