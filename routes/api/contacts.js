const express = require('express')

const ctrl = require('../../controllers/contacts')
const validateId = require('../../middlewares/validateId')
const validateContacts = require('../../middlewares/validateContacts')
const validateBody = require('../../middlewares/validateBody')
const { schemas } = require('../../models/contacts')

const router = express.Router()

router.get('/', ctrl.getAllContacts)

router.get('/:id',validateId, ctrl.getContactById)

router.post('/', 
  validateBody(), 
  validateContacts(schemas.addContactSchema), 
  ctrl.addNewContatc)

router.put('/:id', 
  validateId, validateBody(), 
  validateContacts(schemas.addContactSchema), 
  ctrl.updateContactById)

router.patch('/:id', 
  validateId, 
  validateContacts(schemas.updateFavoriteSchema), 
  ctrl.updateStatusContact)

router.delete('/:id', validateId, ctrl.deleteContactById)

module.exports = router
