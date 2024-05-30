const { check, validationResult, ExpressValidator } = require('express-validator')

exports.validateUserSingUp = [
    check('fullname')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Name is required!')
        .not()
        .isString()
        .withMessage('Must be a valid name!')
        .isLength({ min: 3, max: 20 }).
        withMessage('Name must be within 3 to 20 character'),
    check('email')
        .normalizeEmail()
        .isEmail().withMessage('Invalid email!'),
    check('password')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Password is empty!')
        .isLength({ min: 8, max: 20 }).
        withMessage('Password must be within 8 to 20 characters long'),
    check('confirmPassword')
        .trim()
        .not()
        .isEmpty()
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Both password must be same!')
            }
            return true
        })
]

exports.userValidation = (req,res, next) => {
   const result = validationResult(req).array()
    if(!result.length) return next()

        const error = result[0].msg
        res.json({success: false, message: error})
}