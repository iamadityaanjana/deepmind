"use client"

import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import YouTubeThumbnail from "@/components/youtube"
import BlogLink from "@/components/links"
import Toc from "@/components/Toc"

// Mock API response data based on mode
const getMockData = (query: string, mode: string) => {
  switch (mode) {
    case "summary":
      return {
        title: `Summary of "${query}"`,
        content: `This is a brief summary about ${query}. The summary provides key points and main ideas about the topic in a concise format.`,
      }
    case "explain":
      return {
        title: `Explanation of "${query}"`,
        content: `This is a detailed explanation about ${query}. The explanation breaks down the topic into understandable parts and provides examples to help clarify complex concepts.`,
      }
    case "research":
      return {
        title: `Research on "${query}"`,
        content: `This is in-depth research about ${query}. The research includes academic findings, statistics, and references to scholarly articles related to the topic.`,
      }
    default:
      return {
        title: `Information about "${query}"`,
        content: `Here is some information about ${query}.`,
      }
  }
}

export default function Results() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [data, setData] = useState<{ title: string; content: string } | null>(null)
  const [loading, setLoading] = useState(true)

  const query = searchParams.get("query") || ""
  const mode = searchParams.get("mode") || "summary"

  useEffect(() => {
    // Simulate API call with a delay
    const fetchData = async () => {
      setLoading(true)

      try {
        // Simulate network request
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Get mock data based on query and mode
        const result = getMockData(query, mode)
        setData(result)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchData()
    }
  }, [query, mode])

  return (
    <main className="min-h-screen p-8 relative">
      <button
        onClick={() => router.back()}
        className="flex items-center text-gray-400 hover:text-black mb-8 instrument-serif ml-64"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to search
      </button>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 border-t-2 border-black rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-400 instrument-serif">Loading results...</p>
        </div>
      ) : data ? (
        <div className="flex justify-between">
          {/* Table of Contents positioned on the left */}
          <div className="fixed left-8 top-24 w-64">
            <Toc />
          </div>
          
          {/* Main content in the center */}
          <div className="max-w-3xl mx-auto px-4" style={{ marginLeft: '280px' }}>
            <div className="space-y-6">
              <h1 className="text-3xl text-te md:text-4xl instrument-serif">{data.title}</h1>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-lg text-teal-50 instrument-serif leading-relaxed">{data.content}</p>
              </div>
            </div>
          </div>
          
          {/* Additional content positioned on the right */}
          <div className="fixed right-8 top-24 w-64">
            <YouTubeThumbnail videoId="jpmuovnWSDA"/>
            <BlogLink url="google.com" title="Google"/>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400 instrument-serif">No results found</p>
      )}
    </main>
  )
}

