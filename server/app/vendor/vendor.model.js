import { Schema } from "mongoose";

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