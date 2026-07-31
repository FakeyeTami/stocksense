import { ProductForm } from "@/components/products/product-form";
import api from "@/lib/api";
import { cookies } from "next/headers";

async function getFormData() {
    const cookieStore = await cookies();
    const token = cookieStore.get("jwt")?.value;
    const headers = { Cookie: `jwt=${token}` };

    const [categories, brands, suppliers] = await Promise.all([
        api
            .get("/api/v1/categories", { headers })
            .then((r) => r.data)
            .catch(() => []),
        api
            .get("/api/v1/brands", { headers })
            .then((r) => r.data)
            .catch(() => []),
        api
            .get("/api/v1/suppliers", { headers })
            .then((r) => r.data)
            .catch(() => []),
    ]);

    return { categories, brands, suppliers };
}

export default async function NewProductPage() {
    const { categories, brands, suppliers } = await getFormData();

    return (
        <div className="max-w-[1071px] space-y-6">
            <div>
                <h1 className="text-xl font-semibold tracking-tight">
                    Add product
                </h1>
            </div>

            <ProductForm
                categories={categories}
                brands={brands}
                suppliers={suppliers}
            />
        </div>
    );
}
