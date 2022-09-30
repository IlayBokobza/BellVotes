const router = require('express').Router()
const Auth = require('../services/auth')
const controller = require('../controllers/bansController')


//getting all bans
router.get('/',Auth.adminAuth,controller.getBans)

//when ban a user
router.post('/:id',Auth.adminAuth,controller.ban)

//delete a ban
router.delete('/:id',Auth.adminAuth,controller.delete)

module.exports = router