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
    owner:mongoose.Schema.Types.ObjectId
})

const Submission = mongoose.model('Submission',schema)

module.exports = Submission