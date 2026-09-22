"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Check user's saved preferences
      try {
        const preferencesResponse = await api.get("/preferences", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const preferences = preferencesResponse.data;

        const hasInterests =
          Array.isArray(preferences.interests) &&
          preferences.interests.length > 0;

        const hasProfession =
          preferences.profession && preferences.profession.trim() !== "";

        const hasVoice = preferences.voice && preferences.voice.trim() !== "";

        if (hasInterests && hasProfession && hasVoice) {
          router.push("/home");
        } else {
          router.push("/onboarding");
        }
      } catch (preferenceError) {
        console.error("Preference check error:", preferenceError);

        router.push("/onboarding");
      }
    } catch (error: any) {
      console.error("Login error:", error);

      const message = error.response?.data?.message || "Login failed";

      alert(message);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo / App Name */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Nuzio AI</h1>

          <p className="text-gray-400 mt-3">
            Your personalized news, made for you.
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <h2 className="text-2xl font-semibold">Welcome back</h2>

          <p className="text-gray-400 mt-2 mb-6">
            Sign in to continue to your personalized news.
          </p>

          {/* Login Form */}
          <form onSubmit={handleLogin}>
            {/* Email */}
            <label className="block text-sm mb-2">Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 mb-4 outline-none focus:border-purple-500"
            />

            {/* Password */}
            <label className="block text-sm mb-2">Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 mb-5 outline-none focus:border-purple-500"
            />

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="h-px bg-zinc-700 flex-1"></div>

            <span className="text-sm text-gray-500">OR</span>

            <div className="h-px bg-zinc-700 flex-1"></div>
          </div>
          
          <p className="text-center text-gray-400 mt-6">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="text-purple-400 hover:text-purple-300"
            >
              Create an account
            </button>
          </p>
        </div>
      </div>
    </main>
  );
}
