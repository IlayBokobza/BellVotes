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
})

const AcceptedSubmission = mongoose.model('AcceptedSubmission',schema)

module.exports = AcceptedSubmission