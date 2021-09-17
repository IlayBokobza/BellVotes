const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require('../models/userModel')

module.exports = async (req,res,next) => {
    try{
        const token = req.cookies.token
        const ticket = await client.verifyIdToken({
            idToken:token,
            audience:process.env.CLIENT_ID
        })
        const payload = ticket.getPayload()
        
        if(!payload.hd || payload.hd != "pelech.ort.org.il"){
            console.log('A non pelech user has made a request!')
            res.status(401).send({ error: 'Please authenticate with pelech' })
            return
        }

        let user = await User.findOne({email:payload.email})

        if(!user){
            user = new User(payload)
            await user.save()
        }

        req.user = user
        next()
    }
    catch{
        res.status(401).send({ error: 'Please authenticate' })
    }
}