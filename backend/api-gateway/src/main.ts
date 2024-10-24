import express from 'express';
import cors from 'cors';

import { FE_HOST_HAME, PORT } from './general/constants';
import tasksRouter from './routes/tasks';

const app = express();

app.use(cors({
  origin: FE_HOST_HAME
}));

app.use(express.json());
app.use('/api', tasksRouter);

app.listen(PORT, () => {
  console.log(`API service running on port ${PORT}`);
});
