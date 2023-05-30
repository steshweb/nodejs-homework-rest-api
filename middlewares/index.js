const validateBody = require('./validateBody')
const validateReq = require('./validateReq')
const validateId = require('./validateId')
const authenticate = require('./authenticate')
const upload = require('./upload')

module.exports = {
  validateBody,
  validateId,
  validateReq,
  authenticate,
  upload
}