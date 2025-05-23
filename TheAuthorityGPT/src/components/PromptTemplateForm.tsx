import React, { useState } from 'react';
import { usePromptEngine } from '../lib/promptEngine';

interface PromptTemplateFormProps {
  templateId: string;
  onGenerate?: (result: string) => void;
}

export function PromptTemplateForm({ templateId, onGenerate }: PromptTemplateFormProps) {
  const [variables, setVariables] = useState<Record<string, string>>({});
  const { applyTemplate } = usePromptEngine();

  const handleGenerate = () => {
    try {
      const result = applyTemplate(templateId, variables);
      onGenerate?.(result);
    } catch (error) {
      console.error('Error applying template:', error);
    }
  };

  const handleVariableChange = (key: string, value: string) => {
    setVariables(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-4">
      {Object.keys(variables).map(key => (
        <div key={key} className="flex flex-col">
          <label className="text-sm font-medium">{key}</label>
          <input
            type="text"
            value={variables[key] || ''}
            onChange={(e) => handleVariableChange(key, e.target.value)}
            className="mt-1 p-2 border rounded"
          />
        </div>
      ))}
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Generate Prompt
      </button>
    </div>
  );
}
