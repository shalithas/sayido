import express from 'express';
import db from './startup/db';
import routes from './startup/routes';
import cors from 'cors';
import logger from './logger/logger';
import exceptions from './startup/exceptions';

const app = express();

app.use(cors());
db();
routes(app);

exceptions(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`app running on port ${PORT}`);
});