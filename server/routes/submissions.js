const Auth = require('../services/auth')
const controller = require('../controllers/submissionsController')
const router = require('express').Router()

//when submited request
router.post('/',Auth.normalAuth,controller.post)

//when voted for a song
router.post('/vote/:id',Auth.normalAuth,controller.vote)

//gets the users vote
router.get('/myVote',Auth.normalAuth,controller.getMyVote)

//getting all submissions
router.get('/',Auth.adminAuth,controller.get)

//getting all the accpepted submissions
router.get('/accpeted',Auth.normalAuth,controller.getAccpeted)

//when deny
router.delete('/:id',Auth.adminAuth,controller.delete)

//when accept
router.put('/:id',Auth.adminAuth,controller.put)

module.exports = router