const auth = require('../Services/auth')
const adminAuth = require('../Services/adminAuth')
const controller = require('../controllers/submissionsController')
const router = require('express').Router()

router.post('/submitVideo',auth,controller.submitVideo)
router.get('/',adminAuth,controller.get)

module.exports = router