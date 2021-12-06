const jwt = require('jsonwebtoken')



module.exports= (req,res,next)=>{
  try{
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    const verify = jwt.verify(token,'Mohit@123')   //token verification
    next();
  }
  catch(err){
    return res.status(401).json({
        message : "Unauthorized access"
    })
  }
}