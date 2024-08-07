import React from "react";
import { LayoutDashboardIcon, Group, Calendar } from "lucide-react"
type SidebarItem = {
    href: string;
    label: string;
    icon: React.ElementType;
};

const sidebarItems: SidebarItem[] = [
    {
        href: "/",
        label: "Dashboard",
        icon: LayoutDashboardIcon
    },
    {
        href: "/clubs",
        label: "Clubs",
        icon: Group,
    },
    {
        href: "/events",
        label: "Events",
        icon: Calendar
    }
]
export default sidebarItems;