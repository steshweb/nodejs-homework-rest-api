const express = require('express')
const Joi = require('joi')
const HttpError = require('../../helpers/HttpError')

const contacts = require('../../models/contacts')

const schemaContacts = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required()
})

const router = express.Router()

router.get('/', async (req, res, next) => {
    try {
      const result = await contacts.listContacts();
      res.json(result)
    }
    catch(error) {
      next(error)
    }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const result = await contacts.getContactById(id)

    if(!result) {
      throw HttpError(404, 'Not found')
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = schemaContacts.validate(req.body)
    if(error) {
      throw HttpError(400, 'missing required name field')
    }
    const result = await contacts.addContact(req.body)
    res.status(201).json(result)
  }
  catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const {error} = schemaContacts.validate(req.body)
    if(error) {
      throw HttpError(400, 'missing fields')
    }

    const result = await contacts.updateContact(id, req.body)
    if(!result) {
      throw HttpError(404, 'Not found')
    }
    res.json(result)
  }
  catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const result = await contacts.removeContact(id)
    if(!result) {
      throw HttpError(404, 'Not found')
    }

    res.json({ message: 'contact deleted' })
    }
    catch (error) {
      next(error)
    }
})

module.exports = router
