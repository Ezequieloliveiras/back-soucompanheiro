const express = require('express') // importando o modulo express -  express é um framework para Node.js que facilita a criação de aplicativos
const cors = require('cors') // permite que meu servidor seja acessado por diferentes sites

require('dotenv').config() // Carrega variáveis de ambiente de um arquivo .env para process.env.
require('./models/db') // ao chamar esta linha, estou iniciando a conexão com meu banco de dados.

const User = require('./models/user') // Importa o modelo de usuário definido no arquivo user.js na pasta models.
const userRouter = require('./routes/route') // define as rotas (endpoints) relacionadas a usuários, como criação, atualização, exclusão, etc

const app = express() // Cria uma instância do express. está inicializando o aplicativo express, que será usado para configurar e iniciar o servidor web.


const allowedOrigins = [
  'https://auraeventos.netlify.app',
  'https://like-api-restfull.onrender.com',
  'http://localhost:8000',
  'http://127.0.0.1:8000',
  'http://192.168.0.4:8000',
  ]


app.use(cors({
  origin: function(origin, callback) {
    let allowed = true

    if(!origin) allowed = true // aplicativo de celular

    if(!allowedOrigins.includes(origin)) allowed = false

    callback(null, allowed)
  }
})) // Permite todas as origens
app.use(express.json()) // Diz ao aplicativo express para usar um middleware que transforma o corpo das requisições em JSON.

app.use(userRouter) // Diz ao aplicativo express para usar o roteador userRouter para lidar com requisições


app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' })
})



const PORT = process.env.PORT || 8002 // Porta definida para 8002

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
