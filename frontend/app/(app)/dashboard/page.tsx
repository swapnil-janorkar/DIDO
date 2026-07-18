"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import TaskForm from "@/src/components/TaskForm";
import TaskCard from "@/src/components/TaskCard";
import TaskFilters from "@/src/components/tasks/TaskFilters";
import TaskEditModal from "@/src/components/tasks/TaskEditModal";
import { Task } from "@/src/types/task";
import { Achievement } from "@/src/types/achievement";
import * as taskApi from "@/src/services/taskApi";

const TaskStatusChart = dynamic(
  () => import("@/src/components/TaskStatusChart"),
  { ssr: false }
);

const PriorityChart = dynamic(
  () => import("@/src/components/PriorityChart"),
  { ssr: false }
);

export default function DashboardPage() {


  const [token, setToken] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

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
  const [weeklyAnalytics, setWeeklyAnalytics] = useState({
    tasksCreated: 0,
    completedTasks: 0,
    completionRate: 0,
    totalEstimatedDuration: 0
  });

  // Filter state
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [priorityFilter, setPriorityFilter] = useState("ALL");

  // Sort state
  const [sortBy, setSortBy] = useState("CREATED");

  // Achievements state
  const [achievements, setAchievements] = useState<Achievement[]>([]);

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
    await loadAchievements();
  };

  const loadAnalytics = async () => {
    const data = await taskApi.getAnalytics();
    setAnalytics(data);
  };

  const loadWeeklyAnalytics = async () => {
    const data = await taskApi.getWeeklyAnalytics();
    setWeeklyAnalytics(data);
  };

  const loadAchievements = async () => {
    const data = await taskApi.getAchievements();
    setAchievements(Array.isArray(data) ? data : []);
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

  return (
    <main className="min-h-screen bg-zinc-100 p-8">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold">DIDO Dashboard</h1>
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
            <h2>Created This Week</h2>
            <p className="text-3xl font-bold">
              {weeklyAnalytics.tasksCreated}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Completed This Week</h2>
            <p className="text-3xl font-bold">
              {weeklyAnalytics.completedTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Completion Rate</h2>
            <p className="text-3xl font-bold">
              {weeklyAnalytics.completionRate}%
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Estimated Time</h2>
            <p className="text-3xl font-bold">
              {weeklyAnalytics.totalEstimatedDuration} min
            </p>
          </div>

        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-2 gap-6">
          <TaskStatusChart
            completed={analytics.completedTasks}
            pending={analytics.pendingTasks}
          />

          <PriorityChart tasks={tasks} />
        </div>

        {/* Achievements */}
        <div className="mb-8 rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">🏅 Achievements</h2>

          <div className="space-y-3">
            {achievements.length === 0 ? (
              <p className="text-sm text-zinc-500">No achievements unlocked yet.</p>
            ) : (
              achievements.map(achievement => (
                <div
                  key={achievement.name}
                  className="flex items-start gap-4 rounded-lg border p-3"
                >
                  <div className="text-3xl">{achievement.badge}</div>
                  <div>
                    <div className="font-semibold">{achievement.name}</div>
                    <div className="text-sm text-gray-500">{achievement.description}</div>
                    <div className="mt-1 text-xs text-zinc-400">
                      Unlocked {new Date(achievement.unlocked_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Task Form */}
        <TaskForm onCreated={loadTasks} />

        {/* Task List */}
        <div className="rounded-xl bg-white p-6 shadow">
          <h2 className="mb-4 text-2xl font-semibold">Tasks</h2>

          {/* Filter Controls */}
          <TaskFilters
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            sortBy={sortBy}
            setStatusFilter={setStatusFilter}
            setPriorityFilter={setPriorityFilter}
            setSortBy={setSortBy}
          />

          <div className="space-y-4">
            {(() => {
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

              return sortedTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={completeTask}
                  onDelete={deleteTask}
                  onEdit={openEdit}
                />
              ));
            })()}
          </div>
        </div>

      </div>

      {/* Edit Modal */}
      <TaskEditModal
        editingTask={editingTask}
        editForm={editForm}
        setEditingTask={setEditingTask}
        setEditForm={setEditForm}
        handleEditSubmit={handleEditSubmit}
      />

    </main>
  );
}
