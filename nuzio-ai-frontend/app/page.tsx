"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">

      <div className="w-full max-w-xl text-center">

        {/* Logo / Brand */}
        <p className="text-purple-400 text-lg font-semibold mb-4">
          Nuzio AI
        </p>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Personalized News,
          <br />
          Your Way.
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg mt-6 max-w-lg mx-auto">
          Get a personalized news briefing based on
          your interests, profession, language and voice.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">

          <button
            onClick={() => router.push("/register")}
            className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-xl font-semibold transition"
          >
            Get Started
          </button>

          <button
            onClick={() => router.push("/login")}
            className="border border-zinc-700 hover:bg-zinc-900 px-8 py-3 rounded-xl font-semibold transition"
          >
            Login
          </button>

        </div>

        {/* Small text */}
        <p className="text-gray-600 text-sm mt-8">
          Your news. Your interests. Your voice.
        </p>

      </div>

    </main>
  );
}