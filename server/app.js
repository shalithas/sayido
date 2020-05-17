import express from 'express';
import db from './startup/db';
import routes from './startup/routes';
import cors from 'cors';
import logger from './logger/logger';
import exceptions from './startup/exceptions';
import dotenv from 'dotenv';
import envVars from './startup/envVars';
import validations from './startup/validations';

const app = express();

app.use(cors());
db();
routes(app);
envVars(dotenv);
validations();

exceptions(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  logger.info(`app running on port ${PORT}`);
});