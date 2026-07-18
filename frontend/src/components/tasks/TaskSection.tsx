"use client";

import { useEffect, useState } from "react";
import TaskForm from "@/src/components/TaskForm";
import TaskCard from "@/src/components/TaskCard";
import TaskFilters from "./TaskFilters";
import TaskEditModal from "./TaskEditModal";
import { Task } from "@/src/types/task";
import * as taskApi from "@/src/services/taskApi";

export default function TaskSection() {
    const [tasks, setTasks] = useState<Task[]>([]);

    // Filter state
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [priorityFilter, setPriorityFilter] = useState("ALL");

    // Sort state
    const [sortBy, setSortBy] = useState("CREATED");

    // Edit state
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [editForm, setEditForm] = useState({
        title: "",
        description: "",
        priority: "",
        due_date: "",
        category: "",
        estimated_duration: 0,
    });

    const loadTasks = async () => {
        const data = await taskApi.getTasks();
        setTasks(Array.isArray(data) ? data : []);
    };

    const completeTask = async (id: number) => {
        await taskApi.completeTask(id);
        loadTasks();
    };

    const deleteTask = async (id: number) => {
        await taskApi.deleteTask(id);
        loadTasks();
    };

    const openEdit = (task: Task) => {
        setEditingTask(task);
        setEditForm({
            title: task.title,
            description: task.description,
            priority: task.priority,
            due_date: task.due_date?.split("T")[0] ?? "",
            category: task.category ?? "",
            estimated_duration: task.estimated_duration ?? 0,
        });
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingTask) return;
        await taskApi.updateTask(editingTask.id, editForm);
        setEditingTask(null);
        loadTasks();
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // Filter + sort
    const filteredTasks = tasks.filter(task => {
        if (statusFilter === "COMPLETED" && !task.completed) return false;
        if (statusFilter === "PENDING" && task.completed) return false;
        if (priorityFilter !== "ALL" && task.priority !== priorityFilter) return false;
        return true;
    });

    const sortedTasks = [...filteredTasks];

    if (sortBy === "PRIORITY") {
        const order = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
        sortedTasks.sort(
            (a, b) =>
                order[b.priority as keyof typeof order] -
                order[a.priority as keyof typeof order]
        );
    } else if (sortBy === "DUE_DATE") {
        sortedTasks.sort(
            (a, b) =>
                new Date(a.due_date ?? "9999-12-31").getTime() -
                new Date(b.due_date ?? "9999-12-31").getTime()
        );
    } else {
        sortedTasks.sort((a, b) => b.id - a.id);
    }

    return (
        <>
            <TaskForm onCreated={loadTasks} />

            <TaskFilters
                statusFilter={statusFilter}
                priorityFilter={priorityFilter}
                sortBy={sortBy}
                setStatusFilter={setStatusFilter}
                setPriorityFilter={setPriorityFilter}
                setSortBy={setSortBy}
            />

            <div className="rounded-xl bg-white p-6 shadow">
                <h2 className="mb-4 text-2xl font-semibold">Tasks</h2>

                <div className="space-y-4">
                    {sortedTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onComplete={completeTask}
                            onDelete={deleteTask}
                            onEdit={openEdit}
                        />
                    ))}
                </div>
            </div>

            <TaskEditModal
                editingTask={editingTask}
                editForm={editForm}
                setEditingTask={setEditingTask}
                setEditForm={setEditForm}
                handleEditSubmit={handleEditSubmit}
            />
        </>
    );
}
