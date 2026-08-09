const express = require("express");
const path = require("path");
const fs = require("fs");
const router = express.Router();
const User = require("../model/user"); // or user.model.js as required by your schema
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdmin } = require("../middleware/auth");

// Helper function to safely delete files if upload fails or user exists
const deleteFile = (filePath) => {
  if (filePath && fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete local file:", err);
    });
  }
};

// ==========================================
// 1. CREATE USER ROUTE
// ==========================================
router.post(
  "/create-user",
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        if (req.file) deleteFile(req.file.path);
        return next(new ErrorHandler("All fields are required!", 400));
      }

      if (!req.file) {
        return next(new ErrorHandler("Avatar image is required!", 400));
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        deleteFile(req.file.path);
        return next(new ErrorHandler("User already exists", 400));
      }

      const filename = req.file.filename;
      const fileUrl = `/uploads/${filename}`;

      const user = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: filename,
          url: fileUrl,
        },
      });

      sendToken(user, 201, res);
    } catch (error) {
      if (req.file) deleteFile(req.file.path);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 2. LOGIN USER ROUTE
// ==========================================
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("All Fields are required!", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User Doesn't Exist!", 400));
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return next(
          new ErrorHandler("Please, Provide the correct information!", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 3. LOAD USER ROUTE
// ==========================================
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id);

      if (!user) {
        return next(new ErrorHandler("User doesn't exist!", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 4. LOGOUT USER ROUTE
// ==========================================
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(200).json({
        success: true,
        message: "Logged out successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 5. UPDATE USER INFO
// ==========================================
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, email, password, phoneNumber } = req.body;

      const user = await User.findOne({ email }).select("+password");
      if (!user) {
        return next(new ErrorHandler("User not found", 400));
      }

      const isValidPassword = await user.comparePassword(password);
      if (!isValidPassword) {
        return next(
          new ErrorHandler("Please, Provide the correct information!", 400)
        );
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 6. UPDATE USER AVATAR
// ==========================================
router.put(
  "/update-avatar",
  isAuthenticated,
  upload.single("file"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!req.file) {
        return next(new ErrorHandler("Please upload an image file", 400));
      }

      if (user.avatar && user.avatar.public_id) {
        const existPath = path.join(__dirname, `../uploads/${user.avatar.public_id}`);
        deleteFile(existPath);
      }

      const filename = req.file.filename;
      const fileUrl = `/uploads/${filename}`;

      user.avatar = {
        public_id: filename,
        url: fileUrl,
      };

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      if (req.file) deleteFile(req.file.path);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 7. UPDATE USER ADDRESSES
// ==========================================
router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const sameTypeAddress = user.addresses.find(
        (address) => address.addressType === req.body.addressType
      );

      if (sameTypeAddress) {
        return next(
          new ErrorHandler(
            `${req.body.addressType} address already exists`,
            400
          )
        );
      }

      const existAddress = user.addresses.find(
        (address) => address._id.toString() === req.body._id
      );

      if (existAddress) {
        Object.assign(existAddress, req.body);
      } else {
        user.addresses.push(req.body);
      }

      await user.save();

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 8. DELETE USER ADDRESS
// ==========================================
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        { _id: userId },
        { $pull: { addresses: { _id: addressId } } }
      );

      const user = await User.findById(userId);

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 9. UPDATE PASSWORD
// ==========================================
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user._id).select("+password");

      const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Wrong Old Password", 400));
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Passwords do not match", 400));
      }

      user.password = req.body.newPassword;
      await user.save();

      res.status(200).json({
        success: true,
        message: "Password Updated Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 10. GET USER INFO BY ID
// ==========================================
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("User not found", 404));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 11. GET ALL USERS (ADMIN)
// ==========================================
router.get(
  "/admin-all-users",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// ==========================================
// 12. DELETE USER (ADMIN)
// ==========================================
router.delete(
  "/admin-delete-user/:id",
  isAuthenticated,
  isAdmin("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(
          new ErrorHandler(`User is not available with ID: ${req.params.id}`, 400)
        );
      }

      if (user.avatar && user.avatar.public_id) {
        const existPath = path.join(__dirname, `../uploads/${user.avatar.public_id}`);
        deleteFile(existPath);
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "User Deleted Successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;