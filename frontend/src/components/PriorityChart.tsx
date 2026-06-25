"use client";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

type Props = {
    tasks: {
        priority: string;
    }[];
};

export default function PriorityChart({
    tasks
}: Props) {

    const counts = {
        CRITICAL: 0,
        HIGH: 0,
        MEDIUM: 0,
        LOW: 0
    };

    tasks.forEach(task => {
        if (task.priority in counts) {
            counts[task.priority as keyof typeof counts]++;
        }
    });

    const data = [
        { priority: "CRITICAL", count: counts.CRITICAL },
        { priority: "HIGH",     count: counts.HIGH },
        { priority: "MEDIUM",   count: counts.MEDIUM },
        { priority: "LOW",      count: counts.LOW }
    ];

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">
                Priority Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <XAxis dataKey="priority" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#6366f1" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
