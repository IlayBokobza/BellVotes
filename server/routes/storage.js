const router = require('express').Router()
const Storage = require('../Services/storage')

router.get('/',(req,res) => {
    console.log('Song Requested')
    res.send(Storage.getSong())
})

module.exports = router