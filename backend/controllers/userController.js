import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Resume from "../models/Resume.js";


// token generation 
const genToken = (userId)=>{
      const token = jwt.sign({userId},process.env.JWT_SECRET_KEY,{expiresIn:"7d"});
      return token;
}

// POST :-- /api/users/register
export const registerUser = async(req,res)=>{
    try {
        const {name,email,password} = req.body;
        // check if required files 
        if(!name || !email || !password){
            return res.status(400).json({message:"Missing required fields"});
        }
        // user already exists or not
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message:"User already exists"});
        }

        // password hashed 
        const hashPassword = await bcrypt.hash(password,10);
        const newUser = await User.create({
            name,
            email,
            password:hashPassword,
        });

        // return success message 
        const token = genToken(newUser._id);
        newUser.password = undefined;

        return res.status(201).json({message:"User register successfully",token,user:newUser});

    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}


// GET :-- /api/users/login

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User doesn't exist" });
    }

    // Compare password (async)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate token
    const token = genToken(user._id);

    // Hide password in response
    user.password = undefined;

    return res.status(200).json({
      message: "User login successfully!",
      token,
      user,
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controllers for getting user by id;
// GET :-- /api/users/data
export const getUserById = async(req,res)=>{
    try {
        const userId = req.userId;
        // cehcek if user exists 
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found!"});
        }

        // return user 
        user.password = undefined;
        return res.status(200).json({user});
        
    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}


// getting user resume 
// GET :-- /api/users/resumes
export const getUserResume = async(req,res)=>{
    try {
        const userId = req.userId;// by middlewares 

        // return user resume 
        const resumes = await Resume.find({userId}); // return all reusmes of user 
        return res.status(200).json({message:"Resumes found", resumes});

    } catch (error) {
        return res.status(400).json({message:error.message});
    }
}
