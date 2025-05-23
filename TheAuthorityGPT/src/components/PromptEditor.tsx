import React, { useState } from 'react';
import { usePromptEngine } from '../lib/promptEngine';

interface PromptEditorProps {
  initialContent?: string;
  category?: string;
  tags?: string[];
  onSave?: (promptId: string) => void;
}

export function PromptEditor({ 
  initialContent = '', 
  category,
  tags,
  onSave 
}: PromptEditorProps) {
  const [content, setContent] = useState(initialContent);
  const { createPrompt } = usePromptEngine();

  const handleSave = () => {
    const prompt = createPrompt(content, category, tags);
    onSave?.(prompt.id);
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full h-40 p-2 border rounded"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter your prompt here..."
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleSave}
      >
        Save Prompt
      </button>
    </div>
  );
}
