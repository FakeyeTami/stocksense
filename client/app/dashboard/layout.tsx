import { SideBar } from "@/components/dashboard/sidebar";
import { TopBar } from "@/components/dashboard/top-bar";
import React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 h-16 border-b bg-background">
                <TopBar />
            </header>

            <aside className="fixed left-0 top-16 w-3xs h-[calc(100vh-4rem)] overflow-y-auto border-r p-6 bg-background">
                <SideBar />
            </aside>

            <main className="ml-64 mt-16 h-[calc(100vh-4rem)] overflow-y-auto p-6">
                {children}
            </main>
        </>
    );
}
