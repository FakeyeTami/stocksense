"use client";

import { DashboardOverview } from "@/components/dashboard/dashboard-overview";
import { useAuthStore } from "@/store/auth.store";

export default function Dashboard() {
    const { user } = useAuthStore();

    return (
        <section>
            <DashboardOverview />

            <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
            <p>{user?.email}</p>
            <p>{user?.role}</p>
        </section>
    );
}
