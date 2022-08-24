const express = require('express')
const router = express.Router()
const {listOfTransaction,addTransaction} = require('../controllers/transactionController')

router.get('/', listOfTransaction)
router.post('/add', addTransaction)


module.exports = router