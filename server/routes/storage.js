const router = require('express').Router()
const Storage = require('../services/storage')

//storage routes
router.get('/',(req,res) => {
    console.log('Song Requested')
    res.send(Storage.getSong())
})

router.get('/date',(req,res) => {
    res.send(Storage.getDate())
})

module.exports = router