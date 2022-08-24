const mongoose = require('mongoose')

const transactionSchema = mongoose.Schema({
    agent:{
       type:mongoose.Schema.Types.ObjectId,
       require:[true],
       ref:'Agent'
    },
    agentCode:{
        type:String,
        require:[true,'Please Enter Agent Code']
    },
    amount:{
        type:Number,
        require:[true,'please Enter amount']
    },
    currencyType:{
        type:String,
        require:[true,'Please Enter Currency Type']
    },
    transactionType:{
        type:String,
        require:[true,'Please Enter Transaction Type']
        
    },
},
{timestamps:true
})

module.exports = mongoose.model('Transaction', transactionSchema)
