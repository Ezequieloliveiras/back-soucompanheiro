const express = require('express')
const router = express.Router() // O router é como um organizador que ajuda a definir e gerenciar as diferentes "páginas" ou "ações" que o servidor pode responder.

const { createUser, userSignIn } = require('../controllers/controller') //São ações que seu servidor pode realizar, como criar um usuário ou fazer login.
const { validateUserSingUp, userValidation, validateUserSingIn } = require('../middlewares/validation/user') // São funções que processam a requisição antes de chegar na função final. Eles validam dados ou verificam permissões.
const { isAuth } = require('../middlewares/auth') // É um middleware que verifica se o usuário está autenticado (logado) antes de permitir certas ações.

router.post('/create-user', validateUserSingUp, userValidation, createUser) // Valida os dados do usuário com validateUserSingUp e userValidation. Cria o usuário usando a função createUser.
router.post('/sign-in', validateUserSingIn, userValidation, userSignIn) // Valida os dados de login com validateUserSingIn e userValidation. Realiza o login usando a função userSignIn

router.get('/list-users',  userSignIn) //  lista o usuario
router.post('/create-post', isAuth, (req, res) => { // Verifica se o usuário está autenticado com isAuth.
    
    // create our post
    res.send('welcome you are in secret route')
})


module.exports = router