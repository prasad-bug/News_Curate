const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Auth Middleware - Verifies JWT token
const authMiddleware = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Not authorized, user not found',
                });
            }

            next();
        } catch (error) {
            res.status(401).json({
                success: false,
                message: 'Not authorized, token failed',
            });
        }
    }

    if (!token) {
        res.status(401).json({
            success: false,
            message: 'Not authorized, no token',
        });
    }
};

// Admin Middleware - Checks if user is admin
const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied',
        });
    }
    next();
};

module.exports = { authMiddleware, adminMiddleware };
