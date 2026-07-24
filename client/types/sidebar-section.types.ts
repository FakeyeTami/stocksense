import { LucideIcon } from "lucide-react";

export interface SidebarItem {
    label: string;
    href: string;
    icon: LucideIcon;
}

export interface SidebarSection {
    title: string;
    items: SidebarItem[];
}
