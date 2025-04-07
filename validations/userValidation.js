const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

exports.validateRegister = validate(Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}));

exports.validateLogin = validate(Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}));

exports.validateUpdateUser = validate(Joi.object({
  name: Joi.string().required()
}));
