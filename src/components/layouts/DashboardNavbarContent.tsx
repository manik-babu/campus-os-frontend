"use client";

import { INavSection } from "@/@types/navItem";
import { ISessionUser } from "@/@types/session";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import DashboardSideBarContent from "./DashboardSideBarContent";
import { useState } from "react";

interface DashboardNavbarContentProps {
    navItems: INavSection[];
    user: ISessionUser;
}
export default function DashboardNavbarContent({ navItems, user }: DashboardNavbarContentProps) {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="flex md:hidden h-16 items-center border-b px-6">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger className="md:hidden flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.633h16.5M3.75 12h16.5m-16.5 5.367h16.5" />
                    </svg> Menu
                </SheetTrigger>
                {/* Mobile Navigation Content */}
                <SheetContent side="left" className="w-64!">
                    <SheetTitle className="hidden"></SheetTitle>
                    <DashboardSideBarContent navItems={navItems} user={user} className="flex" setCloseSidebar={setIsOpen} />
                </SheetContent>
            </Sheet>
        </div>
    );
}