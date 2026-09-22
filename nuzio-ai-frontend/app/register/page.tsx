"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleRegister = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await api.post("/auth/register", {
        email,
        password,
      });

      console.log(response.data);

      alert("Registration successful!");

      router.push("/login");
    } catch (error: any) {
      console.error("Registration error:", error);

      const message =
        error.response?.data?.message ||
        "Registration failed";

      alert(message);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">

          <p className="text-purple-400 text-sm mb-3">
            Nuzio AI
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Create your account
          </h1>

          <p className="text-gray-400 mt-3">
            Start your personalized news journey.
          </p>

        </div>

        {/* Register Form */}
        <form
          onSubmit={handleRegister}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-5"
        >

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm text-gray-300 mb-2">
              Confirm Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-purple-500"
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition"
          >
            Create Account
          </button>

        </form>

        {/* Login */}
        <p className="text-center text-gray-400 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/login")}
            className="text-purple-400 hover:text-purple-300"
          >
            Login
          </button>
        </p>

      </div>

    </main>
  );
}