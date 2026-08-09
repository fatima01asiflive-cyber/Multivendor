const ErrorHandler = require("../utils/ErrorHandler");
// Update this path to match your actual file name (e.g., ./catchAsyncError or ../utils/catchAsyncErrors)
const catchAsyncErrors = require("./catchAsyncErrors"); 
const jwt = require("jsonwebtoken");
const User = require("../model/user");

// 1. Authenticate user middleware
exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodedData.id);

  next();
});

// 2. Admin role authorization middleware (Fixes "isAdmin is not a function")
exports.isAdmin = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};