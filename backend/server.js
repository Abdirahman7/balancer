const express = require('express')
const dotenv =  require('dotenv').config()
const connectDB = require('../backend/dpConfig/dp')
const port = process.env.PORT || 5000
connectDB()
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use('/api/agents', require('./routes/agentsRoute'))
app.use('/api/transaction', require('./routes/transactionRoute'))


app.listen(port,()=>console.log(`server running on port ${port}`))