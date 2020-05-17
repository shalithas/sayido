import { Schema, model } from "mongoose";

export const vendorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    number: {
        type: String
    },
    email: {
        type: String
    }
});

export const Vendor = model('Vendor', vendorSchema);