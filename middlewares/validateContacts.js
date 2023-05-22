const {HttpError} = require('../helpers')

const validateContacts = schema => {
  const func = (req, res, next) => {
    const bodyLength = Object.keys(req.body).length
      if(!bodyLength) {
      throw HttpError(400, "missing fields")
    }

    const {error} = schema.validate(req.body)
    if(error) {
      const fieldName = error.details[0].context.key
      throw HttpError(400, 'missing required ' + fieldName + ' field')
    }
    next()
  }
  return func
}

module.exports = validateContacts