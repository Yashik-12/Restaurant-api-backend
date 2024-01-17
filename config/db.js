const mongoose = require('mongoose')
require('colors')

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log(`Connected to database ${mongoose.connection.host}`.bgCyan)
    } catch (error) {
        console.log('DB Error', error, colors.bgRed)
    }
}

module.exports = connectDb;