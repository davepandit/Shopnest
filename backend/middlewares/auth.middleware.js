import User from "../models/user.models.js";
import jwt from 'jsonwebtoken'

export const validateToken = async(req , res , next) => {
    const {token} = req.cookies

    if(token){
     try {
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET)
        req.user = await User.findById(decodedToken.userId).select('-password')
        // console.log(req.user)
        next()
     } catch (error) {
        res.status(404).json({mssg:'Token doesnot match'})
        
     }
    }
    else{
        res.status(404).json({mssg:'Token not found'})
    }
}

export const adminCheck = (req , res , next) => {
    // console.log(req.user)
    // console.log(req.user?.isAdmin)
    if(req.user && req.user?.isAdmin){
        next()
    }
    else{
        res.status(401).json({mssg:'Not authorized as admin'})
    }
}