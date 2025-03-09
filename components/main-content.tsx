import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';
import { Content, TableOfContent } from '@/app/types';

interface Props {
  content: Content | null;
  toc: TableOfContent[];
  selectedId: number;
  onNavigate: (id: number) => void;
  isLoading: boolean;
}

export const MainContent: React.FC<Props> = ({
  content,
  toc,
  selectedId,
  onNavigate,
  isLoading,
}) => {
  const currentIndex = toc.findIndex((item) => item.id === selectedId);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < toc.length - 1;
  const currentTopic = toc.find(item => item.id === selectedId);

  if (isLoading) {
    return (
      <div className="flex-1 p-8 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-8 text-gray-800">
          {currentTopic?.title}
        </h2>
        <div className="flex flex-col items-center gap-4 text-gray-600">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          <div className="flex flex-col items-center">
            <p className="text-lg">Loading content...</p>
            <p className="text-sm text-gray-500">Please wait while we fetch the latest information</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        {currentTopic?.title}
      </h1>
      <div className="prose max-w-none">
        <ReactMarkdown
          components={{
            code({ node, inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              return !inline && match ? (
                <SyntaxHighlighter
                  style={tomorrow}
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content?.content || '# Select a topic to start learning'}
        </ReactMarkdown>
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t">
        <button
          onClick={() => hasPrevious && onNavigate(toc[currentIndex - 1].id)}
          disabled={!hasPrevious}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            hasPrevious
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>
        <button
          onClick={() => hasNext && onNavigate(toc[currentIndex + 1].id)}
          disabled={!hasNext}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
            hasNext
              ? 'bg-blue-500 text-white hover:bg-blue-600'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Next
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};