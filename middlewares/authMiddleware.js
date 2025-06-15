const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware to authenticate users using JWT
 */
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
        req.user = decoded; // Store user data in req.user
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token.' });
    }
};

/**
 * Middleware to check if user has the required role
 */
const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access forbidden: Insufficient permissions.' });
        }
        next();
    };
};

module.exports = { authenticateUser, authorizeRole };
