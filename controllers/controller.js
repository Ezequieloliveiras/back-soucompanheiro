const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.createUser = async (req, res) => {

  const { fullname, email, password } = req.body
  const isNewuser = await User.isThisEmailInUse(email)

  if (!isNewuser) return res.json({
    success: false,
    message: 'Este e-mail já está em uso, tente fazer login'
  })

  const user = await User({
    fullname,
    email,
    password,
  })
  await user.save(user)
  res.json({
    success: true,
    message: 'Conta criada com sucesso!',
    user
  })

}

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (!user)
    return res.json({
      success: false,
      message: 'usuário não encontrado, com o email fornecido!'
    })

  const isMatch = await user.comparePassword(password)
  if (!isMatch)
    return res.json({
      success: false,
      message: 'e-mail/senha não coincide!'
    })

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {expiresIn: '1d'})

  res.json({ success: true, user: user, token })
}