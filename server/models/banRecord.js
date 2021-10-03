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
    userEmail:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,
    },
    bannedUntil:{
        type:String,
        required:true,
    },
})

const Ban = mongoose.model('Ban',Schema)

module.exports = Ban