const User = require('../models/user')

exports.createUser = async (req, res) => {
  
        const {fullname, email, password} = req.body
        const isNewuser = await User.isThisEmailInUse(email)
      
        if(!isNewuser) return res.json({
          success: false,
          message: 'This email is already in use, try sign-in'
        })
        const user = await User({
          fullname,
          email,
          password,
        })
        await user.save(user)
        res.json(user)
    
}

exports.userSignIn = async (req, res) => {
  const {email, password} = req.body
  const user = await User.findOne({email})

  if(!user) return res.json({success: false, message: 'user not found, with the give email!'})

   const isMatch =  await user.comparePassword(password)
   if(!isMatch) return res.json({success: false, message: 'email / password does not match!'})

    res.json({success: true, user: user})
}