const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    
    fullname: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: Buffer, // tipo especial de dados que podemos armazenar

})

userSchema.statics.isThisEmailInUse = async function(email) {

    if(!email) throw new Error('Invalid Email')

    try {
        const user = await this.findOne({email})
    if(user) return false

    return true

    } catch (error) {
        console.log('error inside isThisEmailInUse method', error.message)
        return false
    }
}

module.exports = mongoose.model('user', userSchema)