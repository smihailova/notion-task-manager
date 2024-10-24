import express, { Request, Response } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

import { OPENAI_API_KEY, PORT } from './general/constants';

const app = express();
app.use(express.json());

const genAI = new GoogleGenerativeAI(OPENAI_API_KEY);
const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: "application/json",
  }
});

app.post('/suggestions', async (req: Request, res: Response) => {
  try {
    const taskData = JSON.stringify(req.body);
    const prompt = `Provide priorities and due dates for the Notion task with following data: ${taskData}
    using this JSON schema:
    Suggestion = {'priority': string, 'dueDate': Date, 'explanation': string}
    Return: Suggestion`;

    const result = await model.generateContent(prompt);
    return res.json(result.response.text());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch suggestions' });
  }
});

app.listen(PORT, () => {
  console.log(`AI Task Manager service running on port ${PORT}`);
});
