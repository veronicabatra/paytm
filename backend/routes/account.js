const express=require('express');
const accountRouter=express.Router();
const {Account}=require('../db/db');
const {userMiddleware}=require('../middleware/user');


//Route to get the user current balance
accountRouter.get('/balance',userMiddleware,async(req,res)=>{
    const userId=req.userId;
    const account=await Account.findOne({userId:userId});
    res.status(200).json({
        balance:account.amount
    });
})


//Router to transfer money to another account
accountRouter.post('/transfer',userMiddleware,async(req,res)=>{
    
})

module.exports={accountRouter};