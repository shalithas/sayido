import express from 'express';
import { json } from 'body-parser';
import db from './startup/db';
import routes from './startup/routes';
import cors from 'cors';

const app = express();

app.use(cors());
db();
routes(app);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});