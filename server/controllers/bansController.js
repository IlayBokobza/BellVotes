const User = require('../models/userModel')
const Ban = require('../models/banRecord')
const Submission = require('../models/submissionsModel')
const dayjs = require('dayjs')

class BansController{
    static async ban(req, res) {
        try {
            const id = req.params.id
            const sub = await Submission.findByIdAndDelete(id)
            const owner = await User.findById(sub.owner)
            const bannedUntilDate = dayjs().add(30, 'day')
            owner.bannedUntil = bannedUntilDate.unix()

            await owner.save()

            //create ban record
            const ban = new Ban({
                admin: req.user.name,
                userName: owner.name,
                userEmail: owner.email,
                userId:owner._id,
                date: dayjs().unix(),
                bannedUntil: dayjs(bannedUntilDate).unix(),
                bannedFor:{
                  title:sub.title,
                  link:sub.link,  
                }
            })

            await ban.save()

            res.send(ban.toObject())
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

    static async delete(req,res){
        try {
            const ban = await Ban.findByIdAndDelete(req.params.id)
            const user = await User.findById(ban.userId)
            user.bannedUntil = 0;
            await user.save()

            res.send()
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
}

module.exports = BansController