import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export function ProductsHeader() {
    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-lg font-bold">Product List</h1>

                <p className="text-sm text-muted-foreground">
                    Manage your products
                </p>
            </div>

            <div className="flex gap-3">
                <Link href="/dashboard/products/new">
                    <Button type="button">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </Link>

                <Button type="button" variant="secondary">
                    Import Product
                </Button>
            </div>
        </header>
    );
}
