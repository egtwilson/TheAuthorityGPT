import { useState, useCallback } from 'react';
import { PromptEngine } from '../PromptEngine';
import { Prompt, PromptEngineConfig } from '../types';

export function usePromptEngine(config?: PromptEngineConfig) {
  const [engine] = useState(() => new PromptEngine(config));
  const [prompts, setPrompts] = useState<Prompt[]>([]);

  const refreshPrompts = useCallback(() => {
    setPrompts(engine.getAllPrompts());
  }, [engine]);

  const createPrompt = useCallback((content: string, category?: string, tags?: string[]) => {
    const prompt = engine.createPrompt(content, category, tags);
    refreshPrompts();
    return prompt;
  }, [engine, refreshPrompts]);

  const updatePrompt = useCallback((id: string, content: string) => {
    const prompt = engine.updatePrompt(id, content);
    refreshPrompts();
    return prompt;
  }, [engine, refreshPrompts]);

  const deletePrompt = useCallback((id: string) => {
    const result = engine.deletePrompt(id);
    refreshPrompts();
    return result;
  }, [engine, refreshPrompts]);

  const applyTemplate = useCallback((templateId: string, variables: Record<string, string>) => {
    return engine.applyTemplate(templateId, variables);
  }, [engine]);

  return {
    prompts,
    createPrompt,
    updatePrompt,
    deletePrompt,
    applyTemplate,
    getPromptsByCategory: engine.getPromptsByCategory.bind(engine),
    getPromptsByTags: engine.getPromptsByTags.bind(engine),
  };
}
