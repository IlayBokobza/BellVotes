const router = require('express').Router()
const Storage = require('../services/storage')
const config = require('../config')

//storage routes
router.get('/',(req,res) => {
    if(Storage.doesSongExist()){
        console.log('Song Requested')
        res.send(Storage.getSong())
    }
    else{
        res.status(404)
        res.send('Song not found')
    }
})

router.get('/date',(req,res) => {
    res.send(Storage.getDate())
})

router.get('/metadata',(req,res) => {
    res.send({
        colors:config.colors,
        name:config.hebSchoolName,
        googleClientId:config.external.googleClientId,
        rules:config.rules
    })
})

module.exports = router