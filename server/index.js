const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const cookieParser = require("cookie-parser");

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cookieParser());

//setup routes
app.use('/api/submit',require('./routes/submissions'))

//connects to mongo
mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Pelech-Bell-Votes-App",
}).then(() => console.log(chalk.bgGreen("connected to mongoose"))).catch(err => console.log(chalk.bgRed(err)));


//starts server
app.listen(process.env.SERVER_PORT,() => {
    console.log('Up and running on port ' + process.env.SERVER_PORT)
})