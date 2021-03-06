import { json } from "body-parser"
import guestController from '../app/guest/guest.controller';
import paymentController from "../app/payment/payment.controller";
import authController from "../app/user/auth.controller";
import userController from "../app/user/user.controller";
import vendorController from "../app/vendor/vendor.controller";
import serviceController from "../app/service/service.controller";

export default app => {
    app.use(json());
    app.use('/api/guests', guestController);
    app.use('/api/payments', paymentController);
    app.use('/api/auth', authController);
    app.use('/api/users', userController);
    app.use('/api/vendors', vendorController);
    app.use('/api/services', serviceController);
}