"use client";

import { useEffect, useState } from "react";

interface Task{
  id:number;
  title:string;
  description:string;
  priority:string;
  completed:boolean;
}

export default function Home(){

  const [tasks,setTasks]=useState<Task[]>([]);

  const loadTasks=async()=>{
    const r=await fetch(
      "http://localhost:5000/tasks"
    );

    const data=await r.json();

    setTasks(data);
  };

  useEffect(()=>{
    loadTasks();
  },[]);

  return(
    <main className="min-h-screen bg-zinc-100 p-8">

      <div className="mx-auto max-w-5xl">

        <h1 className="mb-8 text-4xl font-bold">
          DIDO Dashboard
        </h1>

        <div className="mb-8 grid grid-cols-3 gap-4">

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Total Tasks</h2>

            <p className="text-3xl font-bold">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Completed</h2>

            <p className="text-3xl font-bold">
              {
                tasks.filter(
                  t=>t.completed
                ).length
              }
            </p>
          </div>

          <div className="rounded-xl bg-white p-6 shadow">
            <h2>Pending</h2>

            <p className="text-3xl font-bold">
              {
                tasks.filter(
                  t=>!t.completed
                ).length
              }
            </p>
          </div>

        </div>

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-4 text-2xl font-semibold">
            Tasks
          </h2>

          <div className="space-y-4">

            {
              tasks.map(task=>(
                <div
                  key={task.id}
                  className="rounded-lg border p-4"
                >
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
                    {
                      task.completed
                        ? " Completed"
                        : " Pending"
                    }
                  </p>
                </div>
              ))
            }

          </div>

        </div>

      </div>

    </main>
  );
}