const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const User = require('../models/userModel')
const fs = require('fs')
const path = require('path')

module.exports = class Auth{
    static async isAuth(token){
        try{
            if(!token){
                console.log('No token to user.')
                return [false,null]
            }

            const ticket = await client.verifyIdToken({
                idToken:token,
                audience:process.env.CLIENT_ID
            })
            const payload = ticket.getPayload()
            
            if(!payload.hd || payload.hd != "pelech.ort.org.il"){
                return [false,payload]
            }

            return [true,payload]
        }
        catch(e){
            console.log(e)
            return [false,null]
        }
    }

    static async normalAuth (req,res,next){
        try{
            const [allowUser,payload] = await Auth.isAuth(req.cookies.token)
            
            if(!allowUser){
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
        catch(e){
            res.status(401).send({ error: 'Please authenticate' })
        }
    }

    static async adminAuth (req,res,next){
        try{
            const [allowUser,payload] = await Auth.isAuth(req.cookies.token)
            
            if(!allowUser){
                console.log('A non pelech user has made a request!')
                res.status(401).send({ error: 'Please authenticate with pelech' })
                return
            }
    
            let user = await User.findOne({email:payload.email})
    
            if(!user){
                user = new User(payload)
                await user.save()
            }
    
            const admins = [...JSON.parse(fs.readFileSync(path.resolve(`${__dirname}/../Services/admins.json`)).toString())]
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
}