import { Schema, model } from "mongoose";
import { userSchema } from '../user/user.model';
import { vendorSchema } from "../vendor/vendor.model";
import { serviceSchema } from "../service/service.model";
import Joi from 'joi';

const paymentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    vendor: {
        type: vendorSchema
    },
    service: {
        type: serviceSchema,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
});

export const validate = (payment) => {
    const schema = {
        serviceId: Joi.objectId().required(),
        amount: Joi.number().required(),
        vendorId: Joi.objectId()
    };

    return Joi.validate(payment, schema);
}

export const Payment = model('Payment', paymentSchema);