import { Configuration, OpenAIApi } from 'openai';
import { PromptCategory } from '../../client/src/types/prompts';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generatePrompts(
  category: PromptCategory,
  goal: string
) {
  try {
    const completion = await openai.createChatCompletion({
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
