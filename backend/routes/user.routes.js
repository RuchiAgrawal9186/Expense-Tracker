const express = require("express")
const {userModel} = require("../models/user.model")
//router object
const userRouter = express.Router()

// routes

// for register routes
userRouter.post("/register",async(req,res)=>{

    try {
        const newUser = new userModel(req.body)
        await newUser.save()

        res.status(201).json({success:true,mesg:"new user created",newUser:newUser})
        
    } catch (error) {
        res.status(400).json({success:false,error})
    }

})


// for login routes
userRouter.post("/login",async(req,res)=>{

    try {
 
        const {email,password} = req.body
        const user = await userModel.findOne({email,password})

        if(!user)
        {
            return  res.status(404),send("user not found")
        }
       res.status(200).json({mesg:"login successfully",user:user})

        
    } catch (error) {
        res.status(400).json({success:false,error})
    }

})

module.exports = {
    userRouter
}