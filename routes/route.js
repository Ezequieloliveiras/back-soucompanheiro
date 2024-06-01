const express = require('express')
const router = express.Router()

const { createUser, userSignIn } = require('../controllers/controller')
const { validateUserSingUp, userValidation, validateUserSingIn } = require('../middlewares/validation/user')
const { isAuth } = require('../middlewares/auth')

router.post('/create-user', validateUserSingUp, userValidation, createUser) // verificando o campo name/ trim- removendo espacos/ campo vazio
router.post('/sign-in', validateUserSingIn, userValidation, userSignIn)
router.post('/create-post', isAuth, (req, res) => {
    // create our post
    res.send('welcome you are in secret route')
})


module.exports = router