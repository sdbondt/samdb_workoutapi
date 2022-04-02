require('dotenv').config()
const Exercise = require('../models/Exercise')
const User = require('../models/User')
const connectToDb = require('./connectToDb')

connectToDb(process.env.MONGO_URI)
const resetDb = async () => {
    try {
      await User.deleteMany({})
      await Exercise.deleteMany({})
      console.log('Data got deleted.')
    } catch (e) {
        console.log(e)
    }
}

module.exports = resetDb