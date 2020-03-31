import mongoose from "mongoose";
import Joi, { bool, boolean } from "joi";

export const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true
  },
  email: {
    type: String,
    required: false
  },
  phone: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 50
  },
  goingWith: [],
  invitationSent: {
      type: Boolean,
      default: false
  },
  rsvp: {
      type: Boolean
  }
});

export const validateGuest = guest => {
  const schema = {
    name: Joi.string()
        .min(3)
        .max(100)
        .required(),
    email: Joi.string()
        .required(),
    phone: Joi.string()
        .min(5)
        .max(50)
  };

  return Joi.validate(guest, schema);
};

export const Guest = mongoose.model("Guest", guestSchema);
