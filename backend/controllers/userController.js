import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";



const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({success:false, message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({success:false, message: "Invalid email or password" });
        }
        const token = createToken(user._id);
        res.status(200).json({success:true, message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }   
};

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try{
        //check the user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.status(400).json({success:false, message: "User already exists" });
        }
        //validate email format and password strength
        if(!validator.isEmail(email)){
            return res.status(400).json({success:false, message: "please provide a valid email" });
        }
        if(password.length < 8){
            return res.status(400).json({success:false, message: "Password must be at least 8 characters long" });
        }
        //hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword,

        });
        const user = await newUser.save();
        const token = createToken(user._id);
        res.status(201).json({success:true, message: "User registered successfully", token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};


export { loginUser, registerUser };