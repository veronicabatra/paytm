const express=require('express');
const app=express();
app.use(express.json());
const accountRouter=express.Router();
const {Account}=require('../db/db');
const {UserMiddleware}=require('../middleware/user');
const mongoose = require('mongoose');


//Route to get the user current balance
accountRouter.get('/balance',UserMiddleware,async(req,res)=>{
    const userId=req.userId;
    const account=await Account.findOne({userId:userId});
    if(!account){
        res.status(400).json({msg:"Account not found"});
        return;
    }
    res.status(200).json({
        balance:account.amount
    });
})


//Router to transfer money to another account
accountRouter.post('/transfer',UserMiddleware,async(req,res)=>{
    const session=await mongoose.startSession();
    session.startTransaction();
    const {amount,to}=req.body;
    const accountFrom=await Account.findOne({userId:req.userId}).session(session);
    if(accountFrom.amount<amount){
        await session.abortTransaction();
        res.status(400).json({msg:"Insufficient Balance"});
        return;
    }
    const accountTo=await Account.findOne({userId:to}).session(session);
    if(!accountTo){
        session.abortTransaction();
        res.status(400).json({msg:"Recipient account not found"});
        return;
    }
    //Perform the transactions
    await Account.updateOne({userId:req.userId},{$inc:{amount:-amount}}).session(session);
    await Account.updateOne({userId:to_id},{$inc:{amount:+amount}}).session(session);
    await session.commitTransaction();
    res.status(200).json({msg:"Transaction Successful"});
})

module.exports={accountRouter};