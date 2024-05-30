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