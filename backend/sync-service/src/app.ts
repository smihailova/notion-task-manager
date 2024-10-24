import express from 'express';

import { syncRouter } from './routes';
import { PORT } from './general/constants';

const app = express();

app.use(express.json());

app.use('/sync', syncRouter);

app.listen(PORT, () => {
  console.log(`Syncronization Service is running on port ${PORT}`);
});
