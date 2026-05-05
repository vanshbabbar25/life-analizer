import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const registerUser = async(req,res,next)=>{
    try {
        const{name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"all fields are required"});
        }

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(409).json({message:"user already exists"});

        const passwordHash = await bcrypt.hash(password,10);

        const user = await User.create({name,email,password: passwordHash});

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        ); 
        res.status(201).json({
            message: "User registered successfully",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    

    } catch (error) {
        next(error);
    }
};

export const loginUser = async(req,res,next)=>{
    try {
        const{email,password} = req.body;
        if(!email || !password)return res.status(400).json({ message: "Email and password required" });

        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });
        
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        ); 
        res.status(200).json({
            message: "login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        next(error);
    }
};

export const logoutUser = async (req, res, next) => {
  try {
    res.status(200).json({
      message: "Logout successful.Please delete token on client"
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    next(error);
  }
};
