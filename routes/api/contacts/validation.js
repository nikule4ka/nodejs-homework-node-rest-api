const Joi = require('joi')
const mongoose = require('mongoose')

const schemaCreateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .optional(),
  favorite: Joi.boolean().optional()
}).or('name', 'email', 'phone')

const schemaUpdateContact = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string().email().optional(),
  phone: Joi.string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}/)
    .optional(),
  favorite: Joi.boolean().optional()
}).or('name', 'email', 'phone')

const schemaFavoriteContact = Joi.object({
  favorite: Joi.boolean().required()
})

const validate = async (schema, obj, next) => {
  try {
    await schema.validateAsync(obj)
    next()
  } catch (err) {
    next({
      status: 400,
      message: err.message.replace(/"/g, '')
    })
  }
}

module.exports = {
  validationCreateContact: (req, res, next) => {
    return validate(schemaCreateContact, req.body, next)
  },
  validationUpdateContact: (req, res, next) => {
    return validate(schemaUpdateContact, req.body, next)
  },
  validationFavoriteContact: (req, res, next) => {
    return validate(schemaFavoriteContact, req.body, next)
  },
  validateMongoId: (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return next({
        status: 400,
        message: 'Invalid ObjectId'
      })
    }
    next()
  }
}
