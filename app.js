require('dotenv').config()
const cron = require('node-cron');
const express = require('express');
const bodyParser = require('body-parser');
const { validationHeader } = require('./src/middlewares/validate');
const { isAuth } = require('./src/middlewares/auth');

require('./src/config/database')()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(validationHeader);

// ROUTES
const userRoutes = require('./src/routes/user.routes')
app.use('/api/users', userRoutes)

const jobRoutes = require('./src/routes/job.routes')
app.use('/api/jobs', isAuth, jobRoutes)

//catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    message: "No such route exists"
  })
})

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({
    message: "Error Message"
  })
})

const PORT = process.env.PORT || 8002
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`)
})