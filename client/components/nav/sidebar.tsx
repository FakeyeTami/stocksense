import { Separator } from "@/components/ui/separator";
import { SidebarSection } from "@/types/sidebar-section.types";
import {
    Bot,
    Box,
    Building2,
    ChartColumnBig,
    ChartPie,
    CirclePile,
    Container,
    FileChartColumn,
    FileQuestionMark,
    Files,
    FileText,
    FileUp,
    FolderDown,
    LayoutDashboard,
    LayoutList,
    ReceiptText,
    ShoppingBag,
    TrendingDown,
    UsersRound,
} from "lucide-react";
import Link from "next/link";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "../ui/sidebar";

export function SideBar() {
    const sidebarNavigation: SidebarSection[] = [
        {
            title: "Main",
            items: [
                {
                    label: "Dashboard",
                    icon: LayoutDashboard,
                    href: "/dashboard",
                },
            ],
        },
        {
            title: "Inventory",
            items: [
                {
                    label: "Products",
                    icon: Box,
                    href: "/dashboard/products",
                },
                {
                    label: "Low Stock",
                    icon: TrendingDown,
                    href: "/products",
                },
                {
                    label: "Categories",
                    icon: LayoutList,
                    href: "/products",
                },
                {
                    label: "Import CSV",
                    icon: FolderDown,
                    href: "/products",
                },
            ],
        },
        {
            title: "Sales",
            items: [
                {
                    label: "Sales",
                    icon: LayoutDashboard,
                    href: "",
                },
                {
                    label: "Invoices",
                    icon: FileText,
                    href: "/products",
                },
                {
                    label: "Returns",
                    icon: FileUp,
                    href: "/products",
                },
                {
                    label: "Quotations",
                    icon: Files,
                    href: "/products",
                },
            ],
        },
        {
            title: "Purchases",
            items: [
                {
                    label: "Purchases",
                    icon: ShoppingBag,
                    href: "/products",
                },
                {
                    label: "Purchase Orders",
                    icon: FileQuestionMark,
                    href: "/products",
                },
                {
                    label: "Purchase Returns",
                    icon: FileUp,
                    href: "/products",
                },
            ],
        },
        {
            title: "People",
            items: [
                {
                    label: "Customers",
                    icon: CirclePile,
                    href: "/products",
                },
                {
                    label: "Suppliers",
                    icon: Container,
                    href: "/products",
                },
            ],
        },
        {
            title: "Analytics",
            items: [
                {
                    label: "Sales Report",
                    icon: ChartColumnBig,
                    href: "/products",
                },
                {
                    label: "Inventory Report",
                    icon: FileChartColumn,
                    href: "/products",
                },
                {
                    label: "Profit & Loss",
                    icon: ChartPie,
                    href: "/products",
                },
                {
                    label: "AI Forecasting",
                    icon: Bot,
                    href: "/products",
                },
            ],
        },
        {
            title: "Settings",
            items: [
                {
                    label: "Organization",
                    icon: Building2,
                    href: "/products",
                },
                {
                    label: "Team & Staff",
                    icon: UsersRound,
                    href: "/products",
                },
                {
                    label: "Billing",
                    icon: ReceiptText,
                    href: "/products",
                },
            ],
        },
    ];

    return (
        <Sidebar>
            <SidebarHeader className="flex items-center justify-center">
                <h1>StockSense</h1>
            </SidebarHeader>
            <Separator />
            <SidebarContent className="p-3">
                {sidebarNavigation.map((group) => (
                    <SidebarGroup key={group.title}>
                        <SidebarGroupLabel className="text-xs font-bold">
                            {group.title}
                        </SidebarGroupLabel>
                        <SidebarMenu>
                            {group.items.map(({ label, href, icon: Icon }) => (
                                <SidebarMenuItem
                                    key={label}
                                    className="font-medium text-sm"
                                >
                                    <SidebarMenuButton asChild className="pl-4">
                                        <Link href={href}>
                                            <Icon />
                                            <span>{label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroup>
                ))}
            </SidebarContent>
        </Sidebar>
    );
}
