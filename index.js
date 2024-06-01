const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./models/db');

const User = require('./models/user');
const userRouter = require('./routes/route');

const app = express(); // Inicializando o express

app.use(cors()); // Permite todas as origens
app.use(express.json()); // Middleware para parsear JSON

app.use(userRouter);

const PORT = process.env.PORT || 8002; // Porta definida para 8002

app.get('/test', (req, res) => {
  res.send('Hello World!');
});

app.get('/', (req, res) => {
  res.json({ success: true, message: 'Welcome to backend zone!' });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
