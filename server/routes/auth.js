const router = require('express').Router()
const Auth = require('../services/auth')

router.get('/isAdmin',Auth.adminAuth,(req,res) => {
    res.send()
})

module.exports = router