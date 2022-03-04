const express = require('express')
const englishRouter = require('./Routers/englishRouter')
const cors = require('cors')
const { urlencoded } = require('express')

const app = express()

app.use(cors({}))
app.use(express.json())
app.use(urlencoded({ extended: false }))

app.use('/api', englishRouter)

// Handle production
if (process.env.NODE_ENV === 'production') {
  // Static folder
  app.use(express.static(__dirname + '/public/'))
  // Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

app.all('*', (req, res, next) => {
  next(new createError(404, `Cant find ${req.originUrl} on this server!`))
})

app.use((error, req, res, next) => {
  // Установка кода состояния ответа\
  console.log('Error handle by bus : ', error.statusCode, error.message)
  error.message = error.message || 'Something wrong!'
  error.statusCode = error.statusCode || 500

  // Отправка ответа
  return res.status(error.statusCode).json({
    statusCode: error.statusCode,
    message: error.message,
  })
})

module.exports = app
