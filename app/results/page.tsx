'use client'

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TableOfContents } from '@/components/Toc';
import { MainContent } from '@/components/main-content';
import { Resources } from '@/components/resources';
import { TableOfContent, Resource, Content } from '../types';
import { Menu, BookOpen, Bookmark } from 'lucide-react';

// Dummy data - replace with actual API calls
const dummyToc: TableOfContent[] = [
  { id: 1, title: "Introduction to AI" },
  { id: 2, title: "Machine Learning Basics" },
  { id: 3, title: "Neural Networks" },
  { id: 4, title: "Deep Learning" },
];

const dummyResources: Resource[] = [
  {
    id: 1,
    title: "AI Fundamentals",
    type: "youtube",
    url: "https://youtube.com/watch?v=example1",
  },
  {
    id: 2,
    title: "Getting Started with ML",
    type: "blog",
    url: "https://example.com/blog/ml-basics",
  },
];

const dummyContent: Content[] = [
  {
    id: 1,
    content: `# Introduction to AI

Artificial Intelligence (AI) is transforming our world. Let's explore the basics.

\`\`\`python
# Simple AI example
def greet(name):
    return f"Hello {name}, welcome to AI!"
\`\`\`

## Key Concepts
1. Machine Learning
2. Neural Networks
3. Deep Learning`,
  },
  {
    id: 2,
    content: `# Machine Learning Basics

Machine Learning is a subset of AI that focuses on data and algorithms.

\`\`\`python
import sklearn
# ML code example
\`\`\``,
  },
];

function App() {
  const [searchParams] = useSearchParams();
  const [selectedId, setSelectedId] = useState(1);
  const [content, setContent] = useState<Content | null>(null);
  const [showToc, setShowToc] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [cachedContent, setCachedContent] = useState<Record<number, Content>>({});
  const [isLoading, setIsLoading] = useState(false);

  // Load cached content from localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem('cachedContent');
    if (cached) {
      setCachedContent(JSON.parse(cached));
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get('query');
    const mode = searchParams.get('mode');

    const fetchContent = async (id: number) => {
      // Check if content is already cached
      if (cachedContent[id]) {
        setContent(cachedContent[id]);
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // For demo, we're using dummy data
        // In production, replace with actual API call
        const selectedContent = dummyContent.find((c) => c.id === id);
        
        if (selectedContent) {
          // Cache the new content
          const newCache = { ...cachedContent, [id]: selectedContent };
          setCachedContent(newCache);
          localStorage.setItem('cachedContent', JSON.stringify(newCache));
          setContent(selectedContent);
        }
      } catch (error) {
        console.error('Error fetching content:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query && mode) {
      // Here you would typically make an API call to your LLM
      console.log(`Query: ${query}, Mode: ${mode}`);
    }

    fetchContent(selectedId);
  }, [searchParams, selectedId, cachedContent]);

  const handleTopicSelect = (id: number) => {
    setSelectedId(id);
    setShowToc(false); // Close mobile menu after selection
  };

  const toggleToc = () => {
    setShowToc(!showToc);
    if (!showToc) setShowResources(false);
  };

  const toggleResources = () => {
    setShowResources(!showResources);
    if (!showResources) setShowToc(false);
  };

  const currentTopic = dummyToc.find(item => item.id === selectedId);

  return (
    <div className="min-h-screen bg-white relative">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b">
        <button
          onClick={toggleToc}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle Table of Contents"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">{currentTopic?.title || 'AI Learning Platform'}</h1>
        <button
          onClick={toggleResources}
          className="p-2 hover:bg-gray-100 rounded-lg"
          aria-label="Toggle Resources"
        >
          <BookOpen className="w-6 h-6" />
        </button>
      </div>

      <div className="h-[calc(100vh-64px)] lg:h-screen flex">
        {/* Left Sidebar - Table of Contents */}
        <div
          className={`${
            showToc ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 fixed lg:relative left-0 top-[64px] lg:top-0 w-80 h-[calc(100vh-64px)] lg:h-screen bg-white transform transition-transform duration-300 ease-in-out z-20 overflow-y-auto border-r`}
        >
          <TableOfContents
            toc={dummyToc}
            selectedId={selectedId}
            onSelect={handleTopicSelect}
          />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <MainContent
            content={content}
            toc={dummyToc}
            selectedId={selectedId}
            onNavigate={handleTopicSelect}
            isLoading={isLoading}
          />
        </div>

        {/* Right Sidebar - Resources */}
        <div
          className={`${
            showResources ? 'translate-x-0' : 'translate-x-full'
          } lg:translate-x-0 fixed lg:relative right-0 top-[64px] lg:top-0 w-80 h-[calc(100vh-64px)] lg:h-screen bg-white transform transition-transform duration-300 ease-in-out z-20 overflow-y-auto border-l`}
        >
          <Resources resources={dummyResources} />
        </div>
      </div>

      {/* Overlay for mobile */}
      {(showToc || showResources) && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={() => {
            setShowToc(false);
            setShowResources(false);
          }}
        />
      )}
    </div>
  );
}

export default App;