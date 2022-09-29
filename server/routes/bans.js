const router = require('express').Router()
const Auth = require('../services/auth')
const controller = require('../controllers/bansController')


//getting all bans
router.get('/',Auth.adminAuth,controller.getBans)

//when ban
router.delete('/:id',Auth.adminAuth,controller.ban)

module.exports = router