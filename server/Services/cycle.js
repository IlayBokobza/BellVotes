const schedule = require('node-schedule')
const chalk = require('chalk')
const Storage = require('./storage')
const {FutureSubmission,AcceptedSubmission} = require('../models/accpetedSubmissionModel')
const Submission = require('../models/submissionsModel')
const User = require('../models/userModel')

module.exports = class Cycle{

    static logProgress(msg){
        console.log(chalk.bgYellow.black(msg))
    }

    static start(){
        const rule = new schedule.RecurrenceRule()
        rule.second = 0
        rule.hour = 0
        rule.dayOfWeek = [0]
    
        schedule.scheduleJob(rule,Cycle.chooseBell)
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
            //gets and delete all future subs
            const fsubs = await FutureSubmission.find({})
            await FutureSubmission.deleteMany({})
            await Submission.deleteMany({})
            
            //gets all current subs and replaces with new ones
            const subs = await AcceptedSubmission.find({})
            await AcceptedSubmission.deleteMany({})
            await AcceptedSubmission.insertMany(fsubs.map(i => {return {
                title:i.title,
                link:i.link,
                owner:i.owner,
                ownerName:i.ownerName,
                songData:i.songData,
                votes:0
            }}))
    
            //updates user's data
            await User.updateMany({},{votedFor:null,hasSubmited:null})
            
            Cycle.logProgress('Choosing new bell')
            const topSub = Cycle.findTopSub(fsubs)

            if(!topSub._id){
                Cycle.logProgress('No top song')
                return
            }

            //updates song in storage
            Cycle.logProgress('Updating song')
            Storage.updateSong(topSub.songData)
        }
        catch(e){
            console.log(e)
            Cycle.logProgress('ERROR')
        }
    }
}