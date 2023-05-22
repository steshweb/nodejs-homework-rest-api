const { HttpError } = require("../helpers")

const validateBody = () => {
  const func = (req, res, next) => {
    const bodyLength = Object.keys(req.body).length
    if(!bodyLength) {
      throw HttpError(400, "missing fields")
    }
    next()
  }
  return func
}

module.exports = validateBody