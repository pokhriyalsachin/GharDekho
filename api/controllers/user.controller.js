import User from "../models/User.model.js";
import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/errorhandler.js";

export const updateUser= async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'YOu can update your account only!!'))
    try {
        if(req.body.password){
            req.body.password= bcryptjs.hashSync(req.body.password,10);
        } 
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
             $set:{
                username: req.body.username,
                email:req.body.email,
                password:req.body.password,
                avatar:req.body.avatar,
            },
        }, {new: true}); 
//  imp to add new true bcz it handles the new user creation
       const {password, ...rest}= updatedUser._doc;
       res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}
export const deleteUser= async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401,'YOu can delete your account only!!'))
    try {
      
        await User.findByIdAndDelete(
            req.params.id
        );
        
//  imp to add new true bcz it handles the new user creation
       
       res.status(200).json("User deleted");
    } catch (error) {
        next(error);
    }
}

export const getUserListings= async (req,res,next)=>{
    if(req.user.id !== req.params.id) return next(errorHandler(401, ' You can view your Own listings'));
    try {
        const listings = await Listing.find({userRef : req.params.id});
        res.status(200).json(listings);
    } catch (error) {
        next(error);
    }

}
export const getUser = async(req,res,next)=>{
    try {
        const user =  await User.findById(req.params.id);
        if(!user) return next(errorHandler(401, ' You can view your Own listings'));
        const {password: pass , ...rest} = user._doc;
        
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
}
// 8:18
