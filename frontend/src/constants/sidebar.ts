import React from "react";
import { LayoutDashboardIcon, Calendar, PlusCircleIcon } from "lucide-react"
type SidebarItem = {
    href: string;
    label: string;
    icon: React.ElementType;
};

const sidebarItems: SidebarItem[] = [
    {
        href: "/admin",
        label: "Dashboard",
        icon: LayoutDashboardIcon
    },
    {
        href: "/admin/events",
        label: "Events",
        icon: Calendar
    },
    {
        href:"/admin/addevent",
        label:"Add Event",
        icon: PlusCircleIcon
    }
]
export default sidebarItems;