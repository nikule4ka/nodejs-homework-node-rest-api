const Joi = require('joi');
const { Subscription } = require('../../../helpers/constans');

const validateCreateUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(3).max(14).required(),
  subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .optional()
});

const validateLogInUser = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});

const validateSubscriptionUser = Joi.object({
  subscription: Joi.string()
    .valid(Subscription.STARTER, Subscription.PRO, Subscription.BUSINESS)
    .required()
});

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj);
    next();
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, '')
    });
  }
};

module.exports = {
  validationCreateUser: (req, res, next) => {
    return validate(validateCreateUser, req.body, next);
  },
  validationLogInUser: (req, res, next) => {
    return validate(validateLogInUser, req.body, next);
  },
  validationSubscriptionUser: (req, res, next) => {
    return validate(validateSubscriptionUser, req.body, next);
  }
};
