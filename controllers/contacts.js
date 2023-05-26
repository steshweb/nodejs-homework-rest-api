const {Contact} = require('../models/contacts')
const {HttpError, ctrlWrapper} = require('../helpers')

const getAllContacts = async (req, res) => {
    const result = await Contact.find()
    res.json(result)
}

const getContactById = async (req, res, next) => {
    const {id} = req.params
    const result = await Contact.findById(id)

    if(!result) {
      throw HttpError(404, 'Not found')
    }
    res.json(result)
}

const addNewContatc = async (req, res, next) => {
  const result = await Contact.create(req.body)
  res.status(201).json(result)
}

const updateContactById = async (req, res, next) => {
  const {id} = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})

  if(!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

const updateStatusContact = async (req, res, next) => {
  const {id} = req.params
  const result = await Contact.findByIdAndUpdate(id, req.body, {new: true})

  if(!result) {
    throw HttpError(404, 'Not found')
  }
  res.json(result)
}

const deleteContactById = async (req, res, next) => {
  const {id} = req.params
  const result = await Contact.findByIdAndRemove(id)
  
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
  updateStatusContact: ctrlWrapper(updateStatusContact),
  deleteContactById: ctrlWrapper(deleteContactById),
}