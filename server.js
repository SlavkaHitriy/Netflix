// Put a process environment config
require('dotenv').config({path: './config.env'})

const express = require('express')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')
const authMiddleware = require('./middleware/cors.middleware')

// Connecting DB
connectDB()

const app = express()

// Middleware to use a body from request
app.use(express.json())

app.use(authMiddleware)

app.use('/auth', require('./routes/auth'))
app.use('/private', require('./routes/private'))

app.use(errorHandler)

const PORT = process.env.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})