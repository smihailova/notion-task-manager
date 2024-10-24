import express from 'express';

import { getUsers, getUserTasks } from './NotionClient';
import { PORT } from './general/constants';

const app = express();

app.get('/users', async (req, res) => {
  console.log('integration service /users');
  try {
    const users = await getUsers();
    return res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/users/:userId/tasks', async (req, res) => {
  console.log('integration service /users/:userId/tasks');
  try {
    const tasks = await getUserTasks();
    return res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

app.listen(PORT, () => {
  console.log(`Integration service running on port ${PORT}`);
});
