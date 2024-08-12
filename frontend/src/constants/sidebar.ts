import React from "react";
import { LayoutDashboardIcon, Calendar, PlusCircleIcon,  Users } from "lucide-react"
import { AddMember } from "../components/adminComponents/CustomIcon";
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
        icon: Users
    },
    {
        href:"/admin/addMembers",
        label:"Add Members",
        icon: AddMember
    }
]
export default sidebarItems;