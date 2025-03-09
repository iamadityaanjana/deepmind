import React from 'react';
import { TableOfContent } from '@/app/types';
import { BookOpen } from 'lucide-react';

interface Props {
  toc: TableOfContent[];
  selectedId: number;
  onSelect: (id: number) => void;
}

export const TableOfContents: React.FC<Props> = ({ toc, selectedId, onSelect }) => {
  return (
    <div className="h-full bg-gray-50 p-4 border-r border-gray-200">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BookOpen className="w-5 h-5" />
        Table of Contents
      </h2>
      <div className="space-y-2">
        {toc.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className={`w-full text-left p-3 rounded-lg transition-colors ${
              selectedId === item.id
                ? 'bg-blue-100 text-blue-700'
                : 'hover:bg-gray-100'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};