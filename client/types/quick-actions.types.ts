import { LucideIcon } from "lucide-react";

export interface QuickAction {
    [x: string]: array;
    label: string;
    icon: LucideIcon;
    href: string;
    separated?: boolean;
}
