import { QuickAction } from "@/types/quick-actions.types";
import {
    DollarSign,
    FolderDown,
    Package,
    Plus,
    ShoppingCart,
    Truck,
    User,
} from "lucide-react";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const quickActions: QuickAction[] = [
    {
        label: "Add Product",
        icon: Package,
        href: "/products/new",
    },
    {
        label: "New Sale",
        icon: DollarSign,
        href: "/sale/new",
    },
    {
        label: "New Purchase",
        icon: ShoppingCart,
        href: "/product/purchase",
    },
    {
        label: "Add Supplier",
        icon: Truck,
        href: "",
    },
    {
        label: "New Staff",
        icon: User,
        href: "",
    },
    {
        label: "Import CSV",
        icon: FolderDown,
        href: "",
        separated: true,
    },
];

export function QuickActionsMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button variant="outline">
                    Add New <Plus />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-40" align="start">
                <DropdownMenuGroup>
                    {quickActions.map((action, index) => (
                        <Fragment key={index}>
                            {action.separated && <DropdownMenuSeparator />}

                            <DropdownMenuItem>
                                <Link
                                    href={action.href}
                                    className="flex items-center justify-center gap-2.5 p-1"
                                >
                                    <action.icon />
                                    {action.label}
                                </Link>
                            </DropdownMenuItem>
                        </Fragment>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
