"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-zinc-900 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">
                DIDO
            </h1>

            <nav className="space-y-4">
                <Link
                    href="/dashboard"
                    className={`block rounded-lg px-3 py-2 transition ${
                        pathname === "/dashboard"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-zinc-800"
                    }`}
                >
                    Dashboard
                </Link>

                <Link
                    href="/tasks"
                    className={`block rounded-lg px-3 py-2 transition ${
                        pathname === "/tasks"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-zinc-800"
                    }`}
                >
                    Tasks
                </Link>

                <Link
                    href="/analytics"
                    className={`block rounded-lg px-3 py-2 transition ${
                        pathname === "/analytics"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-zinc-800"
                    }`}
                >
                    Analytics
                </Link>

                <Link
                    href="/achievements"
                    className={`block rounded-lg px-3 py-2 transition ${
                        pathname === "/achievements"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-zinc-800"
                    }`}
                >
                    Achievements
                </Link>

                <Link
                    href="/profile"
                    className={`block rounded-lg px-3 py-2 transition ${
                        pathname === "/profile"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-zinc-800"
                    }`}
                >
                    Profile
                </Link>

                <Link
                    href="/settings"
                    className={`block rounded-lg px-3 py-2 transition ${
                        pathname === "/settings"
                            ? "bg-blue-600 text-white"
                            : "hover:bg-zinc-800"
                    }`}
                >
                    Settings
                </Link>
            </nav>
        </aside>
    );
}
