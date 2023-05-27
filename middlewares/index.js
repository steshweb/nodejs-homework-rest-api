const validateBody = require('./validateBody')
const validateReq = require('./validateReq')
const validateId = require('./validateId')
const authenticate = require('./authenticate')

module.exports = {
  validateBody,
  validateId,
  validateReq,
  authenticate,
}