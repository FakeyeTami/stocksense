import { columns } from "@/components/products/columns";
import { DataTable } from "@/components/products/data-table";
import { ProductsHeader } from "@/components/products/products-header";
import api from "@/lib/api";

const getProducts = async () => {
    try {
        const response = await api.get("/api/v1/products");
        return { data: response.data || [], error: null };
    } catch (error) {
        return { data: [], error: `Failed to load products, ${error}` };
    }
};

export default async function Products() {
    const { data: products, error } = await getProducts();

    if (error) return <p className="text-sm text-destructive">{error}</p>;

    return (
        <section className="max-w-screen-2xl space-y-6">
            <ProductsHeader />
            <DataTable columns={columns} data={products} />
        </section>
    );
}
