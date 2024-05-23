import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/errorhandler.js";
import  jwt  from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const signup= async(req,res,next)=>{
    const {username , email , password } = req.body;
    const hashPassword = bcryptjs.hashSync(password,10);
  
    const newUser= new User({username,email,password: hashPassword});
    try {
        await newUser.save();
        res.status(201).json("user created SuccesFully");
    } catch (error) {
        
       next(error);
    }
    
};

export const signin= async (req,res,next)=>{
    const { email, password } = req.body;
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) return next(errorHandler(404, 'User not found!'));
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      console.log(validUser.password);
      if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      next(error);
    }
    
};
export const google= async (req,res,next)=>{
  
  try {

    const validUser = await User.findOne({ email: req.body.email });

    if (validUser){
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = validUser._doc;
      res
        .cookie('access_token', token, { httpOnly: true })
        .status(200)
        .json(rest);
    }else{
       const GeneratedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
       const hashedPassword = bcryptjs.hashSync(GeneratedPassword,10);
       const newUser = new User({username : req.body.name.split(" ").join("").toLowerCase() + Math.random().toString().slice(-4), email: req.body.email, password: hashedPassword, avatar : req.body.photo});

       await newUser.save();
       const token = jwt.sign({id: newUser._id} , process.env.JWT_SECRET);
       const {password  , ...rest} =  newUser._doc;
       res.cookie('access_token', token , {httpOnly:true}).status(200).json(rest);

    }
    
   
  } catch (error) {
    next(error);
  }
  
};
export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
// 1:35