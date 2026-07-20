import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const fontSans = IBM_Plex_Sans({
    subsets: ["latin"],
    variable: "--font-sans",
    weight: ["400", "500", "600", "700"],
});

const fontSerif = IBM_Plex_Serif({
    subsets: ["latin"],
    variable: "--font-serif",
    weight: ["400", "500", "700"],
});

const fontMono = IBM_Plex_Mono({
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
                className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
