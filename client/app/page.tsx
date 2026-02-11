import Image from "next/image";

function Button({ children }: { children: React.ReactNode }) {
    return (
        <button className="px-5 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors hover:translate-y-2 duration-300">
            {children}
        </button>
    );
}

export default function Home() {
    return (
        <main className="max-w-[1536px] mx-auto">
            <div className="px-20">
                <nav className="flex items-center justify-between p-4">
                    <Image
                        src="/assets/logo.png"
                        alt="Logo"
                        width={50}
                        height={20}
                    />
                    <Button>Login</Button>
                </nav>
                <section className="flex flex-col md:flex-row justify-center items-center gap-24 mt-20">
                    <div className="w-full md:w-1/2">
                        <h2 className="text-4xl md:text-6xl font-bold">
                            Inventory & Stock Management System for Small
                            Businesses
                        </h2>
                        <p className="text-base mt-4">
                            Inventory system to control and manage products in
                            the warehouse in real time and integrated to make it
                            easier to develop your business.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <Button>Register</Button>
                            <Button>Login</Button>
                        </div>
                    </div>

                    <Image
                        src="/assets/hero.png"
                        alt="Hero Image"
                        width={501}
                        height={498}
                        className="bg-gray-300 rounded-md w-full md:w-1/2"
                    />
                </section>
            </div>
        </main>
    );
}
