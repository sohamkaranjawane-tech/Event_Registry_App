const jwt = require("jsonwebtoken");

function authMiddleware(req,res,next){
    let token = req.headers.authorization;
    if(!token){
        return res.status(401).json({
            message:"Token not found !!"
        });
    }
    token = token.split(" ")[1];
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(err){
        return res.status(401).json({
            message:"Invalid Token !!"
        })
    }
}
module.exports = authMiddleware;