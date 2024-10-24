import { Router } from 'express';

import { syncNotionToDB } from './controllers/syncController';

export const syncRouter = Router();


syncRouter.post('/', syncNotionToDB);
