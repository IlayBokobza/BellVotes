const mongoose = require('mongoose')

const schema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
    owner:mongoose.Schema.Types.ObjectId,
    ownerName:{
        type:String,
        required:true
    },
    songData:{
        type:String,
        required:true
    },
    votes:{
        type:Number,
        default:0
    }
})

const CurrentSongs = mongoose.model('CurrentSongs',schema)
const FutureSongs = mongoose.model('FutureSongs',schema)

module.exports = {CurrentSongs,FutureSongs}