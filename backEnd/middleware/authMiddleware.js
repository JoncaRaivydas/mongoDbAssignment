const jwt = require("jsonwebtoken")
const asyncHandler=require("express-async-handler")
const User= require("../models/userModel")

const protect = (req, res, next) => {
    let token = req.headers.authorization && req.headers.authorization.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Not authorized, no token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach the user info from the token to the request
        next();
    } catch (error) {
        res.status(401).json({ message: "Not authorized, invalid token" });
    }
};

module.exports = { protect };
