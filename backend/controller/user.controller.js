import UserModel from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
    try {
        const { username, email, password, avatar } = req.body;

        if (!username) {
            res.status(400).json({ message: "Username is required." });
        }
        if (!email) {
            res.status(400).json({ message: "Email is required." });
        }
        if (!password) {
            res.status(400).json({ message: "Password is required." });
        }
        if (!avatar) {
            res.status(400).json({ message: "Avatar is required." });
        }

        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashed = await bcrypt.hash(password, 10);
        const user = await UserModel.create({
            username,
            email,
            password: hashed,
            avatar,
        });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            channelId: user.channel ? user.channel.toString() : null, // changed
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email) {
            res.status(400).json({ message: "Email is required." });
        }
        if (!password) {
            res.status(400).json({ message: "Password is required." });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Wrong password" });
        }

        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            channelId: user.channel ? user.channel.toString() : null, // changed
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};

export const getUserProfile = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user.id).populate("channel");
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server Error" });
    }
};
