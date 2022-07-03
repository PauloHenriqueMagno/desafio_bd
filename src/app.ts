import express from 'express';
import routes from './routes';

import { handleErrors } from './utils/errorHandler';

const app = express();

app.use(express.json());

app.use('/api', routes);

app.use(handleErrors);

export default app;
