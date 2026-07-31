import { SideBar } from "@/components/nav/sidebar";
import { TopBar } from "@/components/nav/top-bar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();

    if (!cookieStore.get("access_token")) {
        redirect("/login");
    }

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
