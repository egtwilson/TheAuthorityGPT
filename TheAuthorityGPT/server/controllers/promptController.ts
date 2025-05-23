import { Request, Response } from 'express';
import { generatePrompts } from '../services/openai';
import PromptHistory from '../models/PromptHistory';
import { PromptCategory } from '../../client/src/types/prompts';

export const generatePromptVariations = async (req: Request, res: Response) => {
  try {
    const { category, goal, userId } = req.body;

    if (!category || !goal || !userId) {
      return res.status(400).json({
        error: 'Category, goal, and userId are required'
      });
    }

    const result = await generatePrompts(
      category as PromptCategory,
      goal
    );

    if (result.error) {
      return res.status(500).json({ error: result.error });
    }

    // Save to prompt history
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
};

export const getPromptHistory = async (req: Request, res: Response) => {
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
};
