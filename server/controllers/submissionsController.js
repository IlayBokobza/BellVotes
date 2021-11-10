const axios = require('axios').default
const Submission = require('../models/submissionsModel')
const {AcceptedSubmission} = require('../models/accpetedSubmissionModel')
const User = require('../models/userModel')
const Ban = require('../models/banRecord')
const dayjs = require('dayjs')
const {exec} = require('child_process')
const downloadSongPath = require('path').resolve(__dirname,'../scripts/downloadSong')

class SubmissionsController {
    static async post(req, res) {
        try {
            //if banned
            if (req.user.bannedUntil > Date.now()) {
                res.status(401).send(`${dayjs(req.user.bannedUntil).format('D/M/YYYY')} אתה חסום עד`)
                return
            }

            //if already submitted
            if (req.user.hasSubmited) {
                res.status(400).send('אתה כבר שלחת הצעה לסיבוב הזה')
                return
            }

            const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${req.body.videoId}&key=${process.env.YOUTUBE_API}`)
            const { title } = data.items[0].snippet

            const sub = new Submission({
                title,
                link: req.body.videoId,
                owner: req.user._id
            })

            await sub.save()

            req.user.hasSubmited = true
            await req.user.save()

            res.send()
        } catch (e) {
            console.log(e.response)
            res.status(500).send(e?.response?.data)
        }
    }

    static async get(req, res) {
        try {
            const data = await Submission.find({})
            res.send(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async getAccpeted(req, res) {
        try {
            const data = await AcceptedSubmission.find({})
            res.send(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async delete(req, res) {
        try {
            const id = req.params.id
            await Submission.findByIdAndDelete(id)

            res.send()
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async put(req, res) {
        try {
            exec(`node ${downloadSongPath} ${req.params.id} "${req.body.name}" ${req.body.time}`,(error, stdout, stderr) => {
                console.log(error, stdout, stderr)
            })

            res.send()
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async ban(req, res) {
        try {
            const id = req.params.id
            const sub = await Submission.findByIdAndDelete(id)
            const owner = await User.findById(sub.owner)
            const bannedUntilDate = dayjs().add(30, 'day')
            owner.bannedUntil = bannedUntilDate

            await owner.save()

            //create ban record
            const ban = new Ban({
                admin: req.user.name,
                userName: owner.name,
                userEmail: owner.email,
                date: dayjs().format('D/M/YYYY'),
                bannedUntil: dayjs(bannedUntilDate).format('D/M/YYYY')
            })

            await ban.save()

            res.send()
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async getBans(req, res) {
        try {
            const data = await Ban.find({})
            res.send(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async vote(req,res){
        try {
            const id = req.params.id
            
            if(req.user.votedFor){

                if(req.user.votedFor == id){
                    res.status(400).send('Already voted for that song.')
                    return
                }

                const oldSub = await AcceptedSubmission.findById(req.user.votedFor)

                if(oldSub){
                    oldSub.votes--
                    await oldSub.save()
                }
            }

            req.user.votedFor = id
            const sub = await AcceptedSubmission.findById(id)
            sub.votes++

            await req.user.save()
            await sub.save()

            res.send()
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }

    static async getMyVote(req,res){
        try {
            res.send(req.user.votedFor)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
}

module.exports = SubmissionsController