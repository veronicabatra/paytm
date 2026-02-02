const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/paytm');  //enter ur string here 
// const bycrypt=require('bcrypt');

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        lowercase:true,
        minLength:3,
        maxLength:20,
        required:true
    },
    password:{
        type:String,
        minLength:6,
        required:true
    },
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    }
})

const User=mongoose.model('User',UserSchema);

module.exports={User};