const {JWT_SECRET}=require('../config');
const jwt=require('jsonwebtoken');

function UserMiddleware(req,res,next){
    const token=req.headers.authorization;

    if(!token || token.startsWith('Bearer')){
        res.status(401).json({msg:"Unauthorized access"});
        return;
    }
    const words=token.split(" ");
    const jwttoken=words[1];

    try{
        const decoded=jwt.verify(jwttoken,JWT_SECRET);
        req.userId=decoded.userId;
            next();
        }catch(err){
            res.status(401).json({msg:"Unauthorized access"});
        }
}

module.exports={UserMiddleware};