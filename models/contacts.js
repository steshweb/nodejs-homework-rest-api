const {Schema, model} = require('mongoose')
const Joi = require('joi')
const handleMongooseError = require('../helpers/handleMongooseError')

const contactsSchema = new Schema({
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
}, {versionKey: false})

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required()
})

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required()
})

contactsSchema.post('save', handleMongooseError)

const Contact = model('contact', contactsSchema)

const schemas = {
  addContactSchema,
  updateFavoriteSchema
}

module.exports = {
  schemas,
  Contact
}