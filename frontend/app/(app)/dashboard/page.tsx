"use client";

import AnalyticsSection from "@/src/components/analytics/AnalyticsSection";
import AchievementsSection from "@/src/components/achievements/AchievementsSection";
import RecentTasks from "@/src/components/dashboard/RecentTasks";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-zinc-100 p-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">DIDO Dashboard</h1>
        </div>

        {/* Analytics */}
        <AnalyticsSection />

        {/* Achievements */}
        <AchievementsSection />

        {/* Recent Tasks */}
        <RecentTasks />

      </div>

    </main>
  );
}
