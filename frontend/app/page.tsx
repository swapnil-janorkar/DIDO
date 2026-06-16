"use client";

import { useEffect, useState } from "react";
import TaskForm from "../src/components/TaskForm";
import TaskCard from "../src/components/TaskCard";
import { Task } from "../src/types/task";
import * as taskApi from "../src/services/taskApi";

export default function Home(){

  const [tasks,setTasks]=useState<Task[]>([]);
  const [token,setToken]=useState<string>("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [loginError,setLoginError]=useState("");
  const [analytics,setAnalytics]=useState({
    score:0,
    totalTasks:0,
    completedTasks:0,
    pendingTasks:0,
    completedPoints:0,
    totalPoints:0
  });

  const loadTasks=async()=>{

    const data=
      await taskApi.getTasks();

    setTasks(
      Array.isArray(data)
        ? data
        : []
    );

    await loadAnalytics();
  };

  const loadAnalytics=async()=>{
    const data=
      await taskApi.getAnalytics();

    setAnalytics(data);
  };

  const handleLogin=async(
    e:React.FormEvent
  )=>{
    e.preventDefault();
    setLoginError("");
    const data=await taskApi.login(email,password);
    if(data.token){
      setToken(data.token);
      loadTasks();
    } else {
      setLoginError(
        data.message ?? "Login failed"
      );
    }
  };

  const completeTask=async(id:number)=>{
    await taskApi.completeTask(id);
    loadTasks();
  };

  const deleteTask=async(id:number)=>{
    await taskApi.deleteTask(id);
    loadTasks();
  };

  useEffect(()=>{
    const saved=localStorage.getItem("token");
    if(saved){
      setToken(saved);
      loadTasks();
    }
  },[]);

  if(!token){
    return(
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
              onChange={e=>setEmail(e.target.value)}
            />

            <input
              className="w-full rounded border p-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e=>setPassword(e.target.value)}
            />

            {loginError && (
              <p className="text-sm text-red-500">
                {loginError}
              </p>
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

  return(
    <main className="min-h-screen bg-zinc-100 p-8">

      <div className="mx-auto max-w-5xl">

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold">
            DIDO Dashboard
          </h1>

          <button
            className="rounded bg-zinc-800 px-4 py-2 text-sm text-white"
            onClick={()=>{
              localStorage.removeItem("token");
              setToken("");
              setTasks([]);
            }}
          >
            Logout
          </button>
        </div>

        <div className="mb-8 grid grid-cols-4 gap-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Productivity</h2>
            <p className="text-3xl font-bold">
              {analytics.score}%
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Total Tasks</h2>
            <p className="text-3xl font-bold">
              {analytics.totalTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Completed</h2>
            <p className="text-3xl font-bold">
              {analytics.completedTasks}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Pending</h2>
            <p className="text-3xl font-bold">
              {analytics.pendingTasks}
            </p>
          </div>

        </div>

        <TaskForm
          onCreated={loadTasks}
        />

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-2xl font-semibold">
            Tasks
          </h2>

          <div className="space-y-4">

            {
              tasks.map(task=>(
                <TaskCard
                  key={task.id}
                  task={task}
                  onComplete={completeTask}
                  onDelete={deleteTask}
                />
              ))
            }

          </div>

        </div>

      </div>

    </main>
  );
}