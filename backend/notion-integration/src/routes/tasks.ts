import { Router, Request, Response } from 'express';
import axios from 'axios';

import { INTEGRATION_HOST_NAME,
  MONGODB_DB_HOST_NAME,
  TASK_MANAGER_HOST_NAME } from '../general/constants';

const router = Router();

const statusMap = {
  'to do': 'todo',
  'doing': 'inProgress',
  'done': 'done',
};

const fetchTasks = async (userId: string): Promise<any[]> => {
  const response = await axios.get(`${INTEGRATION_HOST_NAME}/users/${userId}/tasks`);
  return response.data;
};

const mapTask = async (task: any): Promise<any> => {
  const taskManagerData = {
    taskId: task.id,
    title: task.properties.Name?.title[0]?.plain_text,
    status: task.properties.Status?.select?.name,
    dueDate: task.properties.Due?.date?.start,
    priority: task.properties.Priority?.select?.name,
  };

  const suggestions = await fetchSuggestions(taskManagerData);

  return {
    ...taskManagerData,
    suggestions,
  };
};

const fetchSuggestions = async (taskManagerData: any): Promise<any> => {
  const response = await axios.post(`${TASK_MANAGER_HOST_NAME}/suggestions`, taskManagerData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return JSON.parse(response.data);
};

const categorizeTasks = (tasks: any[]): any => {
  return tasks.reduce((acc: any, task: { status?: string }) => {
    const status = task.status ? statusMap[task.status.toLowerCase() as keyof typeof statusMap] : undefined;
    if (status && !acc[status]) {
      acc[status] = [];
    }
    if (status) {
      acc[status].push(task);
    }
    return acc;
  }, {});
};

router.get('tasks', async (req: Request<{ userId: string }>, res: Response) => {
  console.log('API service GET tasks');
  try {
    const userId = req.params.userId;

    const tasks = await fetchTasks(userId);
    const filteredTasks = tasks.filter((task: any) => !!task.properties.Name?.title[0]?.plain_text);

    const mappedTasks = await Promise.all(filteredTasks.map(mapTask));

    const categorizedTasks = categorizeTasks(mappedTasks);

    res.json({
      todo: categorizedTasks.todo || [],
      inProgress: categorizedTasks.inProgress || [],
      done: categorizedTasks.done || [],
    });
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
