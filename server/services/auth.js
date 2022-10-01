const {OAuth2Client} = require('google-auth-library');
const config = require('../config')
const client = new OAuth2Client(config.external.googleClientId);
const User = require('../models/userModel')

module.exports = class Auth{
    static async isAuth(token){
        try{
            if(!token){
                console.log('No token to user.')
                return [false,null]
            }

            const ticket = await client.verifyIdToken({
                idToken:token,
                audience:config.external.googleClientId
            })
            const payload = ticket.getPayload()

            if(!payload.hd || (config.emailDomain && payload.hd != config.emailDomain)){
                console.log(`A non ${config.schoolName} user has made a request!`)
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
            //checks if user is valid
            const [allowUser,payload] = await Auth.isAuth(req.cookies.token)
            
            if(!allowUser){
                res.status(401).send({ error: `Please authenticate with ${config.schoolName}` })
                return
            }
    
            //gets user and moves on
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
            //checks if user is valid
            const [allowUser,payload] = await Auth.isAuth(req.cookies.token)
            
            if(!allowUser){
                res.status(401).send({ error: `Please authenticate with ${config.schoolName}` })
                return
            }
    
            //gets user
            let user = await User.findOne({email:payload.email})
    
            if(!user){
                user = new User(payload)
                await user.save()
            }
            
            //check if user is an admin.
            const isAdmin = Auth.isAdminEmail(payload.email)
    
            if(!isAdmin){
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

    static isAdminEmail(email){
        return config.admins.findIndex((i) => i == email) != -1
    }
}