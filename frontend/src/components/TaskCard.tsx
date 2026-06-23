"use client";

import { Task } from "../types/task";

interface Props{
    task:Task;
    onComplete:(id:number)=>void;
    onDelete:(id:number)=>void;
}

export default function TaskCard({
    task,
    onComplete,
    onDelete
}:Props){

    return(
        <div className="rounded-lg border p-4">
            <h3 className="font-bold">
                {task.title}
            </h3>

            <p>{task.description}</p>

            <p>
                Priority: {task.priority}
            </p>

            <p>
                Status:
                {task.completed
                    ? " Completed"
                    : " Pending"}
            </p>

            {task.category && (
                <p>
                    Category: {task.category}
                </p>
            )}

            {task.due_date && (
                <p>
                    Due: {new Date(task.due_date).toLocaleDateString()}
                </p>
            )}

            {task.estimated_duration != null && (
                <p>
                    Est. Duration: {task.estimated_duration} min
                </p>
            )}

            <div className="mt-3 flex gap-2">

                {!task.completed && (
                    <button
                        className="rounded bg-green-600 px-3 py-1 text-white"
                        onClick={()=>
                            onComplete(task.id)
                        }
                    >
                        Complete
                    </button>
                )}

                <button
                    className="rounded bg-red-600 px-3 py-1 text-white"
                    onClick={()=>
                        onDelete(task.id)
                    }
                >
                    Delete
                </button>

            </div>
        </div>
    );
}