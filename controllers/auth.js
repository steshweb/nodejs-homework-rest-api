const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { ctrlWrapper, HttpError } = require("../helpers")
const { User } = require("../models/users")

const {SECRET_KEY} = process.env

const register = async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})

  if(user) {
    throw HttpError(409, 'Email in use')
  }

  const hashPassword = await bcrypt.hash(password, 10)
  const newUser = await User.create({email, password: hashPassword})

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription
    }
  })
}

const login = async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})

  if(!user) {
    throw HttpError(401, 'Email or password is wrong')
  }

  const passwordCompare = await bcrypt.compare(password, user.password)
  if(!passwordCompare) {
    throw HttpError(401, 'Email or password is wrong')
  }

  const payload = { id: user._id}
  const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'})
  await User.findByIdAndUpdate(user._id, {token})

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription
    }
  })
}

const logout = async (req, res, next) => {
  const {_id} = req.user
  await User.findByIdAndUpdate(_id, {token: ''})
  res.status(204).send()
}

const getCurrent = async (req, res) => {
  const {email, subscription} = req.user

  res.json({
    email,
    subscription
  })
}

const subscriptionUpdate = async (req, res) => {
  const {_id} = req.user
  const {subscription} = req.body

  const updateUser = await User.findByIdAndUpdate(_id, {subscription}, {new: true})
  if(!updateUser) {
    throw HttpError(404, 'Not found')
  }
  
  res.json({
    email: updateUser.email,
    id: updateUser._id,
    subscription: updateUser.subscription
  })
}

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
  subscriptionUpdate: ctrlWrapper(subscriptionUpdate)
}