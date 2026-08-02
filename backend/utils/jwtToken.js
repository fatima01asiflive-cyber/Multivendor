// create Token and saving that in cookies
const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
    // If passed a mongoose document with `getJwtToken`, prefer that
    let token;
    if (user && typeof user.getJwtToken === "function") {
        token = user.getJwtToken();
    } else if (user && user._id) {
        token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES || "7d",
        });
    } else if (typeof user === "string") {
        token = user; // already a token
    } else {
        token = jwt.sign({}, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES || "7d",
        });
    }

    // option for cookies
    const options = {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: true,
    };

    // In production, set secure cookie
    if (process.env.NODE_ENV === "PRODUCTION") options.secure = true;

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token,
    });
};

module.exports = sendToken;
