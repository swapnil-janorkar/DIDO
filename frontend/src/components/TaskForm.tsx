"use client";

import { useState } from "react";
import { createTask } from "../services/taskApi";

interface Props{
    onCreated:()=>void;
}

export default function TaskForm({
    onCreated
}:Props){

    const [title,setTitle]=useState("");
    const [description,setDescription]=useState("");
    const [priority,setPriority]=useState("MEDIUM");
    const [category,setCategory]=useState("");
    const [dueDate,setDueDate]=useState("");
    const [estimatedDuration,setEstimatedDuration]=useState("");

    const submit=async(
        e:React.FormEvent
    )=>{
        e.preventDefault();

        await createTask({
            title,
            description,
            priority,
            category:category||undefined,
            due_date:dueDate||undefined,
            estimated_duration:estimatedDuration
                ? Number(estimatedDuration)
                : undefined
        });

        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
        setCategory("");
        setDueDate("");
        setEstimatedDuration("");

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
                onChange={e=>setTitle(e.target.value)}
                required
            />

            <textarea
                className="w-full rounded border p-2"
                placeholder="Description"
                value={description}
                onChange={e=>setDescription(e.target.value)}
            />

            <select
                className="w-full rounded border p-2"
                value={priority}
                onChange={e=>setPriority(e.target.value)}
            >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
                <option value="CRITICAL">Critical</option>
            </select>

            <input
                className="w-full rounded border p-2"
                placeholder="Category (e.g. DevOps)"
                value={category}
                onChange={e=>setCategory(e.target.value)}
            />

            <input
                className="w-full rounded border p-2"
                type="date"
                placeholder="Due date"
                value={dueDate}
                onChange={e=>setDueDate(e.target.value)}
            />

            <input
                className="w-full rounded border p-2"
                type="number"
                placeholder="Estimated duration (minutes)"
                value={estimatedDuration}
                min="1"
                onChange={e=>setEstimatedDuration(e.target.value)}
            />

            <button
                className="rounded bg-black px-4 py-2 text-white"
            >
                Create Task
            </button>
        </form>
    );
}