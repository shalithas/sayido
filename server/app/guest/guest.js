import mongoose from 'mongoose';
import Joi from 'joi';

export const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    trim: true
  },
  email: {
    type: String
  },
  phone: {
    type: String,
    required: false,
    minlength: 5,
    maxlength: 50
  },
  invitationSent: {
    type: Boolean,
    default: false
  },
  rsvp: {
    type: Boolean
  },
  adults: {
    type: Number
  },
  children: {
    type: Number
  }
});

guestSchema.statics.findStats = async () => {
  const guests = await Guest.find();
  let count = 0,
    rsvpCount = 0;
  guests.forEach(guest => {
    let familyCount = 1;
    if (guest.adults) {
      familyCount += guest.adults;
    }
    if (guest.children) {
      familyCount += guest.children;
    }
    count += familyCount;
    if (guest.rsvp) {
      rsvpCount += familyCount;
    }
  });
  return {
    count,
    rsvpCount
  };
};

export const validateGuest = guest => {
  const schema = {
    name: Joi.string()
      .min(3)
      .max(100)
      .required(),
    email: Joi.string(),
    phone: Joi.string()
      .min(5)
      .max(50),
    invitationSent: Joi.boolean().default(false),
    rsvp: Joi.boolean().default(false),
    adults: Joi.number().default(0),
    children: Joi.number().default(0)
  };

  return Joi.validate(guest, schema);
};

export const Guest = mongoose.model('Guest', guestSchema);
