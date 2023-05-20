const {HttpError} = require('../helpers')

const validateContacts = schema => {
  const func = (req, res, next) => {
    const {error} = schema.validate(req.body)
    if(error) {
      throw HttpError(400, 'missing required field')
    }
    next()
  }
  return func
}

module.exports = validateContacts