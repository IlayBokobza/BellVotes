const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    hasSubmited:{
        type:Boolean,
        default:false,
    },
    votedFor:{
        type:mongoose.Types.ObjectId
    },
    bannedUntil:{
        type:Number,
        default:0,
    },
})

const User = mongoose.model('User',schema)

module.exports = User