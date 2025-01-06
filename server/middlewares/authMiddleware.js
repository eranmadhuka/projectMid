const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust the path as needed

const authenticate = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Token received:', token);
    if (!token) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded token:', decoded);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        res.status(401).json({ message: 'Invalid authentication token' });
    }
};



const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token is required' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.userId,
            role: decoded.role,
        };
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticateToken;


module.exports = authenticate;
