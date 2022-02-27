const server = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const port = process.env.PORT || 3000
const uri = process.env.URI

const start = async () => {
  try {
    await mongoose.connect(uri)
    server.listen(port, () => console.log(`Server was running on port ${port}`))
  }
  catch (err) {
    console.log('Some error: ', err)
  }
}

start()