const express = require('express')
const mongoose = require('mongoose')
const chalk = require('chalk')
const path = require('path')
const cookieParser = require("cookie-parser");
const Cycle = require('./services/cycle')
const config = require('./config')

if(!config.maxSongs) config.maxSongs = 10;

const app = express()
app.use(express.json())
app.use(cookieParser());

//setup routes
app.use('/api/submit',require('./routes/submissions'))
app.use('/api/bans',require('./routes/bans'))
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
mongoose.connect(config.external.mongoPath,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Pelech-Bell-Votes-App",
}).then(() => console.log(chalk.bgGreen("connected to mongoose"))).catch(err => console.log(chalk.bgRed(err)));


//starts server
app.listen(config.port,() => {
    console.log('Up and running on port ' + config.port)
})