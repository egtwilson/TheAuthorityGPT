import { Configuration, OpenAIApi } from 'openai';
import { PromptCategory } from '../types/prompt.types';

export class OpenAIService {
  private openai: OpenAIApi;

  constructor() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openai = new OpenAIApi(configuration);
  }

  async generatePrompts(category: PromptCategory, goal: string) {
    try {
      const completion = await this.openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "system",
          content: `You are an expert copywriter specializing in ${category} content.`
        }, {
          role: "user",
          content: `Generate 3 different ${category} prompts for the following goal: ${goal}`
        }],
        temperature: 0.7,
      });

      const prompts = completion.data.choices[0].message?.content?.split('\n')
        .filter(line => line.trim().length > 0) || [];

      return { prompts };
    } catch (error) {
      console.error('OpenAI API error:', error);
      return { error: 'Failed to generate prompts' };
    }
  }
}
