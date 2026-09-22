"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export default function HomePage() {
  const router = useRouter();
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Good morning");
  const [userEmail, setUserEmail] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      setGreeting("Good morning");
    } else if (hour >= 12 && hour < 17) {
      setGreeting("Good afternoon");
    } else if (hour >= 17 && hour < 21) {
      setGreeting("Good evening");
    } else {
      setGreeting("Good night");
    }

    const user = localStorage.getItem("user");

    if (user) {
      const userData = JSON.parse(user);
      setUserEmail(userData.email);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
    }
  }, [router]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await api.get("/news");

        console.log("News response:", response.data);

        setNews(response.data.news);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await api.get("/preferences");

        console.log("Preferences:", response.data);

        setSelectedVoice(response.data.voice || "");
      } catch (error) {
        console.error("Failed to fetch preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const playNews = (story: (typeof news)[number]) => {
    if (typeof window === "undefined") return;

    window.speechSynthesis.cancel();

    const text = `${story.title}. ${story.description}`;

    const speech = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const matchingVoice = voices.find((voice) =>
      voice.name.toLowerCase().includes(selectedVoice.toLowerCase()),
    );
    if (matchingVoice) {
      speech.voice = matchingVoice;
    }

    speech.rate = 0.9;
    speech.pitch = 1;

    speech.onend = () => {
      setPlayingId(null);
    };

    window.speechSynthesis.speak(speech);

    setPlayingId(story._id);
  };

  const stopNews = () => {
    window.speechSynthesis.cancel();
    setPlayingId(null);
  };

  const handleLogout = () => {
    window.speechSynthesis.cancel();

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <main className="min-h-screen bg-black text-white px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <p className="text-purple-400 text-sm mb-2">Nuzio AI</p>

            <h1 className="text-3xl md:text-4xl font-bold">
              {greeting}, Janak
            </h1>

            <p className="text-gray-400 mt-2">
              Here are your personalized news stories.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="border border-zinc-700 hover:bg-zinc-800 px-4 py-2 rounded-xl text-sm transition"
          >
            Logout
          </button>
        </div>

        {/* News Count */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-semibold">Your Briefing</h2>

          <span className="text-sm text-gray-500">{news.length} stories</span>
        </div>

        {/* News Cards */}
        <div className="space-y-4">
          {loading ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
              <p className="text-gray-400">Loading your personalized news...</p>
            </div>
          ) : news.length === 0 ? (
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
              <p className="text-gray-400">
                No personalized news available right now.
              </p>

              <p className="text-gray-500 text-sm mt-2">
                Try updating your interests.
              </p>
            </div>
          ) : (
            news.map((story) => {
              const isPlaying = playingId === story._id;

              return (
                <article
                  key={story._id}
                  className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
                >
                  {/* Category */}
                  <span className="text-purple-400 text-sm">
                    {story.category}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-semibold mt-2">{story.title}</h3>

                  {/* Description */}
                  <p className="text-gray-400 mt-3 leading-6">
                    {story.description}
                  </p>

                  {/* Controls */}
                  <div className="mt-5 flex items-center gap-3">
                    {!isPlaying ? (
                      <button
                        onClick={() => playNews(story)}
                        className="bg-purple-600 hover:bg-purple-700 px-5 py-2.5 rounded-xl font-medium transition"
                      >
                        ▶ Play
                      </button>
                    ) : (
                      <button
                        onClick={stopNews}
                        className="bg-red-600 hover:bg-red-700 px-5 py-2.5 rounded-xl font-medium transition"
                      >
                        ■ Stop
                      </button>
                    )}

                    {isPlaying && (
                      <span className="text-sm text-gray-400">Playing...</span>
                    )}
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
