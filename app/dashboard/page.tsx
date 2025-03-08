"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export default function Home() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [mode, setMode] = useState("summary")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return
    // Navigate to results page with query and mode as parameters
    router.push(`/results?query=${encodeURIComponent(query)}&mode=${mode}`)
  }

  return (
    <main className="flex min-h-screen bg-gray-800 flex-col items-center justify-between p-8">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl text-teal-50 text-center mb-12 instrument-serif">What Do You Want to Learn Today?</h1>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative w-full">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter any topic you wish to explore today."
              className="w-full p-4 pr-12 rounded-full bg-gray-200/10 border border-gray-700 text-white instrument-serif focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2" aria-label="Search">
              <Search className="h-6 w-6 text-gray-400" />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={() => setMode("summary")}
              className={`px-4 py-2 rounded-full text-sm instrument-serif ${
                mode === "summary" ? "bg-white text-gray-900" : "bg-gray-700 text-white"
              }`}
            >
              Summary
            </button>
            <button
              type="button"
              onClick={() => setMode("explain")}
              className={`px-4 py-2 rounded-full text-sm instrument-serif ${
                mode === "explain" ? "bg-white text-gray-900" : "bg-gray-700 text-white"
              }`}
            >
              Explain
            </button>
            <button
              type="button"
              onClick={() => setMode("research")}
              className={`px-4 py-2 rounded-full text-sm instrument-serif ${
                mode === "research" ? "bg-white text-gray-900" : "bg-gray-700 text-white"
              }`}
            >
              Research
            </button>
          </div>
        </form>
      </div>

      <footer className="mt-auto py-4 text-center text-sm text-gray-400 instrument-serif">DeepMind AI © 2025</footer>
    </main>
  )
}

