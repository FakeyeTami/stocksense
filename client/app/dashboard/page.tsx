"use client";

import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { useAuthStore } from "@/store/auth.store";

export default function Dashboard() {
    const { user } = useAuthStore();

    return (
        <section>
            <DashboardOverview />
        </section>
    );
}
