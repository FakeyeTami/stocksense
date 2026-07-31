// components/product/columns.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export type Product = {
    id: string;
    name: string;
    sku: string;
    category: { name: string };
    sellingPrice: number;
    costPrice: number;
    stock: number;
    lowStockAlert: number;
    available: boolean;
};

export const columns: ColumnDef<Product>[] = [
    // Checkbox column
    {
        id: "select",
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllPageRowsSelected()}
                onChange={(e) =>
                    table.toggleAllPageRowsSelected(e.target.checked)
                }
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={(e) => row.toggleSelected(e.target.checked)}
            />
        ),
        enableSorting: false,
    },

    // Product name + SKU
    {
        accessorKey: "name",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="-ml-4"
            >
                Product
                <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => (
            <div>
                <div className="font-medium">{row.getValue("name")}</div>
                <div className="text-xs text-muted-foreground font-mono">
                    {row.original.sku}
                </div>
            </div>
        ),
    },

    // Category
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => row.original.category.name,
    },

    // Stock with visual indicator
    {
        accessorKey: "stock",
        header: "Stock",
        cell: ({ row }) => {
            const stock = row.original.stock;
            const lowStockAlert = row.original.lowStockAlert;
            const isLow = stock <= lowStockAlert;
            const isOut = stock === 0;

            return (
                <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full transition-all"
                            style={{
                                width: `${Math.min((stock / 200) * 100, 100)}%`,
                                background: isOut
                                    ? "#DC2626"
                                    : isLow
                                      ? "#D97706"
                                      : "#16A34A",
                            }}
                        />
                    </div>
                    <span
                        className="text-sm font-medium tabular-nums"
                        style={{
                            color: isOut
                                ? "#DC2626"
                                : isLow
                                  ? "#D97706"
                                  : "#16A34A",
                        }}
                    >
                        {stock}
                    </span>
                </div>
            );
        },
    },

    // Selling price
    {
        accessorKey: "sellingPrice",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="-ml-4"
            >
                Price
                <ArrowUpDown className="ml-2 h-3 w-3" />
            </Button>
        ),
        cell: ({ row }) => {
            const price = parseFloat(row.getValue("sellingPrice"));
            return <span className="font-medium">£{price.toFixed(2)}</span>;
        },
    },

    // Status badge
    {
        accessorKey: "available",
        header: "Status",
        cell: ({ row }) => {
            const stock = row.original.stock;
            const threshold = row.original.lowStockAlert;

            if (stock === 0) {
                return (
                    <Badge variant="outline" className="text-muted-foreground">
                        Out of stock
                    </Badge>
                );
            }
            if (stock <= threshold) {
                return (
                    <Badge className="bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-50">
                        Low stock
                    </Badge>
                );
            }
            return (
                <Badge className="bg-green-50 text-green-700 border border-green-200 hover:bg-green-50">
                    In stock
                </Badge>
            );
        },
    },

    // Actions dropdown
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(product.sku)
                            }
                        >
                            Copy SKU
                        </DropdownMenuItem>
                        <DropdownMenuItem>Edit product</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
