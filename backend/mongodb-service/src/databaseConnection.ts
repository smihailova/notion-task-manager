import { MongoClient, ServerApiVersion, Db } from 'mongodb';

import { MONGODB_URI, MONGODB_DB_NAME } from './general/constants';

let db: Db;

export const connectToDatabase = async (): Promise<Db> => {
  if (db) return db;

  try {
    const client = new MongoClient(MONGODB_URI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

    await client.connect();
    db = client.db(MONGODB_DB_NAME);
    console.log('Connected to MongoDB');

    return db;
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    throw error;
  }
};
