import * as Joi from 'joi';

export const ConfigValidationSchema = Joi.object({
  MONGO_URI: Joi.string().uri().required(),
});
