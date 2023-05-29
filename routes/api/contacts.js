const express = require('express')

const ctrl = require('../../controllers/contacts')
const {validateId, validateBody, validateReq, authenticate} = require('../../middlewares')
const { schemas } = require('../../models/contacts')

const router = express.Router()

router.get('/', authenticate, ctrl.getAllContacts)

router.get('/:id', authenticate, validateId, ctrl.getContactById)

router.post('/', 
  authenticate,
  validateReq(), 
  validateBody(schemas.addContactSchema), 
  ctrl.addNewContatc)

router.put('/:id', 
  authenticate, 
  validateId, 
  validateReq(), 
  validateBody(schemas.addContactSchema), 
  ctrl.updateContactById)

router.patch('/:id/favorite', 
  authenticate,
  validateId, 
  validateBody(schemas.updateFavoriteSchema), 
  ctrl.updateStatusContact)

router.delete('/:id', authenticate, validateId, ctrl.deleteContactById)

module.exports = router
