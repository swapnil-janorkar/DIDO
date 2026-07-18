"use client";

import { useEffect, useState } from "react";
import { Achievement } from "@/src/types/achievement";
import * as taskApi from "@/src/services/taskApi";

export default function AchievementsSection() {
    const [achievements, setAchievements] = useState<Achievement[]>([]);

    const loadAchievements = async () => {
        const data = await taskApi.getAchievements();
        setAchievements(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        loadAchievements();
    }, []);

    return (
        <div className="mb-8 rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-2xl font-semibold">🏅 Achievements</h2>

            <div className="space-y-3">
                {achievements.length === 0 ? (
                    <p className="text-sm text-zinc-500">No achievements unlocked yet.</p>
                ) : (
                    achievements.map(achievement => (
                        <div
                            key={achievement.name}
                            className="flex items-start gap-4 rounded-lg border p-3"
                        >
                            <div className="text-3xl">{achievement.badge}</div>
                            <div>
                                <div className="font-semibold">{achievement.name}</div>
                                <div className="text-sm text-gray-500">{achievement.description}</div>
                                <div className="mt-1 text-xs text-zinc-400">
                                    Unlocked {new Date(achievement.unlocked_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
