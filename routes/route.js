const express = require('express')
const router = express.Router() // O router é como um organizador que ajuda a definir e gerenciar as diferentes "páginas" ou "ações" que o servidor pode responder.
const User = require('../models/user')

const { createUser, userSignIn, uploadProfile, signOut, listUsers } = require('../controllers/controller') //São ações que seu servidor pode realizar, como criar um usuário ou fazer login.
const { validateUserSingUp, userValidation, validateUserSingIn } = require('../middlewares/validation/user') // São funções que processam a requisição antes de chegar na função final. Eles validam dados ou verificam permissões.
const { isAuth } = require('../middlewares/auth') // É um middleware que verifica se o usuário está autenticado (logado) antes de permitir certas ações.


const multer = require('multer')
const storage = multer.diskStorage({})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) { // verifica se o arquivo é um arquivo de imagem
        cb(null, true)
    } else {
        cb('Arquivo de imagem inválida!')
    }
}


const uploads = multer({ storage, fileFilter })

router.get('/list-users', listUsers) //  lista o usuario
router.post('/create-user', validateUserSingUp, userValidation, createUser) // Valida os dados do usuário com validateUserSingUp e userValidation. Cria o usuário usando a função createUser.
router.post('/sign-in', validateUserSingIn, userValidation, userSignIn) // Valida os dados de login com validateUserSingIn e userValidation. Realiza o login usando a função userSignIn
router.post('/upload-profile', isAuth, uploads.single('profile'), uploadProfile)// Verifica se o usuário está autenticado com isAuth.
router.get('/sign-out', isAuth, signOut)
router.get('/profile', isAuth, (req, res) => {
    if (!req.user)
        return res.json({ success: false, message: 'unauthorized access!' })
    res.json({
        success: true,
        profile: {
            fullname: req.user.fullname,
            email: req.user.email,
            avatar: req.user.avatar ? req.user.avatar : '',
        }
    })
})

router.post('/users/associate-state-city', async (req, res) => {

    console.log('post')
    try {
        const { userId, estado, cidade } = req.body;
        console.log(estado)
        console.log(cidade)
        console.log(userId)

        const updatedUser = await User.findByIdAndUpdate(
            { _id: userId },
            { estado, cidade},
            { new: true } // Retorna o documento atualizado
        );

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: 'Usuário não encontrado.' });
        }

        res.status(200).json({ success: true, message: 'Estado e cidade associados com sucesso!' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Erro ao associar estado e cidade.' });
    }
});

module.exports = router