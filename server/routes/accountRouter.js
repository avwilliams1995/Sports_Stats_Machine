const express = require('express')
const User = require('../models/UserModel')
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/login', UserController.verifyUser,  (req, res) => {
  console.log(req.cookies)
  return res.status(200).json(res.locals.user)
})

router.post('/register', UserController.createUser, (req, res) => {
  return res.status(200).json(res.locals.user)
})

router.post('/editBio', UserController.editBio, (req, res) => {
  return res.status(200).json({message: 'Updated user.', newBio: res.locals.user.bio})
})

module.exports = router