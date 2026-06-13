"use client";

import { useState } from "react";

interface Props{
    onCreated:()=>void;
}

export default function TaskForm({
    onCreated
}:Props){

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");

    const submit=async(
        e:React.FormEvent
    )=>{
        e.preventDefault();

        await fetch(
            "http://localhost:5000/tasks",
            {
                method:"POST",
                headers:{
                    "Content-Type":
                    "application/json"
                },
                body:JSON.stringify({
                    title,
                    description,
                    priority:"HIGH"
                })
            }
        );

        setTitle("");
        setDescription("");

        onCreated();
    };

    return(
        <form
            onSubmit={submit}
            className="mb-6 space-y-3"
        >
            <input
                className="w-full rounded border p-2"
                placeholder="Task title"
                value={title}
                onChange={e=>
                    setTitle(
                        e.target.value
                    )
                }
            />

            <textarea
                className="w-full rounded border p-2"
                placeholder="Description"
                value={description}
                onChange={e=>
                    setDescription(
                        e.target.value
                    )
                }
            />

            <button
                className="rounded bg-black px-4 py-2 text-white"
            >
                Create Task
            </button>
        </form>
    );
}