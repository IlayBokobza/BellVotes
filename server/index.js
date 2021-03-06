const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const path = require('path')
const cookieParser = require("cookie-parser");
const Cycle = require('./services/cycle')

require('dotenv').config()
if(!process.env.MAX_SONGS) process.env.MAX_SONGS = 10;

const app = express()
app.use(express.json())
app.use(cookieParser());

//setup routes
app.use('/api/submit',require('./routes/submissions'))
app.use('/api/auth',require('./routes/auth'))
app.use('/api/storage',require('./routes/storage'))

//Start cycle
Cycle.start()

//hosts app
app.use(express.static(path.resolve(__dirname,'./dist')))
app.get(/.*/,(req,res) => {
    res.sendFile(path.resolve(__dirname,'./dist/index.html'))
})

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