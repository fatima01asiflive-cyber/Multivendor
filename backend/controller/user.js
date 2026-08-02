const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const User = require("../model/user");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");

//create User Route 

router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return next(new ErrorHandler("Please fill all required fields", 400));
        }

        if (!req.file) {
            return next(new ErrorHandler("Image file is required (field name: file)", 400));
        }

        // 1. Check user existence
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            const filename = req.file.filename;
            const filePath = `uploads/${filename}`;
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log(err);
                    res.status(500).json({ messages: "Error deleting file" });
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

            const responseBody = {
                success: true,
                message: `please check your email:- ${email} to activate your account!`,
            };

            // In development, include the activation token so frontend/postman tests can proceed without email
            if (process.env.NODE_ENV !== "PRODUCTION") {
                responseBody.activationToken = activationToken;
                responseBody.activationUrl = activationUrl;
            }

            res.status(201).json(responseBody);
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

// activate user
router.post(
    "/activation",
    catchAsyncErrors(async (req, res, next) => {
        try {
            const { activation_token } = req.body;

            if (!activation_token) {
                return next(new ErrorHandler("Activation token is required", 400));
            }

            // Verify JWT Token
            const decodedUser = jwt.verify(
                activation_token,
                process.env.ACTIVATION_SECRET
            );

            if (!decodedUser) {
                return next(new ErrorHandler("Invalid or expired token", 400));
            }

            const { name, email, password, avatar } = decodedUser;

            // Debugging log (VS Code Terminal par check karein)
            console.log("Decoded Token Data:", { name, email, avatar });

            if (!name) {
                return next(new ErrorHandler("Token missing name field. Please recreate user.", 400));
            }

            // Check if user already exists in DB
            let user = await User.findOne({ email });
            if (user) {
                return next(new ErrorHandler("User already exists", 400));
            }

            // Create User in Database
            const newUser = await User.create({
                name: name,
                email: email,
                password: password,
                avatar: typeof avatar === "object" ? avatar : { public_id: Date.now().toString(), url: avatar },
            });

            sendToken(createdUser, 201, res);
        } catch (error) {
            return next(new ErrorHandler(error.message, 500));
        }
    })
);
module.exports = router;
