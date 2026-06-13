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