import React from 'react';
import { Resource } from '@/app/types';
import { Youtube, BookOpen, ExternalLink } from 'lucide-react';

interface Props {
  resources: Resource[];
}

export const Resources: React.FC<Props> = ({ resources }) => {
  return (
    <div className="h-full bg-gray-50 p-4 border-l border-gray-200">
      <h2 className="text-xl font-semibold mb-4">Additional Resources</h2>
      <div className="space-y-4">
        {resources.map((resource) => (
          <a
            key={resource.id}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              {resource.type === 'youtube' ? (
                <Youtube className="w-5 h-5 text-red-600 mt-1" />
              ) : (
                <BookOpen className="w-5 h-5 text-blue-600 mt-1" />
              )}
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{resource.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span>{resource.type === 'youtube' ? 'Video' : 'Blog'}</span>
                  <ExternalLink className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};