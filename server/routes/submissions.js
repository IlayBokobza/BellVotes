const auth = require('../Services/auth')
const controller = require('../controllers/submissionsController')
const router = require('express').Router()

router.post('/submitVideo',auth,controller.submitVideo)

module.exports = router