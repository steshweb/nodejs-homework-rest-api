const express = require('express')

const router = express.Router()

const ctrl = require('../../controllers/auth')
const {validateBody, authenticate, upload} = require('../../middlewares')
const { schemas } = require('../../models/users')

router.post('/register',validateBody(schemas.authSchema), ctrl.register)

router.post('/verify', validateBody(schemas.emailSchema), ctrl.resendVerifyEmail)

router.get('/verify/:verificationToken', ctrl.verifyEmail)

router.post('/login', validateBody(schemas.authSchema), ctrl.login)

router.post('/logout', authenticate, ctrl.logout)

router.get('/current', authenticate, ctrl.getCurrent)

router.patch('/', 
  authenticate, 
  validateBody(schemas.subscriptionSchema),
  ctrl.subscriptionUpdate)

router.patch('/avatars', authenticate, upload.single('avatar'), ctrl.updateAvatar)

module.exports = router