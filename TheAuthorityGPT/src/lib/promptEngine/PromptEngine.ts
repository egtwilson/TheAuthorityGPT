import { Prompt, PromptEngineConfig, PromptTemplate } from './types';

export class PromptEngine {
  private config: PromptEngineConfig;
  private prompts: Map<string, Prompt>;
  private templates: Map<string, PromptTemplate>;

  constructor(config: PromptEngineConfig = {}) {
    this.config = {
      maxLength: config.maxLength || 2000,
      defaultCategory: config.defaultCategory || 'general',
      templates: config.templates || []
    };
    this.prompts = new Map();
    this.templates = new Map();
    
    if (this.config.templates) {
      this.config.templates.forEach(template => {
        this.templates.set(template.id, template);
      });
    }
  }

  createPrompt(content: string, category?: string, tags?: string[]): Prompt {
    if (content.length > this.config.maxLength!) {
      throw new Error(`Prompt exceeds maximum length of ${this.config.maxLength} characters`);
    }

    const prompt: Prompt = {
      id: crypto.randomUUID(),
      content,
      category: category || this.config.defaultCategory,
      tags: tags || [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.prompts.set(prompt.id, prompt);
    return prompt;
  }

  getPrompt(id: string): Prompt | undefined {
    return this.prompts.get(id);
  }

  updatePrompt(id: string, content: string): Prompt {
    const prompt = this.prompts.get(id);
    if (!prompt) {
      throw new Error(`Prompt with id ${id} not found`);
    }

    prompt.content = content;
    prompt.updatedAt = new Date();
    this.prompts.set(id, prompt);
    return prompt;
  }

  deletePrompt(id: string): boolean {
    return this.prompts.delete(id);
  }

  applyTemplate(templateId: string, variables: Record<string, string>): string {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template with id ${templateId} not found`);
    }

    let result = template.template;
    template.variables.forEach(variable => {
      if (!variables[variable]) {
        throw new Error(`Missing required variable: ${variable}`);
      }
      result = result.replace(new RegExp(`{{${variable}}}`, 'g'), variables[variable]);
    });

    return result;
  }

  getAllPrompts(): Prompt[] {
    return Array.from(this.prompts.values());
  }

  getPromptsByCategory(category: string): Prompt[] {
    return this.getAllPrompts().filter(prompt => prompt.category === category);
  }

  getPromptsByTags(tags: string[]): Prompt[] {
    return this.getAllPrompts().filter(prompt => 
      tags.some(tag => prompt.tags?.includes(tag))
    );
  }
}
