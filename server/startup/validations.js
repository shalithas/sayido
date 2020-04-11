import Joi from 'joi';
import objectid from 'joi-objectid';

export default () => {
    Joi.objectId = objectid(Joi);
}