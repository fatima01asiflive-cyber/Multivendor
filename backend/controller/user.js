const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/errorHandler");
constcatchAsyncErrors=require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken =require("../utils/jwtToken")

router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check user existence
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                }
            });
            return next(new ErrorHandler("User already exists", 400));
        }

        // 3. Save clean filename or path
        const filename = req.file.filename;
        const fileUrl = `/uploads/${filename}`;

        // 4. Create new user object
        const newUser = {
            name: name,
            email: email,
            password: password, // Make sure your User schema has a bcrypt pre-save hook!
            avatar: fileUrl,
        };
        const activationToken = createActivationToken(newUser);

        const activationUrl = `http://localhost:5173/activation/${activationToken}`;

        try {
            await sendMail({
                email: email,
                subject: "Activate your account",
                message: `Hello ${name}, please click on the link to activate your account: ${activationUrl}`,
            });
            res.status(201).json({
                success: true,
                message: `please check your email:- ${email} to activate your account!`,
            });
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    } catch (error) {
        return next(new ErrorHandler(error.message, 400));
    }
});

//create activation token 
const createActivationToken = (user) => {
    return jwt.sign(user, process.env.ACTIVATION_SECRET, {
        expiresIn: "5m",
    });
};

//activate user 

router.post("/activation",catchAsyncErrors(async(req,res,next)=>{
    try{
        const{activation_token}=req.body;

        const newUser=jwt.verify(activation_token,process.env.Activation_SECRET);
if(!newUser){ 
    return next(new ErrorHandler("Invalid token",400));
}

    const {name,email,password,avatar} =newUser;
 User.create ({
    name,
    email,
    avatar,
    password,
 });

 sendToken(newUser,201,res);  
    }catch(error)
    {
}

    
}))
module.exports = router;