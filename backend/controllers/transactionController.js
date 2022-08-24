const asyncHandler = require('express-async-handler')


const listOfTransaction = asyncHandler(async(req,res)=>{
    res.status(200).json({message:`list of Transaction`})
})
const addTransaction =asyncHandler(async (req,res)=>{
    const {agent} = req.body
    // if(!agent || !agentCode || !amount || !currencyType || !transactionType){
    //     res.status(400).json({message:`please fill all required data`})
    // }
    res.status(200).json({
        agent:agent,
       
    })
})

module.exports = {
   listOfTransaction,
   addTransaction
}