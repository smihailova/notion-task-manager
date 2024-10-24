import express from 'express';

import { PORT } from './general/constants';
import tasksRouter from '../routes/tasks';

const app = express();

app.use(express.json());
app.use('/db', tasksRouter);

app.listen(PORT, () => {
  console.log(`MongoDB server running on port ${PORT}`);
});
