const {Schema, model} = require('mongoose')
const Joi = require('joi')
const handleMongooseError = require('../helpers/handleMongooseError')

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

const subscriptionList = ["starter", "pro", "business"]

const usersSchema = Schema({
  password: {
    type: String,
    required: [true, 'Set password for user'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: subscriptionList,
    default: "starter"
  },
  token: String,
  avatarURL: String,
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
}, {versionKey: false})

usersSchema.post('save', handleMongooseError)

const authSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required()
})

const subscriptionSchema = Joi.object({
  subscription: Joi.string().required().valid(...subscriptionList)
})

const emailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
})

const User = model('user', usersSchema)

const schemas = {
  authSchema,
  subscriptionSchema,
  emailSchema
}

module.exports = {
  User,
  schemas
}