const express = require('express')

require('dotenv').config()
require('./models/db')

const User = require('./models/user')
const userRouter = require('./routes/route')

const app = express() // invocando o express


// app.use((req, res, next) => {
//   req.on('data', (chunk) => {
//     const data = JSON.parse(chunk)
//     req.body = data
//     next()
//   })
// })

app.use(express.json()) // middleware
app.use(userRouter)

// const test = async (email, password) => {
//   const user = await User.findOne({email: email})
//  const result = await user.comparePassword(password)
//  console.log(result)
// }

// test('niraj@email.com', 'niraj134')


app.get('/test', (req, res) => {
  res.send('Hello Wolrd!')
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(8000, () => {
  console.log('port is listening')
})


// node app.js para salvar

//mongodb+srv://quielonliner:<password>@cluster0.ldlzx6g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0