"use client";

import { useEffect, useState } from "react";
import TaskForm from "../src/components/TaskForm";
import TaskCard from "../src/components/TaskCard";
import { Task } from "../src/types/task";
import * as taskApi from "../src/services/taskApi";

export default function Home() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [token, setToken] = useState<string>("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Productivity analytics
  const [analytics, setAnalytics] = useState({
    score: 0,
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    completedPoints: 0,
    totalPoints: 0
  });

  // Weekly analytics
  const [weekly, setWeekly] = useState({
    tasksCreated: 0,
    completedTasks: 0,
    completionRate: 0,
    totalEstimatedDuration: 0
  });

  // Edit state
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    priority: "",
    due_date: "",
    category: "",
    estimated_duration: 0
  });

  const loadTasks = async () => {
    const data = await taskApi.getTasks();
    setTasks(Array.isArray(data) ? data : []);
    await loadAnalytics();
    await loadWeeklyAnalytics();
  };

  const loadAnalytics = async () => {
    const data = await taskApi.getAnalytics();
    setAnalytics(data);
  };

  const loadWeeklyAnalytics = async () => {
    const data = await taskApi.getWeeklyAnalytics();
    setWeekly(data);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const data = await taskApi.login(email, password);
    if (data.token) {
      setToken(data.token);
      loadTasks();
    } else {
      setLoginError(data.message ?? "Login failed");
    }
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
      estimated_duration: task.estimated_duration ?? 0
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
    const saved = localStorage.getItem("token");
    if (saved) {
      setToken(saved);
      loadTasks();
    }
  }, []);

  if (!token) {
    return (
      <main className="min-h-screen bg-zinc-100 flex items-center justify-center p-8">
        <div className="w-full max-w-sm rounded-xl bg-white p-8 shadow">

          <h1 className="mb-6 text-2xl font-bold">
            DIDO — Login
          </h1>

          <form onSubmit={handleLogin} className="space-y-4">

            <input
              className="w-full rounded border p-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <input
              className="w-full rounded border p-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />

            {loginError && (
              <p className="text-sm text-red-500">{loginError}</p>
            )}

            <button
              className="w-full rounded bg-black px-4 py-2 text-white"
              type="submit"
            >
              Login
            </button>

          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-100 p-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">DIDO Dashboard</h1>

          <button
            className="rounded bg-zinc-800 px-4 py-2 text-sm text-white"
            onClick={() => {
              localStorage.removeItem("token");
              setToken("");
              setTasks([]);
            }}
          >
            Logout
          </button>
        </div>

        {/* Productivity Analytics */}
        <h2 className="mb-3 text-lg font-semibold text-zinc-600">Productivity</h2>
        <div className="mb-6 grid grid-cols-4 gap-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm text-zinc-500">Score</h3>
            <p className="text-3xl font-bold">{analytics.score}%</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm text-zinc-500">Total Tasks</h3>
            <p className="text-3xl font-bold">{analytics.totalTasks}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm text-zinc-500">Completed</h3>
            <p className="text-3xl font-bold">{analytics.completedTasks}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm text-zinc-500">Pending</h3>
            <p className="text-3xl font-bold">{analytics.pendingTasks}</p>
          </div>

        </div>

        {/* Weekly Analytics */}
        <h2 className="mb-3 text-lg font-semibold text-zinc-600">This Week</h2>
        <div className="mb-8 grid grid-cols-4 gap-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm text-zinc-500">Tasks Created</h3>
            <p className="text-3xl font-bold">{weekly.tasksCreated}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm text-zinc-500">Completed</h3>
            <p className="text-3xl font-bold">{weekly.completedTasks}</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm text-zinc-500">Completion Rate</h3>
            <p className="text-3xl font-bold">{weekly.completionRate}%</p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h3 className="text-sm text-zinc-500">Est. Duration</h3>
            <p className="text-3xl font-bold">{weekly.totalEstimatedDuration}<span className="text-base font-normal"> min</span></p>
          </div>

        </div>

        {/* Task Form */}
        <TaskForm onCreated={loadTasks} />

        {/* Task List */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">Tasks</h2>

          <div className="space-y-4">
            {tasks.map(task => (
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

      </div>

      {/* Edit Modal */}
      {editingTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

            <h2 className="mb-6 text-xl font-bold">Edit Task</h2>

            <form onSubmit={handleEditSubmit} className="space-y-4">

              <input
                className="w-full rounded border p-2"
                placeholder="Title"
                value={editForm.title}
                onChange={e => setEditForm({ ...editForm, title: e.target.value })}
                required
              />

              <textarea
                className="w-full rounded border p-2"
                placeholder="Description"
                value={editForm.description}
                onChange={e => setEditForm({ ...editForm, description: e.target.value })}
                rows={3}
              />

              <select
                className="w-full rounded border p-2"
                value={editForm.priority}
                onChange={e => setEditForm({ ...editForm, priority: e.target.value })}
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>

              <input
                className="w-full rounded border p-2"
                type="date"
                value={editForm.due_date}
                onChange={e => setEditForm({ ...editForm, due_date: e.target.value })}
              />

              <input
                className="w-full rounded border p-2"
                placeholder="Category"
                value={editForm.category}
                onChange={e => setEditForm({ ...editForm, category: e.target.value })}
              />

              <input
                className="w-full rounded border p-2"
                type="number"
                placeholder="Duration (min)"
                value={editForm.estimated_duration}
                onChange={e => setEditForm({ ...editForm, estimated_duration: Number(e.target.value) })}
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  type="button"
                  className="flex-1 rounded bg-zinc-200 px-4 py-2 hover:bg-zinc-300"
                  onClick={() => setEditingTask(null)}
                >
                  Cancel
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </main>
  );
}