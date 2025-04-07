const Joi = require("joi");

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

exports.validateProductCreation = validateReqBody(
  Joi.object({
    name: Joi.string().required().min(3),
    slug: Joi.string().required().min(3),
    description: Joi.string().required().min(3),
    price: Joi.number().default(0),
    discount_price: Joi.number().default(0),
    stock_quantity: Joi.number().default(0),
    sku: Joi.string().required(),
    category_id: Joi.number().required(),
    brand: Joi.string().required(),
    image_url: Joi.string().required(),
    additional_images: Joi.array().required(),
    is_active: Joi.boolean().required(),
  })
);

exports.validateProductUpdate = validateReqBody(
  Joi.object({
    name: Joi.string().required().min(3),
    slug: Joi.string().required().min(3),
    description: Joi.string().required().min(3),
    price: Joi.number().default(0),
    discount_price: Joi.number().default(0),
    stock_quantity: Joi.number().default(0),
    sku: Joi.string().required(),
    category_id: Joi.number().required(),
    brand: Joi.string().required(),
    image_url: Joi.string().required(),
    additional_images: Joi.array().required(),
    is_active: Joi.boolean().required(),
  })
);

exports.validateUpdateUser = validateReqBody(
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
  })
);

exports.validateProductId = validateReqParam(
  Joi.object({
    id: Joi.number().required(),
  })
);
