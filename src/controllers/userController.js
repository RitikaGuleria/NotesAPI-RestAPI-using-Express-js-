const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async(req,res)=>{

    // 1) Existing User check
    // 2) Hashed Password
    // 3) User Creation
    // 4) Token Generate
    
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    try{
        const existingUser=await userModel.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const result = await userModel.create({
            username:username,
            email:email,
            password:hashedPassword,
            
        });

        const token= jwt.sign({email: result.email, id: result._id},SECRET_KEY);
        return res.status(201).json({user: result,token: token});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Something went wrong"});
    }
}

const signin= async (req,res)=>{

    const{email,password}=req.body;

    try{
        const existingUser= await userModel.findOne({email : email});
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }
        const matchPassword=await bcrypt.compare(password,existingUser.password);
        if(!matchPassword){
            return res.status(400).json({message: "Invalid Credentials"});
        }
        const token=jwt.sign({email:existingUser.email,id:existingUser.id},SECRET_KEY);
        res.status(200).json({user:existingUser,token:token});
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }
}

module.exports={ signup,signin };