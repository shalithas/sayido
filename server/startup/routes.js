import { json } from "body-parser"
import guestRouter from '../routes/guestRouter';

export default app => {
    app.use(json());
    app.use('/api/guests', guestRouter);
}