import express from 'express';
import { json } from 'body-parser';
import db from './startup/db';
import routes from './startup/routes';

const app = express();

db();
routes(app);

app.use(json());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});