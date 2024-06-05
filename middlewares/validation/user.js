const { check, validationResult } = require('express-validator') // check: Função usada para definir as validações nos campos específicos.
// validationResult: Função usada para extrair os resultados das validações.

// method chaining

exports.validateUserSingUp = [
    check('fullname') // Valida o campo fullname
        .trim() // Remove espaços em branco no início e no fim.
        .not() // Verifica se o campo não está vazio.
        .isEmpty()
        .withMessage('O nome é obrigatório!')
        .isString() // Verifica se o valor é uma string.
        .withMessage('Deve ser um nome válido!')
        .isLength({ min: 3, max: 20 }).
        withMessage('O nome deve ter de 3 a 20 caracteres!'),
    check('email')
        .normalizeEmail() // Normaliza o endereço de e-mail (removendo espaços e caracteres especiais).
        .isEmail() // Verifica se o valor é um e-mail válido.
        .withMessage('E-mail inválido!'),
    check('password') // Valida o campo password
        .trim() // Remove espaços em branco.
        .not() // Verifica se o campo não está vazio.
        .isEmpty()
        .withMessage('O campo senha está vazia!')
        .isLength({ min: 8, max: 20 }).
        withMessage(' A senha deve ter de 8 a 20 caracteres'),
    check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => { // Validação customizada para verificar se confirmPassword é igual a password.
            if (value !== req.body.password) {
                throw new Error('Ambas as senhas devem ser iguais!')
            }
            return true
        })
]

exports.userValidation = (req, res, next) => {
    const result = validationResult(req).array() // Obtém os erros de validação em forma de array.
    if (!result.length) return next() // Se não houver erros, continua para o próximo middleware.

    const error = result[0].msg // Obtém a mensagem do primeiro erro.
    res.json({ success: false, message: error }) // Responde com um JSON contendo a mensagem de erro.
}

exports.validateUserSingIn = [

    check('email').trim().isEmail().withMessage('e-mail/senha é obrigatório!'),

    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('e-mail/senha é obrigatório!')
]