const axios = require('axios').default
const Submission = require('../models/submissionsModel')
const AcceptedSubmission = require('../models/accpetedSubmission')
const User = require('../models/userModel')
const dayjs = require('dayjs')
const getSong = require('../Services/getSong')
const chalk = require('chalk')

class submissionsController{
    static async post(req,res){
        try{
            //if banned
            if(req.user.bannedUntil > Date.now()){
                res.status(401).send(`${dayjs(req.user.bannedUntil).format('D/M/YYYY')} אתה חסום עד`)
                return
            }

            //if already submitted
            if(req.user.hasSubmited){
                res.status(400).send('אתה כבר שלחת הצעה לסיבוב הזה')
                return
            }

            const {data} = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${req.body.videoId}&key=${process.env.YOUTUBE_API}`)
            const {title/*,categoryId*/} = data.items[0].snippet

            // //checks if video is a music one
            // if(categoryId != "10"){
            //     res.status(400).send('הסרטון הוא לא שיר')
            //     return
            // }

            //check if title has hebrew in it
            if(!/(ק|ץ|ף|ר|א|ט|ו|ו|ן|ם|פ|ש|ג|ג|כ|ע|י|ח|ל|ך|ז|ס|ב|ה|נ|מ|צ|ד|ת)/.test(title)){
                res.status(400).send('השיר לא בעברית')
                return
            }

            const sub = new Submission({
                title,
                link:req.body.videoId,
                owner:req.user._id
            })

            await sub.save()

            req.user.hasSubmited = true
            await req.user.save()

            res.send()
        }
        catch(e){
            console.log(e)
            res.status(500).send(e?.response?.data)
        }
    }

    static async get(req,res){
        try {
            const data = await Submission.find({})
            res.send(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async delete(req,res){
        try {
            const id = req.params.id
            await Submission.findByIdAndDelete(id)

            res.send()
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async put(req,res){
        try {
            if(await AcceptedSubmission.count() >= parseInt(process.env.MAX_SONGS)){
                res.status(400).send(`כבר אושרו מספר השירים המקסימלי של ${parseInt(process.env.MAX_SONGS)} שירים`)
                return
            }

            const id = req.params.id
            let sub = await Submission.findByIdAndDelete(id)
            const owner = await User.findById(sub.owner)

            console.log(chalk.bgCyan(`Song "${sub.title}" with the id of ${sub._id} has been accpeted.`))

            sub = {
                title:sub.title,
                link:sub.link,
                owner:sub.owner,
                ownerName:owner.name,
                songData:await getSong(sub.link,req.body.time)
            }

            const accpetedSub = new AcceptedSubmission(sub)
            await accpetedSub.save()

            res.send()
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async ban(req,res){
        try {
            const id = req.params.id
            const sub = await Submission.findByIdAndDelete(id)
            const owner = await User.findById(sub.owner)
            owner.bannedUntil = dayjs().add(30,'day')

            await owner.save()
            res.send()
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
}

module.exports = submissionsController