const auth = require('../Services/auth')
const adminAuth = require('../Services/adminAuth')
const controller = require('../controllers/submissionsController')
const router = require('express').Router()

//when submited request
router.post('/',auth,controller.post)

//getting all submissions
router.get('/',adminAuth,controller.get)

//when deny
router.delete('/:id',adminAuth,controller.delete)

//when accept
router.put('/:id',adminAuth,controller.put)

//when ban
router.delete('/ban/:id',adminAuth,controller.ban)

module.exports = router