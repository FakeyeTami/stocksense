import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const lato = Lato({
    subsets: ["latin"],
    variable: "--font-lato",
    weight: ["300", "400", "700", "900"],
    display: "swap",
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
            <body className={`${lato.variable} font-sans antialiased`}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
