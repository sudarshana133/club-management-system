import React from "react";
import { LayoutDashboardIcon, Calendar, PlusCircleIcon, User } from "lucide-react"
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
    },
    {
        href:"/admin/members",
        label:"Members",
        icon: User
    },
    {
        href:"/admin/addMembers",
        label:"Add Members",
        icon: PlusCircleIcon
    }
]
export default sidebarItems;