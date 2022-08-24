const mongoose = require('mongoose')

const agentSchema = mongoose.Schema({
    name:{
        type:String,
        require: [true,'Please Enter your name']
    },
    userName:{
         type:String,
         require:[true,'Please Enter Agent username'],
         unique:true
    },
    password:{
        type:String,
        require: [true,'Please Enter your password']
    }


},
{timestamps:true
   
})

module.exports = mongoose.model('Agent', agentSchema)