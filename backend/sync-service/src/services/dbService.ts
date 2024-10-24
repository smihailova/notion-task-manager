import axios from 'axios';

import { API_GATEWAY_HOST_NAME } from '../general/constants';

export const updateDatabase = async (tasks) => {
  try {
    const response = await axios.post(`${API_GATEWAY_HOST_NAME}/tasks`, { tasks });
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks from Notion Integration:', error);
    throw new Error('Failed to fetch tasks from Notion Integration');
  }
};
