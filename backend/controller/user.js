const express = require("express");
const path = require("path");
const router = express.Router();
const User = require("../model/user");
const { upload } = require("../multer");

router.post("/create-user", upload.single("file"), async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check user existence
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Check if file is uploaded
        if (!req.file) {
            return res.status(400).json({ message: "Please upload an image" });
        }

        // 3. Sirf filename lein (path.join ki zaroorat nahi hai)
        const filename = req.file.filename;

        // 4. Create new user object
        const newUser = await User.create({
            name,
            email,
            password,
            avatar: filename, // DB mein sirf clean filename save karein
        });

        // 5. Send response
        res.status(201).json({
            success: true,
            user: newUser,
        });

    } catch (error) {
        console.error("Create User Error:", error); // Debugging ke liye log zaroori hai
        next(error);
    }
});

module.exports = router;