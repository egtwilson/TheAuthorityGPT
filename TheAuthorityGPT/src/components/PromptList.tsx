import React from 'react';
import { usePromptEngine } from '../lib/promptEngine';

export function PromptList() {
  const { prompts, deletePrompt } = usePromptEngine();

  return (
    <div className="space-y-4">
      {prompts.map(prompt => (
        <div key={prompt.id} className="p-4 border rounded">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="whitespace-pre-wrap">{prompt.content}</p>
              {prompt.category && (
                <span className="text-sm text-gray-500">
                  Category: {prompt.category}
                </span>
              )}
              {prompt.tags && prompt.tags.length > 0 && (
                <div className="flex gap-2 mt-2">
                  {prompt.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => deletePrompt(prompt.id)}
              className="ml-4 text-red-500 hover:text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
