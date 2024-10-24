import { Router, Request, Response } from 'express';
import { connectToDatabase } from '../src/databaseConnection';
import { ObjectId } from 'mongodb';

const router = Router();

// Get all tasks
router.get('/tasks', async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const tasks = await db.collection('tasks').find({}).toArray();
  res.json(tasks);
});

// Create task
router.post('/tasks', async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const task = req.body;
  const result = await db.collection('tasks').insertOne(task);
  const insertedTask = await db.collection('tasks').findOne({ _id: result.insertedId });
  res.json(insertedTask);
});

// Update task
router.put('/tasks/:id', async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const { id } = req.params;
  const update = req.body;
  const result = await db.collection('tasks').updateOne({ _id: new ObjectId(id) }, { $set: update });
  res.json(result);
});

// Delete task
router.delete('/tasks/:id', async (req: Request, res: Response) => {
  const db = await connectToDatabase();
  const { id } = req.params;
  const result = await db.collection('tasks').deleteOne({ _id: new ObjectId(id) });
  res.json(result);
});

export default router;
