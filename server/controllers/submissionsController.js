const axios = require('axios').default
const Submission = require('../models/submissionsModel')
const {CurrentSongs} = require('../models/accpetedSubmissionModel')
const dayjs = require('dayjs')
const {exec} = require('child_process')
const ProccessVideo = require('../services/proccessVideo')
const Auth = require('../services/auth')
const config = require('../config')
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
            if (req.user.hasSubmited && !Auth.isAdminEmail(req.user.email)) {
                res.status(400).send('אתה כבר שלחת הצעה לסיבוב הזה')
                return
            }

            const { data } = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${req.body.videoId}&key=${config.external.youtubeApiKey}`)
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
            const data = await CurrentSongs.find({})
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

    //accecpting a submittion
    static async put(req, res) {
        try {
            ProccessVideo.logProgress(`Song "${req.body.name}" with the id of ${req.params.id} has been accpeted.`)

            exec(`node ${downloadSongPath} ${req.params.id} "${req.body.name}" ${req.body.time}`,(error, stdout, stderr) => {
                console.log(error, stdout, stderr)
            })

            res.send()
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

                const oldSub = await CurrentSongs.findById(req.user.votedFor)

                if(oldSub){
                    oldSub.votes--
                    await oldSub.save()
                }
            }

            req.user.votedFor = id
            const sub = await CurrentSongs.findById(id)
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