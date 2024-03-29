const mongoose = require('mongoose')

const Schema = mongoose.Schema({
    admin:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Types.ObjectId,
        required:true,
    },
    userEmail:{
        type:String,
        required:true,
    },
    date:{
        type:Number,
        required:true,
    },
    bannedUntil:{
        type:Number,
        required:true,
    },
    bannedFor:{
        title:{
            type:String,
            required:true,
        },
        link:{
            type:String,
            required:true,
        }
    }
})

const Ban = mongoose.model('Ban',Schema)

module.exports = Ban