const cron = require('node-cron')
const chalk = require('chalk')
const config = require('../config')
const Storage = require('./storage')
const {FutureSongs,CurrentSongs} = require('../models/accpetedSubmissionModel')
const Submission = require('../models/submissionsModel')
const User = require('../models/userModel')

module.exports = class Cycle{

    static logProgress(msg){
        console.log(chalk.bgYellow.black(msg))
    }

    static start(){
        cron.schedule('0 0 * * sun',Cycle.chooseBell)
    }

    static findTopSub(subs=[]){
        let topSub = {votes:-1}

        subs.forEach(s => {
            if(s.votes > topSub.votes){
                topSub = s
            }
        })

        return topSub
    }
    
    static async chooseBell(){
        try{
            Cycle.logProgress('Replacing submission')
            
            //get the future songs and the submissions
            const fSongs = await FutureSongs.find({})
            const subs = await Submission.find({})
            await FutureSongs.deleteMany({})

            Cycle.logProgress('Choosing new bell')
            const topSub = Cycle.findTopSub(fSongs)
            Storage.updateSong(topSub.songData)
            Storage.updateDate()
            
            if(!config.repeatingSongs){
                await Submission.deleteMany({})
                await CurrentSongs.deleteMany({})
            }
            else{
                await CurrentSongs.updateMany({},{
                    votes:0,
                })
            }

            await CurrentSongs.insertMany(fSongs.map(i => ({
                title:i.title,
                link:i.link,
                owner:i.owner,
                ownerName:i.ownerName,
                songData:i.songData,
                votes:0
            })))

            //resets users' vote and submissions
            await User.updateMany({},{
                hasSubmited:false,
                votedFor:null,
            })
    
            
            Cycle.logProgress('Done!')
        }
        catch(e){
            console.log(e)
            Cycle.logProgress('ERROR')
        }
    }
}