import jwt from 'jsonwebtoken';
import UserModel from '../model/user.model.js';

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    // if token not found, send appropriate response
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Access denied. No token provided.' });
    }
    
    let token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token, unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await UserModel.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
