import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export function ProductsTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>SKU/Product ID</TableHead>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>QTY</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>
        </Table>
    );
}
