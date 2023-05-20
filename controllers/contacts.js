const contacts = require('../models/contacts')
const {HttpError, ctrlWrapper} = require('../helpers')

const getAllContacts = async (req, res, next) => {
    const result = await contacts.listContacts();
    res.json(result)
}

const getContactById = async (req, res, next) => {
    const {id} = req.params
    const result = await contacts.getContactById(id)

    if(!result) {
      throw HttpError(404, 'Not found')
    }
    res.json(result)
}

const addNewContatc = async (req, res, next) => {
  const result = await contacts.addContact(req.body)
  res.status(201).json(result)
}

const updateContactById = async (req, res, next) => {
    const {id} = req.params

    const result = await contacts.updateContact(id, req.body)
    if(!result) {
      throw HttpError(404, 'Not found')
    }
    res.json(result)
}

const deleteContactById = async (req, res, next) => {
    const {id} = req.params
    const result = await contacts.removeContact(id)
    if(!result) {
      throw HttpError(404, 'Not found')
    }

    res.json({ message: 'contact deleted' })
}

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addNewContatc: ctrlWrapper(addNewContatc),
  updateContactById: ctrlWrapper(updateContactById),
  deleteContactById: ctrlWrapper(deleteContactById)
}