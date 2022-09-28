//this script turns a submission into a future song
const mongoose = require('mongoose')
const { FutureSongs } = require('../models/accpetedSubmissionModel')
const Submission = require('../models/submissionsModel')
const User = require('../models/userModel')
const ProccessVideo = require('../services/proccessVideo')
require('dotenv').config()

mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "Pelech-Bell-Votes-App",}
).then(async () => {
    try{
        const id = process.argv[2]
        const name = process.argv[3]
        const time = process.argv[4]
        const sub = await Submission.findById(id)
        const owner = await User.findById(sub.owner)
        
        
        const song = new ProccessVideo(sub.link, time)
        const songData = await song.downloadBell()
        
        const subData = {
            title: name,
            link: sub.link,
            owner: sub.owner,
            ownerName: owner.name ,
            songData,
        }
        
        ProccessVideo.logProgress('Saving submission')
        const accpetedSub = new FutureSongs(subData)
        await accpetedSub.save()
        await sub.delete()
        ProccessVideo.logProgress('Done')
        mongoose.disconnect()
    }
    catch(e){
        console.log(e)
        mongoose.disconnect()
        process.exit()
    }
})