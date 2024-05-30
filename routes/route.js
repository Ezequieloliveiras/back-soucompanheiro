const express = require('express')
const {check} = require('express-validator')




const router = express.Router()

const { createUser } = require('../controllers/controller')
const { validateUserSingUp, userValidation } = require('../middlewares/validation/user')

router.post('/create-user', validateUserSingUp, userValidation, createUser) // verificando o campo name/ trim- removendo espacos/ campo vazio

module.exports = router