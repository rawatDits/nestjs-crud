import * as Joi from 'joi';

// const validataion = {
//   createUser: {
//     body: Joi.object({
//       id: Joi.number().required(),
//       firstname: Joi.string().required(),
//       lastname: Joi.string().required(),
//       email: Joi.string().email().required(),
//       // role: Joi.string().valid('user', 'admin').required(),
//       password: Joi.string().required(),
//     }),
//   },
// };

export const createUserSchema = Joi.object({
      id: Joi.number().required(),
      firstname: Joi.string().required(),
      lastname: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),

})
