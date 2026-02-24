import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation */}
            <nav className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Image
                            src="/assets/logo.png"
                            alt="Logo"
                            width={50}
                            height={50}
                            className="h-10 w-auto"
                        />
                        <Link href="/login">
                            <Button variant="default">Login</Button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <section className="py-12 md:py-20 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        {/* Text Content */}
                        <div className="space-y-6">
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Inventory & Stock Management System for Small
                                Businesses
                            </h1>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Inventory system to control and manage products
                                in the warehouse in real time and integrated to
                                make it easier to develop your business.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/register">
                                    <Button size="lg">Get Started</Button>
                                </Link>
                                <Link href="/login">
                                    <Button size="lg" variant="outline">
                                        Login
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="relative w-full aspect-square lg:aspect-auto lg:h-96">
                            <Image
                                src="/assets/hero.png"
                                alt="Inventory management dashboard illustration"
                                fill
                                className="object-contain bg-gray-300 rounded-md"
                                priority
                            />
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
