import { SideBar } from "@/components/nav/sidebar";
import { TopBar } from "@/components/nav/top-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SidebarProvider>
            <SideBar />

            <SidebarInset>
                {/* Top bar adjusts automatically */}
                <header className="sticky top-0 z-50 h-16 border-b bg-background">
                    <TopBar />
                </header>

                {/* Page content */}
                <main className="flex-1 p-6">{children}</main>
            </SidebarInset>
        </SidebarProvider>
    );
}
