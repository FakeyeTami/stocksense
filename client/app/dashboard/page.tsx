"use client";

import { useAuthStore } from "@/store/auth.store";

export default function Dashboard() {
    const { user } = useAuthStore();

    return (
        <>
            <div>
                <h3>{`${user?.firstName} ${user?.lastName}`}</h3>
                <p>{user?.email}</p>
                <p>{user?.role}</p>
            </div>
        </>
    );
}
