const express = require('express')
const i18n = require("i18n");
const path = require('path')
require('colors')
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()
const app = express()
const PORT = process.env.PORT || 8080
const testRoute = require('./routes/testRoutes')
const authRoute = require('./routes/authRoutes')
const userRoute = require('./routes/userRoutes')
const restuarantRoute = require('./routes/restaurantRoute')
const connectDb = require('./config/db');

// DB Connection
connectDb()

// MIDDLEWARE
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))

i18n.configure({
    locales: ["en"],
    directory: path.join(__dirname, "/locales"),
    defaultLocale: "en",
    register: global,
});
app.use(i18n.init);

// Route
app.use('/api/v1/test', testRoute)
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/restaurant', restuarantRoute)


app.get('/', (req, res) => {
    return res.status(200).send({ message: 'Welcome to restuarant' })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`.bgMagenta)
})

