const mongoose = require('mongoose')
const chalk = require('chalk')
const {FutureSubmission,AcceptedSubmission} = require('../models/accpetedSubmissionModel')

mongoose.connect('mongodb://localhost:27017',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Pelech-Bell-Votes-App",
}).then(async () => {
    console.log(chalk.bgGreen("connected to mongoose"))

    //addes all future submissions now
    const fsubs = await FutureSubmission.find({})
    await FutureSubmission.deleteMany({})
    await AcceptedSubmission.insertMany(fsubs.map(i => {return {
        title:i.title,
        link:i.link,
        owner:i.owner,
        ownerName:i.ownerName,
        songData:i.songData,
        votes:0
    }}))

    console.log('Done!')
    process.exit()
}).catch(err => console.log(chalk.bgRed(err)));