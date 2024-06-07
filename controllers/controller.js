const jwt = require('jsonwebtoken')
const User = require('../models/user')
const sharp = require('sharp')
const cloudinary = require('../helper/imageUpload')

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

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })

  res.json({ success: true, user: user, token })
}

exports.uploadProfile = async (req, res) => {
  const { user } = req
  if (!user) return res
  .status(401)
  .json({ success: false, message: 'Acesso não autorizado!' })
try {
  
  const result = await cloudinary.uploader.upload(req.file.path, {
     public_id: `${user._id}_profile`,
     width: 500,
     height: 500,
     crop: 'fill'
   })
  console.log(result)
} catch (error) {
  console.log("erro", error.message)
}


  // try {
  //   const profileBuffer = req.file.buffer
  //   const { width, height } = await sharp(profileBuffer).metadata()
  //   const avatar = await sharp(profileBuffer).resize(Math.round(width * 0.5), Math.round(height * 0.5)).toBuffer()

  //   await User.findByIdAndUpdate(user._id, { avatar })
  //   return res.status(201).json({ success: true, message: 'Sua foto de perfil foi atualizada' })
  // } catch (error) {
  //   res.status(500).json({ success: false, message: 'Erro no servidor, tente depois de algum tempo' })
  //   console.log('Erro ao carregar o arquivo de imagem', error.message)
  // }


}