import React, { useState } from 'react';
import { PromptCategory, PromptRequest, PromptResponse } from '../types/prompts';

const CATEGORIES: PromptCategory[] = ['email', 'social', 'content', 'ads'];

export default function PromptGenerator() {
  const [category, setCategory] = useState<PromptCategory>('email');
  const [goal, setGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<string[]>([]);

  const generatePrompts = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/prompts/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, goal } as PromptRequest)
      });

      const data: PromptResponse = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setResults(data.prompts);
      }
    } catch (err) {
      setError('Failed to generate prompts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={generatePrompts} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as PromptCategory)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-yellow-500 focus:ring-yellow-500"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Your Goal
          </label>
          <textarea
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm
              focus:border-yellow-500 focus:ring-yellow-500"
            placeholder="What do you want to achieve?"
          />
        </div>

        <button
          type="submit"
          disabled={loading || !goal.trim()}
          className="w-full flex justify-center py-2 px-4 border border-transparent
            rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600
            hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2
            focus:ring-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Prompts'}
        </button>
      </form>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {results.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">
            Generated Prompts
          </h3>
          {results.map((prompt, index) => (
            <div
              key={index}
              className="relative bg-white p-4 rounded-lg border border-gray-200"
            >
              <p className="pr-8 text-sm text-gray-700">{prompt}</p>
              <button
                onClick={() => copyToClipboard(prompt)}
                className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
