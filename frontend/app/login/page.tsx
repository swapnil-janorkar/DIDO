"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import * as taskApi from "../../src/services/taskApi";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    const data = await taskApi.login(email, password);
    if (data.token) {
      router.push("/dashboard");
    } else {
      setLoginError(data.message ?? "Login failed");
    }
  };

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
