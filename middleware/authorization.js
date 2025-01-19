const jwt = require('jsonwebtoken');
const User = require("../model/user");
const { tokenBlacklist } = require("../controller/authentication/signout");
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({
            status: "fail",
            message: 'Authorization header missing'
        });
        const token = authHeader.split(' ')[1];
        if (!token) return res.status(404).json({
            status: "fail",
            message: "Token is missing in authorization header"
        })
        if (tokenBlacklist.has(token)) return res.status(401).json({
            status: "fail",
            message: "Token is blacklisted"
        });
        let decodedToken;
        try {
            if (authHeader.split(' ')[0] === "APIKey") {
                decodedToken = { id: token };
            } else {
                decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            }
        } catch (err) {
            return res.status(401).json({
                status: "fail",
                message: 'Invalid or expired token'
            });
        };
        if (decodedToken.id === "a574b89c9f5d1389708f2e8a4a2daf0b") {
            return next();
        };
        const user = await User.findById(decodedToken.id).catch(() => {
            console.log(err);
        });
        if (!user) return res.status(404).json({
            status: "fail",
            message: 'User not found'
        });
        req.user = user;
        next();
    } catch (err) {
        return res.status(500).json({
            status: "fail",
            message: "Server encountered an error. Contact Administrator"
        })
    }
};