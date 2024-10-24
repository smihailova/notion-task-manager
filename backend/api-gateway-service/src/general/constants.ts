import 'dotenv/config';

export const PORT = process.env.PORT || 4000;
export const FE_HOST_HAME = process.env.FE_HOST_HAME || 'http://localhost:3000';
export const INTEGRATION_HOST_NAME = process.env.INTEGRATION_HOST_NAME || 'http://localhost:5000';
export const TASK_MANAGER_HOST_NAME = process.env.TASK_MANAGER_HOST_NAME || 'http://localhost:6000';
export const MONGODB_DB_HOST_NAME = process.env.MONGODB_DB_HOST_NAME || 'http://localhost:7000';
