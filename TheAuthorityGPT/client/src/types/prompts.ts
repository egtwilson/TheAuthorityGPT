export type PromptCategory = 'email' | 'social' | 'content' | 'ads';

export interface PromptRequest {
  category: PromptCategory;
  goal: string;
}

export interface PromptResponse {
  prompts: string[];
  error?: string;
}

export interface Prompt {
  id: string;
  content: string;
  category: PromptCategory;
  createdAt: Date;
}
