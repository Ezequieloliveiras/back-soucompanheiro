const mongoose = require('mongoose') // facilita a interação com bancos de dados MongoDB.

const bcrypt = require('bcrypt')

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
    avatar: String, // para armazenar a imagem do avatar do usuário como dados binários (Buffer).

})

// Middleware de Pré-Save para Criptografar Senhas

userSchema.pre('save', function(next) { // Um middleware que executa antes de salvar o documento no banco de dados.
    if(this.isModified('password')){ // isModified('password'): Verifica se a senha foi modificada.
        bcrypt.hash(this.password, 8, (err, hash) => { // bcrypt.hash(this.password, 8, ...): Criptografa a senha com um custo de processamento 8.
            if(err) return next(err)

                this.password = hash
                next() // Continua o processo de salvamento depois de criptografar a senha.
        })
    }
})

// Método para Comparar Senhas
userSchema.methods.comparePassword = async function(password) { // comparePassword: Um método do esquema de usuário para verificar se a senha fornecida corresponde à senha armazenada.
    if(!password) throw new Error('Password is mission, can not compare!')

        try {
            const result = await bcrypt.compare(password, this.password) // bcrypt.compare(password, this.password): Compara a senha fornecida com a senha criptografada.
            return result
        } catch (error) {
            console.log('Erro while comparing password!', error.message)
        }
}

// Método Estático para Verificar se o E-mail Já Está em Uso
userSchema.statics.isThisEmailInUse = async function(email) { // isThisEmailInUse: Um método estático do esquema de usuário para verificar a existência de um e-mail.

    if(!email) throw new Error('Invalid Email')

    try {
        const user = await this.findOne({email}) // findOne({ email }): Busca um usuário com o e-mail fornecido no banco de dados
    if(user) return false

    return true

    } catch (error) {
        console.log('error inside isThisEmailInUse method', error.message)
        return false
    }
}

// Exportando o Modelo de Usuário
module.exports = mongoose.model('user', userSchema)