import { Request, Response } from 'express';
import { OpenAIService } from '../utils/openai.service';
import { PromptHistory } from '../models/prompt.model';
import { PromptCategory } from '../types/prompt.types';

export class PromptController {
  private openaiService = new OpenAIService();

  async generatePromptVariations(req: Request, res: Response) {
    try {
      const { category, goal, userId } = req.body;

      if (!category || !goal || !userId) {
        return res.status(400).json({
          error: 'Category, goal, and userId are required'
        });
      }

      const result = await this.openaiService.generatePrompts(
        category as PromptCategory,
        goal
      );

      if (result.error) {
        return res.status(500).json({ error: result.error });
      }

      await PromptHistory.create({
        user_id: userId,
        input_goal: goal,
        category,
        generated_prompts: result.prompts
      });

      res.json({ prompts: result.prompts });
    } catch (error) {
      console.error('Prompt generation error:', error);
      res.status(500).json({
        error: 'Failed to generate prompts'
      });
    }
  }

  async getPromptHistory(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      const history = await PromptHistory.find({ user_id: userId })
        .sort({ created_at: -1 })
        .limit(10);
      
      res.json({ history });
    } catch (error) {
      console.error('Error fetching prompt history:', error);
      res.status(500).json({
        error: 'Failed to fetch prompt history'
      });
    }
  }
}
