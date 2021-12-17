const jwt = require('jsonwebtoken')

const adminAuth = (req,res,next)=>{
  try{
    const token = req.headers.authorization.split(' ')[1]
    const verify = jwt.verify(token,'Admin@123')   //token verification
    req.userId= verify._id
    next();
  }
  catch(err){
    return res.status(401).json({
        status:401,
        message : "Invalid Token"
        
    })
    
  }
}

const auth= (req,res,next)=>{
  try{
    const token = req.headers.authorization
    console.log(token);
    const verify = jwt.verify(token,'Mohit@123')   //token verification
    req.userId= verify._id
    console.log(verify);
    next();
  }
  catch(err){
    return res.status(401).json({
        status:401,
        message : "Invalid Token"
    })
  }
}
module.exports= {auth,adminAuth}