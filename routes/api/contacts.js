const express = require('express')

const ctrl = require('../../controllers/contacts')
const validateContacts = require('../../middlewares/validateContacts')
const schema = require('../../schemas/schemasContacts')

const router = express.Router()

router.get('/', ctrl.getAllContacts)

router.get('/:id', ctrl.getContactById)

router.post('/', validateContacts(schema), ctrl.addNewContatc)

router.put('/:id', validateContacts(schema), ctrl.updateContactById)

router.delete('/:id', ctrl.deleteContactById)

module.exports = router
