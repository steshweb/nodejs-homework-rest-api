const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/auth')
const {validateBody, authenticate} = require('../../middlewares')
const { schemas } = require('../../models/users')

router.post('/register',validateBody(schemas.authSchema), ctrl.register)

router.post('/login', validateBody(schemas.authSchema), ctrl.login)

router.post('/logout', authenticate, ctrl.logout)

router.get('/current', authenticate, ctrl.getCurrent)

router.patch('/', 
  authenticate, 
  validateBody(schemas.subscriptionSchema),
  ctrl.subscriptionUpdate)

module.exports = router