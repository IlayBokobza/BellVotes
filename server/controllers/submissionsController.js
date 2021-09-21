const axios = require('axios').default
const Submission = require('../models/submissionsModel')

class submissionsController{
    static async submitVideo(req,res){
        try{

            if(req.user.hasSubmited){
                res.status(400).send('אתה כבר שלחת הצעה לסיבוב הזה')
                return
            }

            const {data} = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${req.body.videoId}&key=${process.env.YOUTUBE_API}`)
            const {title,categoryId} = data.items[0].snippet

            //checks if video is a music one
            if(categoryId != "10"){
                res.status(400).send('הסרטון הוא לא שיר')
                return
            }

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
            const data = await Submission.find()
            res.send(data)
        } catch (e) {
            console.log(e)
            res.status(500).send(e)
        }
    }
}

module.exports = submissionsController