const express = require('express') // importando o modulo express -  express é um framework para Node.js que facilita a criação de aplicativos
const cors = require('cors') // permite que meu servidor seja acessado por diferentes sites

require('dotenv').config() // Carrega variáveis de ambiente de um arquivo .env para process.env.
require('./models/db') // ao chamar esta linha, estou iniciando a conexão com meu banco de dados.

const User = require('./models/user') // Importa o modelo de usuário definido no arquivo user.js na pasta models.
const userRouter = require('./routes/route') // define as rotas (endpoints) relacionadas a usuários, como criação, atualização, exclusão, etc

const app = express() // Cria uma instância do express. está inicializando o aplicativo express, que será usado para configurar e iniciar o servidor web.

app.use(cors()) // Permite todas as origens
app.use(express.json()) // Diz ao aplicativo express para usar um middleware que transforma o corpo das requisições em JSON.

app.use(userRouter) // Diz ao aplicativo express para usar o roteador userRouter para lidar com requisições

const PORT = process.env.PORT || 8002 // Porta definida para 8002

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' })
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})
