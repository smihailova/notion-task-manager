import axios from 'axios';

import { API_GATEWAY_HOST_NAME } from '../general/constants';

export const syncTasksFromNotion = async () => {
  try {
    const response = await axios.get(`${API_GATEWAY_HOST_NAME}/tasks`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks from Notion Integration:', error);
    throw new Error('Failed to fetch tasks from Notion Integration');
  }
};
