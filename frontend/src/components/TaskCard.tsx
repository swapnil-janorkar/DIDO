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
        <div className="border rounded p-4 mb-3">
            <h3 className="font-bold">
                {task.title}
            </h3>

            <p>
                {task.description}
            </p>

            <p>
                Priority: {task.priority}
            </p>

            <p>
                Status:
                {task.completed
                    ? " Completed"
                    : " Pending"}
            </p>

            {!task.completed&&(
                <button
                    className="mr-2"
                    onClick={()=>
                        onComplete(task.id)
                    }
                >
                    Complete
                </button>
            )}

            <button
                onClick={()=>
                    onDelete(task.id)
                }
            >
                Delete
            </button>
        </div>
    );
}