"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/src/components/layout/Sidebar";
import Navbar from "@/src/components/layout/Navbar";

interface Props {
    children: ReactNode;
}

export default function AppLayout({ children }: Props) {
    const router = useRouter();
    useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
        router.replace("/login");
    }

}, [router]);
    return (
        <div className="flex min-h-screen">
            <Sidebar />

            <div className="flex flex-1 flex-col">
                <Navbar />

                <main className="flex-1 p-8 bg-zinc-100">
                    {children}
                </main>
            </div>
        </div>
    );
}
