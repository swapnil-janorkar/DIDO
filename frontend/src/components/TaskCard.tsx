"use client";

import { Task } from "../types/task";

interface Props {
    task: Task;
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (task: Task) => void;
}

export default function TaskCard({
    task,
    onComplete,
    onDelete,
    onEdit
}: Props) {

    return (
        <div className="rounded-lg border p-4">
            <h3 className="font-bold text-lg mb-2">
                {task.title}
            </h3>

            {task.description && (
                <p className="text-sm text-gray-600 mb-3">
                    {task.description}
                </p>
            )}

            <div className="space-y-1 text-sm">
                <p>
                    <span className="font-medium">Priority:</span> {task.priority}
                </p>

                {task.category && (
                    <p>
                        <span className="font-medium">Category:</span> {task.category}
                    </p>
                )}

                {task.due_date && (
                    <p>
                        <span className="font-medium">Due Date:</span>{" "}
                        {new Date(task.due_date).toLocaleDateString()}
                    </p>
                )}

                {task.estimated_duration != null && (
                    <p>
                        <span className="font-medium">Duration:</span>{" "}
                        {task.estimated_duration} min
                    </p>
                )}

                <p>
                    <span className="font-medium">Status:</span>{" "}
                    {task.completed ? "✅ Completed" : "⏳ Pending"}
                </p>
            </div>

            <div className="mt-4 flex gap-2">

                {!task.completed && (
                    <button
                        className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700"
                        onClick={() => onComplete(task.id)}
                    >
                        Complete
                    </button>
                )}

                <button
                    className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                    onClick={() => onEdit(task)}
                >
                    Edit
                </button>

                <button
                    className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                    onClick={() => onDelete(task.id)}
                >
                    Delete
                </button>

            </div>
        </div>
    );
}