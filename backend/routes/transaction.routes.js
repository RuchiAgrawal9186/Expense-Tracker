const express = require("express")
// const {userModel} = require("../models/user.model")
const {transactionModel} = require("../models/transaction.model")
const moment = require("moment")
//router object
// const userRouter = express.Router()
const transactionRouter = express.Router()

// routes

// for register routes
transactionRouter.post("/add",async(req,res)=>{

    try {
       const newtransaction = new transactionModel(req.body)
       await newtransaction.save()
       res.status(201).send("Transaction Created")
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
    }

})


// for login routes
transactionRouter.post("/getall",async(req,res)=>{

    try {
        const {frequency,selectedDate,type}=req.body
        const transaction = await transactionModel.find({
         ...(frequency !=="custom"? {
            date:{
                $gt:moment().subtract(Number(frequency),"d").toDate()
           },
          }:{
            date:{
                $gte:selectedDate[0],
                $lte:selectedDate[1],
            }

           }),
        userid:req.body.userid,
        ...(type!="all" && {type})
    })
        res.status(200).json(transaction)
        
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
       
    }

})

transactionRouter.put("/edit",async(req,res)=>{

    try {
       
        await transactionModel.findOneAndUpdate({
            _id:req.body.transactionId
        },
        req.body.payload
        )
        res.status(200).send("Edit Successfully")
        
    } catch (error) {
        console.log(error)
        res.status(500).json(error.message)
       
    }

})

transactionRouter.delete("/delete",async(req,res)=>{

    try {
        await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
        res.status(200).send("Transaction Deleted!");
      } catch (error) {
        console.log(error);
        res.status(500).json(error);
      }

})

module.exports = {
    transactionRouter
}