const express=require('express');
const UserRouter=require('./routes/user');
const cors=require('cors');
app.use(cors());

const app=express();
app.use(express.json());
app.use('/api/v1/user',UserRouter);

app.listen(3000,()=>console.log('Server connected at 3000'));