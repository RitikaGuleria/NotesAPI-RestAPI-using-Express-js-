const jwt=require("jsonwebtoken");
const SECRET_KEY=process.env.SECRET_KEY;

const auth=(req,res,next)=>{
    try {

        let token=req.headers.authorization;
        if(token)
        {
            token=token.split(" ")[1];
            let user=jwt.verify(token,SECRET_KEY);
            req.userId=user.id;
            next();
        }
        else{
            return res.status(401).json({message:"Unauthorized user"});
        }
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({message:"Unauthorized user"});
    }
}
module.exports=auth;