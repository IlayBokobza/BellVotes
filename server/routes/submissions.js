const Auth = require('../Services/auth')
const controller = require('../controllers/submissionsController')
const router = require('express').Router()

//when submited request
router.post('/',Auth.normalAuth,controller.post)

//getting all submissions
router.get('/',Auth.adminAuth,controller.get)

//when deny
router.delete('/:id',Auth.adminAuth,controller.delete)

//when accept
router.put('/:id',Auth.adminAuth,controller.put)

//when ban
router.delete('/ban/:id',Auth.adminAuth,controller.ban)

module.exports = router