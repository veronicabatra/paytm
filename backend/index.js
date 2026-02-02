const express=require('express');
const {Userrouter}=require('./routes/user');
const app=express();

const cors=require('cors');
app.use(cors());

app.use(express.json());

app.use('/api/v1/user',Userrouter);

app.listen(3000,()=>console.log('Server connected at 3000'));