const express=require('express');
const app=express();
app.use(express.json());
const Userrouter=express.Router();
const jwt=require('jsonwebtoken');
const zod=require('zod');
const {JWT_SECRET}=require('../config');
const {User,Account}=require('../db/db');
const {UserMiddleware}=require('../middleware/user');

//Zod Schema
const signupSchema=zod.object({
    username:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})


//Route for new user
Userrouter.post('/signup',async(req,res)=>{
    const inputs=signupSchema.safeParse(req.body);
    if(!inputs.success){
        res.json({
            msg:"Invalid inputs/Email already registered"
        })
        return;
    }
    const exists=await User.findOne({username:inputs.data.username});
    if(exists){
        res.json({msg:"User already registered"})
    }
    const newUser=new User({
        username:inputs.data.username,
        password:inputs.data.password,
        firstName:inputs.data.firstName,
        lastName:inputs.data.lastName
    });
    const userId=newUser._id; //userId from the database 
    const token=jwt.sign({userId},JWT_SECRET);
    await newUser.save();


    //Give a random value here so that user can see some balance in his account and we dont have to integrate payment gateway here
    await Account.create({
        userId:userId,
        amount:Math.random()*10000
    })
    res.status(200).json({
        msg:"User registered successfully",
        token:token,
    });
});


const signIn=zod.object({
    username:zod.string().email(),
    password:zod.string()
})


//Route for existing users
Userrouter.post('/signin',async(req,res)=>{
    const input=signIn.safeParse(req.body);
    if(!input.success){
        res.status(400).json({msg:"Invalid inputs"});
        return;
    }
    const existingUser=await User.findOne({username:req.body.username});
    if(!existingUser){
        res.status(400).json({msg:"user not registered"});
        return;
    }
    else if(existingUser.password!==req.body.password){
        res.status(400).json({msg:"Incorrect password"});
        return;
    }
    else{
        const token=jwt.sign({userId:existingUser._id},JWT_SECRET);
        res.status(200).json({
            msg:"USer signed in successfully",
            token:token
        })
        return;
    }
})


const updateUSer=zod.object({
    username:zod.string().email().optional(),
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})


//Route to update user details
Userrouter.put('/',UserMiddleware,async(req,res)=>{
    const success=updateUser.safeParse(req.body);
    if(!success.success){
        res.status(400).json({msg:"Invalid inputs"});
        return;
    }
    const userId=req.userId;
    const updateUser=await User.updateOne({_id:userId},req.body);
    res.json({
        msg:"Updated successfully"
    })
})


//Filter based on firstname and lastname 
Userrouter.get('/bulk',UserMiddleware,async(req,res)=>{
    const filter=req.query.filter || "";
    const users=await User.find({
        $or:[{
            firstName:{$regex:filter},
            lastName:{$regex:filter}
        }]
    })
    res.json({
        users:users.map(user=>{
            return{
                firstName:user.firstName,
                lastName:user.lastName
            }
        })
    })
})
module.exports={Userrouter};