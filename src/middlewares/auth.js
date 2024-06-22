const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

exports.isAuth = async (req, res, next) => { // Está exportando a função isAuth para ser usada em outras partes da aplicação.

    if(req.headers && req.headers.authorization) { // Verifica se o cabeçalho da requisição (req.headers) e o cabeçalho de autorização (req.headers.authorization) existem.
   

        try {
            const token = req.headers.authorization.split(' ')[1] // const token = req.headers.authorization.split(' ')[1]: O token JWT é extraído do cabeçalho de autorização
           // O cabeçalho de autorização geralmente tem o formato Bearer <token>, por isso usamos split(' ')[1] para obter o token.
            
            const decode = jwt.verify(token, process.env.JWT_SECRET) //  O token é verificado usando a chave secreta (process.env.JWT_SECRET), que deve estar armazenada nas variáveis de ambiente.
            
            const user = await User.findById(decode.userId) // Busca o usuário no banco de dados usando o userId decodificado do token.
            if(!user) {
             return res.json({success: false, message: 'unauthorized access!'}) // Se o usuário não for encontrado, responde com uma mensagem de acesso não autorizado.
            }
            req.user = user // Se o usuário for encontrado, ele é anexado ao objeto req para que possa ser acessado em outras partes da aplicação.
            next() // Chama a próxima função na cadeia de middlewares.
        } catch (error) {
            if(error.name === 'JsonWebTokenError') {
                return res.json({success: false, message: 'unauthorized access!'}) // Se o token for inválido, responde com uma mensagem de acesso não autorizado.
            }
            if(error.name === 'TokenExpiredError') { // Se o token expirou, responde com uma mensagem de sessão expirada.
                return res.json({success: false, message: 'sesson expired try sig in!'})
            }

            res.json({success: false, message: 'Internal server error!'})
        }

  
    } else {
        res.json({success: false, message: 'unauthorized access!'})
    }
    
}