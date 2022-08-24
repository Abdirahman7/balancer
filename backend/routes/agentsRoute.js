const express = require('express')
const router = express.Router()
const {registerAgent,updateAgent,deleteAgent,GetAgent,login} = require('../controllers/agentController')
 


router.route('/').get(GetAgent).post(registerAgent)
router.post('/login', login)
router.route('/:id').put(updateAgent).delete(deleteAgent)

module.exports = router