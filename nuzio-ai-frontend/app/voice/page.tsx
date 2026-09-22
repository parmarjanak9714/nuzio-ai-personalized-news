"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const voices = [
  {
    id: "alia",
    name: "Alia",
    description: "Warm and friendly",
  },
  {
    id: "kai",
    name: "Kai",
    description: "Clear and energetic",
  },
  {
    id: "mona",
    name: "Mona",
    description: "Calm and professional",
  },
];

export default function VoicePage() {
  const [selectedVoice, setSelectedVoice] = useState("");
  const router = useRouter();

 const handleContinue = async () => {
  if (!selectedVoice) {
    alert("Please select a narrator voice");
    return;
  }

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Please login first");
    return;
  }

  try {
    const response = await api.post(
      "/preferences",
      {
        voice: selectedVoice,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    alert("Voice saved successfully!");

    router.push("/home");
  } catch (error: any) {
    console.error("Voice save error:", error);

    const message =
      error.response?.data?.message ||
      "Failed to save voice";

    alert(message);
  }
};

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-lg">

        {/* Header */}
        <div className="text-center mb-8">

          <p className="text-purple-400 text-sm mb-3">
            Nuzio AI
          </p>

          <h1 className="text-3xl md:text-4xl font-bold">
            Choose your narrator
          </h1>

          <p className="text-gray-400 mt-3">
            Select a voice for your personalized news briefing.
          </p>

        </div>

        {/* Voice Options */}
        <div className="space-y-3">

          {voices.map((voice) => {

            const isSelected = selectedVoice === voice.id;

            return (
              <button
                key={voice.id}
                type="button"
                onClick={() => setSelectedVoice(voice.id)}
                className={`w-full p-4 rounded-xl border text-left transition ${
                  isSelected
                    ? "border-purple-500 bg-purple-600/20"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
                }`}
              >

                <div className="flex items-center justify-between">

                  <div>
                    <h2 className="font-semibold">
                      {voice.name}
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      {voice.description}
                    </p>
                  </div>

                  {isSelected && (
                    <span className="text-purple-400 text-xl">
                      ✓
                    </span>
                  )}

                </div>

              </button>
            );
          })}

        </div>

        {/* Continue */}
        <button
          type="button"
          onClick={handleContinue}
          className="w-full mt-6 bg-purple-600 hover:bg-purple-700 py-3 rounded-xl font-semibold transition"
        >
          Continue
        </button>

      </div>

    </main>
  );
}