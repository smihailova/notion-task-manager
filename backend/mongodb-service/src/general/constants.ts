import 'dotenv/config';

export const PORT = process.env.PORT || 7000;
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
export const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || 'task-manager';
