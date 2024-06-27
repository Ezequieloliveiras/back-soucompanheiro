const express = require('express')
const router = express.Router() // O router é como um organizador que ajuda a definir e gerenciar as diferentes "páginas" ou "ações" que o servidor pode responder.
const userController = require('../controllers/user.controller') //São ações que seu servidor pode realizar, como criar um usuário ou fazer login.
const { validateUserSingUp, userValidation, validateUserSingIn } = require('../middlewares/validation/user') // São funções que processam a requisição antes de chegar na função final. Eles validam dados ou verificam permissões.
const { isAuth } = require('../middlewares/auth');


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

router.get('/', isAuth, userController.listUsers)
router.post('/create-user', validateUserSingUp, userValidation, userController.createUser)

router.post('/sign-in', validateUserSingIn, userValidation, userController.userSignIn)
router.post('/upload-profile', isAuth, uploads.single('profile'), userController.uploadProfile)
router.get('/sign-out', isAuth, userController.signOut)
router.post('/users/associate-state-city', isAuth, userController.associateStateCity)
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

module.exports = router