const express = require('express')
const {check} = require('express-validator')




const router = express.Router()

const { createUser, userSignIn } = require('../controllers/controller')
const { validateUserSingUp, userValidation, validateUserSingIn } = require('../middlewares/validation/user')

router.post('/create-user', validateUserSingUp, userValidation, createUser) // verificando o campo name/ trim- removendo espacos/ campo vazio

router.post('/sign-in', validateUserSingIn, userValidation, userSignIn)
module.exports = router