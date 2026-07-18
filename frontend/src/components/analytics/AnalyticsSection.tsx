"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Task } from "@/src/types/task";
import * as taskApi from "@/src/services/taskApi";

const TaskStatusChart = dynamic(
    () => import("@/src/components/TaskStatusChart"),
    { ssr: false }
);

const PriorityChart = dynamic(
    () => import("@/src/components/PriorityChart"),
    { ssr: false }
);

export default function AnalyticsSection() {

    // Productivity analytics
    const [analytics, setAnalytics] = useState({
        score: 0,
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        completedPoints: 0,
        totalPoints: 0,
    });

    // Weekly analytics
    const [weeklyAnalytics, setWeeklyAnalytics] = useState({
        tasksCreated: 0,
        completedTasks: 0,
        completionRate: 0,
        totalEstimatedDuration: 0,
    });

    // Tasks (needed by PriorityChart)
    const [tasks, setTasks] = useState<Task[]>([]);

    const loadAnalytics = async () => {
        const data = await taskApi.getAnalytics();
        setAnalytics(data);
    };

    const loadWeeklyAnalytics = async () => {
        const data = await taskApi.getWeeklyAnalytics();
        setWeeklyAnalytics(data);
    };

    const loadTasks = async () => {
        const data = await taskApi.getTasks();
        setTasks(Array.isArray(data) ? data : []);
    };

    useEffect(() => {
        loadAnalytics();
        loadWeeklyAnalytics();
        loadTasks();
    }, []);

    return (
        <>
            {/* Productivity Analytics */}
            <h2 className="mb-3 text-lg font-semibold text-zinc-600">Productivity</h2>
            <div className="mb-6 grid grid-cols-4 gap-4">

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-sm text-zinc-500">Score</h3>
                    <p className="text-3xl font-bold">{analytics.score}%</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-sm text-zinc-500">Total Tasks</h3>
                    <p className="text-3xl font-bold">{analytics.totalTasks}</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-sm text-zinc-500">Completed</h3>
                    <p className="text-3xl font-bold">{analytics.completedTasks}</p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h3 className="text-sm text-zinc-500">Pending</h3>
                    <p className="text-3xl font-bold">{analytics.pendingTasks}</p>
                </div>

            </div>

            {/* Weekly Analytics */}
            <h2 className="mb-3 text-lg font-semibold text-zinc-600">This Week</h2>
            <div className="mb-8 grid grid-cols-4 gap-4">

                <div className="rounded-xl bg-white p-6 shadow">
                    <h2>Created This Week</h2>
                    <p className="text-3xl font-bold">
                        {weeklyAnalytics.tasksCreated}
                    </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h2>Completed This Week</h2>
                    <p className="text-3xl font-bold">
                        {weeklyAnalytics.completedTasks}
                    </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h2>Completion Rate</h2>
                    <p className="text-3xl font-bold">
                        {weeklyAnalytics.completionRate}%
                    </p>
                </div>

                <div className="rounded-xl bg-white p-6 shadow">
                    <h2>Estimated Time</h2>
                    <p className="text-3xl font-bold">
                        {weeklyAnalytics.totalEstimatedDuration} min
                    </p>
                </div>

            </div>

            {/* Charts */}
            <div className="mb-8 grid grid-cols-2 gap-6">
                <TaskStatusChart
                    completed={analytics.completedTasks}
                    pending={analytics.pendingTasks}
                />

                <PriorityChart tasks={tasks} />
            </div>
        </>
    );
}
