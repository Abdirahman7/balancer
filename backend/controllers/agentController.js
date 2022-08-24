const asyncHandler = require('express-async-handler')
var bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/agentsModel')
const registerAgent = asyncHandler(async  (req,res)=>{
    const {name,password,userName} = req.body
    if(!name || !password  || !userName){
        res.status(404).json({message:'Please Enter All fields'})
    }
    const checkUser = await User.findOne({userName});
    if(checkUser){
        res.status(400)
        throw new Error('Username is already Exist')
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password,salt)
    const newUser = await User.create({
        name:name,
        userName:userName,
        password:hashPassword
    })
    if(newUser){
        res.status(201).json({
           _id:newUser.id,
           name:newUser.name,
           userName:newUser.userName
        })
    }else{
        res.status(400)
        throw new Error('in valid data entered')
    }
})
const GetAgent = asyncHandler(async (req,res)=>{
    const {name,password,userName} = req.body
    if(!name || !password  || !userName){
        res.status(404).json({message:'Please Enter All fields'})
    }
    
    const foundUser = await User.findOne({userName})
     if(!foundUser){
       res.status(401)
       throw new Error(`user: ${userName} is not found`)
     }  
    res.status(200).json({
        name:foundUser.name,
        userName:foundUser.userName,

    })
})


const updateAgent = asyncHandler(async (req,res)=>{
    const {name,password,userName} = req.body
    if(!name || !password  || !userName){
        res.status(404).json({message:'Please Enter All fields'})
    }
    const foundUser = await User.findOne({userName})
    if(!foundUser){
      res.status(401)
      throw new Error(`user: ${userName} is not found`)
    }

   res.status(200).json({
       name:foundUser.name,
       userName:foundUser.userName,

   })

    res.status(200).json({message:`update Agents ID ${req.params.id}`})
})

const deleteAgent = asyncHandler(async (req,res)=>{
    const userName = req.params.id
    const foundUser = await User.findOne({userName})
    if(!foundUser){
      res.status(401)
      throw new Error(`user: ${userName} is not found`)
    }else{
     await User.remove({userName})
    res.status(200).json({message:`username: ${req.params.id} is deleted from the database`})

    }

})

const login =asyncHandler(async (req,res)=>{
    const {userName,password} = req.body
    if(!userName || !password){
    res.status(404).json({message:`please enter all required data`})
    }
    const foundUser = await User.findOne({userName})
    if(foundUser && (await bcrypt.compare(password, foundUser.password))){
        res.status(201).json({
            _id:foundUser.id,
            name:foundUser.name,
            userName:foundUser.userName,
            Token:generateToken(foundUser.id)
        })
    }else{
    res.status(404).json({message:`userName or password is invalid`})
        
    }
  
})
//Generate a token JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };


module.exports ={
    registerAgent,
    updateAgent,
    deleteAgent,
    GetAgent,login
}