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

//we always store the balance in Number (not float or double) to avoid precision issues
//since we are dealing here with the transactions shown in user account 
//so is we value is 88.8 it will show 89 if we use float or double
//hence 88.88 is stored as 8888 in Number datatype 
const AccountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,   
        required:true
    }
})

const User=mongoose.model('User',UserSchema);
const Account=mongoose.model('Account',AccountSchema);

module.exports={
    User,
    Account
};