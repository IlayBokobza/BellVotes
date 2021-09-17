const auth = require('../Services/auth')
const controller = require('../controllers/submissionsController')
const router = require('express').Router()

router.post('/getvideo',auth,controller.getVideo)

module.exports = router