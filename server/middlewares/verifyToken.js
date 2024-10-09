const jwt = require('jsonwebtoken')

const verifyToken = (req,res,next) =>{
    try{
        const token = req.cookies.token
        if(!token){
            return res.status(401).json({error:"Token missing.",success:false})
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        if(!decoded){
            return res.status(401).json({error:"Unauthorized.",success:false})
        }

        req.userId = decoded.id;

        next()

    }catch(error){
        return res.status(500).json({error:error.message,success:false})
    }
}

module.exports = verifyToken