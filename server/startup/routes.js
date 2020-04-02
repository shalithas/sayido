import { json } from "body-parser"
import guestController from '../app/guest/guest.controller';
import paymentController from "../app/payment/payment.controller";

export default app => {
    app.use(json());
    app.use('/api/guests', guestController);
    app.use('/api/payments', paymentController);
}