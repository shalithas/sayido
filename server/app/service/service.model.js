import { Schema, model } from "mongoose";
import Joi from 'joi';

export const serviceSchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

export const validate = (service) => {
    const schema = {
        name: Joi.string().required()
    };

    return Joi.validate(service, schema);
}

export const Service = model('Service', serviceSchema);