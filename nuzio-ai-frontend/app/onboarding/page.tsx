"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
const interests = [
  "Technology",
  "AI",
  "Business",
  "Sports",
  "Science",
  "Entertainment",
  "World News",
  "Finance",
];
const languages = ["English", "Hindi", "Gujarati"];

const professions = [
  "Developer",
  "Student",
  "Business",
  "Teacher",
  "Designer",
  "Other",
];

export default function OnboardingPage() {
   const router = useRouter();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [selectedProfession, setSelectedProfession] = useState("");

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((item) => item !== interest),
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleContinue = async () => {
    if (selectedInterests.length === 0) {
      alert("Please select at least one interest");
      return;
    }
    if (!selectedProfession) {
      alert("Please select your profession");
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
          language: selectedLanguage,
          profession: selectedProfession,
          interests: selectedInterests,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(response.data);

      alert("Preferences saved successfully!");
      router.push("/voice");
    } catch (error: any) {
      console.error("Preferences error:", error);

      const message =
        error.response?.data?.message || "Failed to save preferences";

      alert(message);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-purple-400 text-sm mb-3">Nuzio AI</p>

          <h1 className="text-3xl md:text-4xl font-bold">
            What interests you?
          </h1>

          <p className="text-gray-400 mt-3">
            Choose topics you want to hear about in your personalized news.
          </p>
        </div>

        {/* Language */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Choose your language</h2>

          <div className="grid grid-cols-3 gap-3">
            {languages.map((language) => (
              <button
                key={language}
                type="button"
                onClick={() => setSelectedLanguage(language)}
                className={`p-3 rounded-xl border transition ${
                  selectedLanguage === language
                    ? "border-purple-500 bg-purple-600/20 text-white"
                    : "border-zinc-800 bg-zinc-900 text-gray-300 hover:border-zinc-600"
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>

        {/* Profession */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">What do you do?</h2>

          <div className="grid grid-cols-2 gap-3">
            {professions.map((profession) => (
              <button
                key={profession}
                type="button"
                onClick={() => setSelectedProfession(profession)}
                className={`p-3 rounded-xl border transition ${
                  selectedProfession === profession
                    ? "border-purple-500 bg-purple-600/20 text-white"
                    : "border-zinc-800 bg-zinc-900 text-gray-300 hover:border-zinc-600"
                }`}
              >
                {profession}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="grid grid-cols-2 gap-3">
          {interests.map((interest) => {
            const isSelected = selectedInterests.includes(interest);

            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`p-4 rounded-xl border text-left transition ${
                  isSelected
                    ? "border-purple-500 bg-purple-600/20 text-white"
                    : "border-zinc-800 bg-zinc-900 text-gray-300 hover:border-zinc-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{interest}</span>

                  {isSelected && <span className="text-purple-400">✓</span>}
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Count */}
        <p className="text-gray-500 text-sm mt-5 text-center">
          {selectedInterests.length} topic
          {selectedInterests.length !== 1 ? "s" : ""} selected
        </p>

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
