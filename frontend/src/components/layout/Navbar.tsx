"use client";

import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
    return (
        <header className="flex items-center justify-between border-b bg-white px-8 py-4 shadow-sm">
            <div>
                <h1 className="text-2xl font-bold">
                    DIDO
                </h1>
                <p className="text-sm text-gray-500">
                    Task & Productivity Manager
                </p>
            </div>

            <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => {
                    localStorage.removeItem("token");
                    router.replace("/login");
                }}
            >
                Logout
            </button>
        </header>
    );
}
