import { DollarSign, RotateCcw, ShoppingCart, TrendingUp } from "lucide-react";
import { OverviewCard } from "./overview-card";

export function DashboardOverview() {
    return (
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <OverviewCard
                title="Todays Sales"
                value="12,450"
                trend="8.4%"
                icon={DollarSign}
            />
            <OverviewCard
                title="Todays Orders"
                value="1,865"
                trend="5.2%"
                icon={ShoppingCart}
            />
            <OverviewCard
                title="Net Profit"
                value="4,320"
                trend="6.8%"
                icon={TrendingUp}
            />
            <OverviewCard
                title="Sales Return"
                value="540"
                trend="2.1%"
                icon={RotateCcw}
            />
        </div>
    );
}
