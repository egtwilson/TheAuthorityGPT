export interface Prompt {
  id: string;
  content: string;
  category?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptTemplate {
  id: string;
  template: string;
  variables: string[];
  description?: string;
}

export interface PromptEngineConfig {
  maxLength?: number;
  defaultCategory?: string;
  templates?: PromptTemplate[];
}
