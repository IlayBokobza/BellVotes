const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require('../models/userModel')
const fs = require('fs')
const path = require('path')
const admins = [...JSON.parse(fs.readFileSync(path.resolve(`${__dirname}/../Services/admins.json`)).toString())]

module.exports = async (req,res,next) => {
    try{
        const token = req.cookies.token
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.CLIENT_ID
        })
        const payload = ticket.getPayload()
        
        if(!payload.hd || payload.hd != "pelech.ort.org.il"){
            console.log(`A non pelech user with the email of "${payload.email}" has made a request!`)
            res.status(401).send({ error: 'Please authenticate with pelech' })
            return
        }

        let user = await User.findOne({email:payload.email})

        if(!user){
            user = new User(payload)
            await user.save()
        }

        const isAdmin = admins.findIndex((i) => i == payload.email) != -1

        if(!isAdmin){
            console.log(`A non admin with the email of ${payload.email} has tried to commit an admin action.`)
            res.status(403).send()
            return
        }

        req.user = user
        next()
    }
    catch(e){
        console.log(e)
        res.status(401).send({ error: 'Please authenticate' })
    }
}