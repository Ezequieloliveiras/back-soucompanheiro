const { check, validationResult, ExpressValidator } = require('express-validator')

exports.validateUserSingUp = [
    check('fullname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('O nome é obrigatório!')
        .isString()
        .withMessage('Deve ser um nome válido!')
        .isLength({ min: 3, max: 20 }).
        withMessage('O nome deve ter de 3 a 20 caracteres!'),
    check('email')
        .normalizeEmail()
        .isEmail().withMessage('E-mail inválido!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('O campo senha está vazia!')
        .isLength({ min: 8, max: 20 }).
        withMessage(' A senha deve ter de 8 a 20 caracteres'),
    check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Ambas as senhas devem ser iguais!')
            }
            return true
        })
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array()
    if (!result.length) return next()

    const error = result[0].msg
    res.json({ success: false, message: error })
}

exports.validateUserSingIn = [

    check('email').trim().isEmail().withMessage('e-mail/senha é obrigatório!'),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('e-mail/senha é obrigatório!')
]