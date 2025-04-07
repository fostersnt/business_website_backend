const Joi = require('joi');

const validateReqBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });
  next();
};

const validateReqParam = (schema) => (req, res, next) => {
    const { error } = schema.validate(req.params);
    if (error) return res.status(400).json({ error: error.details[0].message });
    next();
  };

exports.validateUserCreation = validateReqBody(Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required()
}));

exports.validateLogin = validateReqBody(Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
}));

exports.validateUpdateUser = validateReqBody(Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email()
}));

exports.validateUserId = validateReqParam(Joi.object({
    id: Joi.number().required()
}));
