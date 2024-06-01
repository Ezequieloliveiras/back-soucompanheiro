const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.isAuth = async (req, res, next) => {

    if(req.headers && req.headers.authorization) {
   

        try {
            const token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            
            const user = await User.findById(decode.userId)
            if(!user) {
             return res.json({success: false, message: 'unauthorized access!'})
            }
            req.user = user
            next()
        } catch (error) {
            if(error.name === 'JsonWebTokenError') {
                return res.json({success: false, message: 'unauthorized access!'})
            }
            if(error.name === 'TokenExpiredError') {
                return res.json({success: false, message: 'sesson expired try sig in!'})
            }

            res.json({success: false, message: 'Internal server error!'})
        }

  
    } else {
        res.json({success: false, message: 'unauthorized access!'})
    }
    
}