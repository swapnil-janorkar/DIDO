"use client";

import AchievementsSection from "@/src/components/achievements/AchievementsSection";

export default function AchievementsPage() {
    return (
        <main className="min-h-screen bg-zinc-100 p-8">
            <div className="mx-auto max-w-6xl">
                <h1 className="mb-8 text-4xl font-bold">
                    Achievements
                </h1>

                <AchievementsSection />
            </div>
        </main>
    );
}
