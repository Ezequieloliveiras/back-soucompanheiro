const express = require('express')
const router = express.Router() // O router é como um organizador que ajuda a definir e gerenciar as diferentes "páginas" ou "ações" que o servidor pode responder.

const { createUser, userSignIn } = require('../controllers/controller') //São ações que seu servidor pode realizar, como criar um usuário ou fazer login.
const { validateUserSingUp, userValidation, validateUserSingIn } = require('../middlewares/validation/user') // São funções que processam a requisição antes de chegar na função final. Eles validam dados ou verificam permissões.
const { isAuth } = require('../middlewares/auth') // É um middleware que verifica se o usuário está autenticado (logado) antes de permitir certas ações.

const User = require('../models/user')

const multer = require('multer')
const sharp = require('sharp')
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) { // verifica se o arquivo é um arquivo de imagem
        cb(null, true)
    } else {
        cb('Arquivo de imagem inválida!')
    }
}


const uploads = multer({ storage, fileFilter })

router.get('/list-users', userSignIn) //  lista o usuario
router.post('/create-user', validateUserSingUp, userValidation, createUser) // Valida os dados do usuário com validateUserSingUp e userValidation. Cria o usuário usando a função createUser.
router.post('/sign-in', validateUserSingIn, userValidation, userSignIn) // Valida os dados de login com validateUserSingIn e userValidation. Realiza o login usando a função userSignIn
router.post('/upload-profile', isAuth, uploads.single('profile'), async (req, res) => { // Verifica se o usuário está autenticado com isAuth.

    const { user } = req
    if (!user) return res.status(401).json({ success: false, message: 'Acesso não autorizado!' })

    try {
        const profileBuffer = req.file.buffer
        const { width, height } = await sharp(profileBuffer).metadata()
        const avatar = await sharp(profileBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5)).toBuffer()

        await User.findByIdAndUpdate(user._id, { avatar })
        return res.status(201).json({success: true, message: 'Sua foto de perfil foi atualizada'})
    } catch (error) {
        res.status(500).json({success: false, message: 'Erro no servidor, tente depois de algum tempo'})
    console.log('Erro ao carregar o arquivo de imagem', error.message)
    }

})


module.exports = router