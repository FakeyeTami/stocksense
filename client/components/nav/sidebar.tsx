import { Button } from "@/components/ui/button";
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
                    href: "/products",
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
        <nav className="flex flex-col gap-4 overflow-auto scroll-auto w-full">
            {sidebarNavigation.map((section) => (
                <section key={section.title} className="flex flex-col gap-2">
                    <h6 className="text-xs font-bold">{section.title}</h6>
                    <ul>
                        {section.items.map(({ label, href, icon: Icon }) => (
                            <li key={label} className="font-medium text-sm">
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="w-full justify-start"
                                >
                                    <Link href={href}>
                                        <Icon size={16} />
                                        {label}
                                    </Link>
                                </Button>
                            </li>
                        ))}
                    </ul>
                </section>
            ))}
        </nav>
    );
}
