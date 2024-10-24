import { Request, Response } from 'express';

import { syncTasksFromNotion } from '../services/notionService';
import { updateDatabase } from '../services/dbService';

export const syncNotionToDB = async (req: Request, res: Response) => {
  try {
    const notionTasks = await syncTasksFromNotion();

    const updatedTasks = await updateDatabase(notionTasks);

    res.status(200).json({ message: 'Sync completed successfully', updatedTasks });
  } catch (error) {
    console.error('Error during sync:', error);
    res.status(500).json({ message: 'Sync failed', error });
  }
};
