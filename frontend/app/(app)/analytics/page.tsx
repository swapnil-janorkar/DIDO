"use client";

import AnalyticsSection from "@/src/components/analytics/AnalyticsSection";

export default function AnalyticsPage() {
    return (
        <main className="min-h-screen bg-zinc-100 p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-4xl font-bold">
                    Analytics
                </h1>

                <AnalyticsSection />
            </div>
        </main>
    );
}
