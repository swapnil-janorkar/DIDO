"use client";

import TaskSection from "@/src/components/tasks/TaskSection";

export default function TasksPage() {
    return (
        <main className="min-h-screen bg-zinc-100 p-8">
            <div className="mx-auto max-w-5xl">
                <h1 className="mb-8 text-4xl font-bold">Tasks</h1>

                <TaskSection />
            </div>
        </main>
    );
}
