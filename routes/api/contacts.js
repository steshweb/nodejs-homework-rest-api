const express = require('express')

const ctrl = require('../../controllers/contacts')
const validateContacts = require('../../middlewares/validateContacts')
const schema = require('../../schemas/schemasContacts')
const validateBody = require('../../middlewares/validateBody')

const router = express.Router()

router.get('/', ctrl.getAllContacts)

router.get('/:id', ctrl.getContactById)

router.post('/',validateBody(), validateContacts(schema), ctrl.addNewContatc)

router.put('/:id',validateBody(), validateContacts(schema), ctrl.updateContactById)

router.delete('/:id', ctrl.deleteContactById)

module.exports = router
