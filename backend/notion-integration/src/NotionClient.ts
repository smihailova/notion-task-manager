import { Client } from '@notionhq/client';

import { NOTION_TOKEN } from './general/constants';

const notion = new Client({
	auth: NOTION_TOKEN,
})

const getUsers = async () => {
	const listUsersResponse = await notion.users.list({})
  console.log(listUsersResponse)
  return listUsersResponse.results;
}

const getUserTasks = async () => {
  const listTasksResponse = await notion.databases.query({
    database_id: 'c5ab06ab0cd54687bebd9f6311861cb6',
  });
  const tasks = listTasksResponse.results.map(async (page) => {
    const response = await notion.pages.retrieve({ page_id: page.id });
    // console.log(response);
    return response;
  });
  return Promise.all(tasks).then((values) => values);
  // console.log('tasks ->', tasks)
  // return tasks;
}

export {
  getUsers,
  getUserTasks,
};
