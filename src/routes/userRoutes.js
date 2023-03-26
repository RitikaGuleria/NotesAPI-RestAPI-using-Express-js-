const express = require("express");
const { signup, signin } = require("../controllers/userController");
const userRoute = express.Router();

userRoute.post("/signup",signup);
        //(req,res)=>{
   // res.send("Sign Up");


userRoute.post("/signin",signin);
//         (req,res)=>{
//     res.send("Sign In");
// });

//If we want to use this file object somewhere else, we can use this

module.exports=userRoute;
