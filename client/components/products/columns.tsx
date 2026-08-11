// components/product/columns.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Package } from "lucide-react";

export type Product = {
    id: string;
    name: string;
    sku: string;
    image?: string;
    category: { name: string };
    brand?: { name: string } | null;
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

    // Product ID
    {
        accessorKey: "id",
        header: "Product ID",
        cell: ({ row }) => (
            <span className="text-xs font-mono text-muted-foreground">
                #{row.original.id.slice(-8).toUpperCase()}
            </span>
        ),
    },

    // Product — image + name
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
            </Button>
        ),
        cell: ({ row }) => {
            const { name, sku, image } = row.original;
            return (
                <div className="flex items-center gap-3">
                    {/* Logo / thumbnail */}
                    <div className="w-9 h-9 rounded-md border bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {image ? (
                            <img
                                src={image}
                                alt={name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <Package className="h-4 w-4 text-muted-foreground" />
                        )}
                    </div>
                    {/* Name + SKU */}
                    <div className="min-w-0">
                        <p className="font-medium text-sm leading-none truncate">
                            {name}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mt-1">
                            {sku}
                        </p>
                    </div>
                </div>
            );
        },
    },

    // Category
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {row.original.category?.name ?? "—"}
            </span>
        ),
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
            </Button>
        ),
        cell: ({ row }) => {
            const price = Number(row.getValue("sellingPrice"));
            return (
                <span className="font-medium text-sm">£{price.toFixed(2)}</span>
            );
        },
    },

    // QTY — plain number
    {
        accessorKey: "stock",
        header: "QTY",
        cell: ({ row }) => (
            <span className="text-sm tabular-nums font-medium">
                {row.original.stock}
            </span>
        ),
    },

    // Stock — status badge with bar
    {
        id: "stockStatus",
        header: "Stock",
        cell: ({ row }) => {
            const { stock, lowStockAlert } = row.original;
            const isOut = stock === 0;
            const isLow = stock <= lowStockAlert && stock > 0;

            return (
                <div className="flex items-center gap-2">
                    <div className="w-14 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                            className="h-full rounded-full"
                            style={{
                                width: `${Math.min((stock / (lowStockAlert * 10)) * 100, 100)}%`,
                                background: isOut
                                    ? "#DC2626"
                                    : isLow
                                      ? "#D97706"
                                      : "#16A34A",
                            }}
                        />
                    </div>
                    {isOut ? (
                        <Badge
                            variant="outline"
                            className="text-muted-foreground text-xs"
                        >
                            Out
                        </Badge>
                    ) : isLow ? (
                        <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs hover:bg-amber-50">
                            Low
                        </Badge>
                    ) : (
                        <Badge className="bg-green-50 text-green-700 border-green-200 text-xs hover:bg-green-50">
                            OK
                        </Badge>
                    )}
                </div>
            );
        },
    },

    // Brand
    {
        accessorKey: "brand",
        header: "Brand",
        cell: ({ row }) => (
            <span className="text-sm text-muted-foreground">
                {row.original.brand?.name ?? "—"}
            </span>
        ),
    },

    // Cost price
    {
        accessorKey: "costPrice",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
                className="-ml-4"
            >
                Cost
            </Button>
        ),
        cell: ({ row }) => {
            const cost = Number(row.getValue("costPrice"));
            return (
                <span className="text-sm text-muted-foreground">
                    £{cost.toFixed(2)}
                </span>
            );
        },
    },

    // Actions
    {
        id: "actions",
        header: "Action",
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
                        <DropdownMenuItem
                            onClick={() =>
                                navigator.clipboard.writeText(product.id)
                            }
                        >
                            Copy ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit product</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
