const router = require('express').Router()
const adminAuth = require('../Services/adminAuth')

router.get('/isAdmin',adminAuth,(req,res) => {
    res.send()
})

module.exports = router