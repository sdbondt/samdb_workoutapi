require('dotenv').config()
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const morgan = require('morgan')
const rateLimiter = require('express-rate-limit')
const connectToDb = require('./database/connectToDb')
const auth = require('./middleware/auth')

// import error handlers
const notFoundHandler = require('./errorHandlers/notFoundHandler')
const errorHandler = require('./errorHandlers/errorHandler')

// import routers
const authRouter = require('./routers/authRouter')
const exerciseRouter = require('./routers/exerciseRouter')
const userRouter = require('./routers/userRouter')

// create app & port
const app = express()
const PORT = process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())
app.use(helmet())
app.use(xss())
app.use(morgan('dev'))
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 100
}))

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/exercises', auth, exerciseRouter)
app.use('/api/v1/users', auth, userRouter)

// use error handlers
app.use(notFoundHandler)
app.use(errorHandler)

// connect to db
const start = async () => {
    try {
      await connectToDb(process.env.MONGO_URI)
      app.listen(PORT, () =>
        console.log(`Server is listening on port ${PORT}...`)
      );
    } catch (e) {
        console.log("Connection error.")
        console.log(e.message)
    }
}

start()