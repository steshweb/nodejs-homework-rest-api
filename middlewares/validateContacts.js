const {HttpError} = require('../helpers')

const validateContacts = schema => {
  const func = (req, res, next) => {
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