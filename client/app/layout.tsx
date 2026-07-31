import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const sans = IBM_Plex_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
});

const serif = IBM_Plex_Serif({
    subsets: ["latin"],
    variable: "--font-serif",
    weight: ["400", "500", "700"],
});

const mono = IBM_Plex_Mono({
    subsets: ["latin"],
    variable: "--font-mono",
    weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
    title: "StockSense | Inventory Management System",
    description:
        "StockSense is an inventory management system designed for small businesses to efficiently control and manage products in real time, integrated to help grow your business.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${sans.variable} ${serif.variable} ${mono.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
