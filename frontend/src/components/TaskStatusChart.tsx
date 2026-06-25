"use client";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

type Props = {
    completed: number;
    pending: number;
};

export default function TaskStatusChart({
    completed,
    pending
}: Props) {

    const data = [
        {
            name: "Completed",
            value: completed
        },
        {
            name: "Pending",
            value: pending
        }
    ];

    return (
        <div className="rounded-xl bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-semibold">
                Task Status
            </h2>

            <ResponsiveContainer
                width="100%"
                height={300}
            >
                <PieChart>

                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                    >
                        <Cell />
                        <Cell />
                    </Pie>

                    <Tooltip />
                    <Legend />

                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
