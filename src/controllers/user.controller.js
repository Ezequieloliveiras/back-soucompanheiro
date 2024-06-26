const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const sharp = require('sharp')
const cloudinary = require('../helper/imageUpload')

exports.createUser = async (req, res) => {
  try {

    const { fullname, email, password, option } = req.body
    const isNewuser = await User.isThisEmailInUse(email)

    if (!isNewuser) return res.json({
      success: false,
      message: 'Este e-mail já está em uso, tente fazer login'
    })

    const user = await User({
      fullname,
      email,
      password,
      option
    })
    await user.save(user)
    res.json({
      success: true,
      message: 'Conta criada com sucesso!',
      user
    })
    console.log(user.res + 'user')

  } catch (error) {

  }
}

exports.userSignIn = async (req, res) => {
  console.log('userSignIn')
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


  let oldTokens = user.tokens || [] // verificando se existe token

  if (oldTokens.length) { //se existir usaremos esse filtro
    oldTokens = oldTokens.filter(t => {
      const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000
      if (timeDiff < 86400) { // 24h em segundos
        return t
      }
    })
  }

  await User.findByIdAndUpdate(user._id, { tokens: [...oldTokens, { token, signedAt: Date.now().toString() }] })


  const userInfo = {
    fullname: user.fullname,
    email: user.email,
    avatar: user.avatar ? user.avatar : '',
  }


  res.json({ success: true, user: userInfo, token }) // enviando para o frontend
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

    await User.findByIdAndUpdate(user._id, { avatar: result.url })
    return res.status(201).json({ success: true, message: 'Sua foto de perfil foi atualizada' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor, tente depois de algum tempo' })
    console.log('Erro ao carregar o arquivo de imagem', error.message)
  }


}

exports.signOut = async (req, res) => {
  try {
    // return res.json({ success: true, message: 'Sign out successfully!' })
    //console.log(req.headers)
    if (req.headers && req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      console.log(token)
      if (!token) {
        return res.status(401).json({ success: false, message: 'Autorização falhou!' })
      }

      console.log(req.user)
      const tokens = req.user.tokens

      const newTokens = tokens.filter(t => t.token !== token)

      console.log(newTokens)
      await User.findByIdAndUpdate(req.user._id, { tokens: newTokens })
      res.json({ success: true, message: 'Sign out successfully!' })
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro no servidor, tente depois de algum tempo' })
  }
}

exports.listUsers = async (req, res) => {

  try {
    const users = await User.find({}, 'fullname email avatar')
    res.json({
      success: true,
      user: users
    })


  } catch (error) {
    console.log(error)
    res.status(500).json({
      succes: false,
      message: 'Erro ao buscar usuários',
      error: error.message
    })
  }
}

exports.associateStateCity = async (req, res) => {
  console.log('post')
  try {
    const { userId, estado, cidade } = req.body;
    console.log(estado)
    console.log(cidade)
    console.log(userId)

    const updatedUser = await User.findByIdAndUpdate(
      { _id: userId },
      { estado, cidade },
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
}