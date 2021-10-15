const router = require('express').Router()
const Auth = require('../Services/auth')

router.get('/isAdmin',Auth.adminAuth,(req,res) => {
    res.send()
})

module.exports = router