const Cycle = require('./Services/cycle')
const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Pelech-Bell-Votes-App",
}).then(() => {
    console.log(chalk.bgGreen("connected to mongoose"))
    Cycle.chooseBell().then(() => {
        process.exit()
    })
}).catch(err => console.log(chalk.bgRed(err)));