import User from "../models/user.models.js";
import jwt from 'jsonwebtoken';

export const loginUser = async(req , res) => {
    const  {email , password} = req.body
    try {
        const user = await User.findOne({email : email})

        if(user && ( await user.matchPassword(password))){

            const token = jwt.sign({userId:user._id} , process.env.JWT_SECRET , {
                expiresIn: '15d'
            })

            res.cookie('token' , token , {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                // but the above needs to be true in production 
                sameSite:'strict',
                maxAge: 15*24*60*60*1000
                //basically the above thing is 15 days
            })
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin
            })

        }
    else{
        res.status(401).json({mssg:'Invalid email or password'})
    }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

export const  registerUser = async(req , res) => {
    const { name, email, password } = req.body

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({mssg: 'User already exists'})
        }

        const user = await User.create({
            name,
            email,
            password,
        })

        const token = jwt.sign({userId:user._id} , process.env.JWT_SECRET , {
            expiresIn: '15d'
        })

        res.cookie('token' , token , {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            // but the above needs to be true in production 
            sameSite:'strict',
            maxAge: 15*24*60*60*1000
            //basically the above thing is 15 days
        })

        if(user){
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
    
            })
        }
    } catch (error) {
        res.status(404).json({error: error.message})
    }
}

export const logoutUser = (req , res) => {
    res.clearCookie('token' , {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({mssg: 'User logged out successfully'})

}

export const getUserProfile = async(req , res) => {
    //we are logged in means we have a token which ensures that we are logged in and we have access to the req.user object it is basically a document without the password
    try {
        const user = await User.findById(req.user._id)

        if(user){
            res.status(200).json({
                _id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin
            })
        }
        else{
            res.status(404).json({mssg:'User not found'})
        }
    } catch (error) {
        res.status(500).json({error:error.messsage})
    }


}

export const updateUserProfile = async(req , res) => {
    try {
        const user = await User.findById(req.user._id)
        if(user){
            user.name = req.body.name || user.name,
            user.email = req.body.email || user.email
            if(req.body.password){
                user.password = req.body.password
            }
        }

        const updatedUser = await user.save()
        res.status(201).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

export const getUsers = (req , res) => {
    res.send('getUsers')
}

export const deleteUser = (req , res) => {
    res.send('deleteUser')
}

export const getUserById = (req , res) => {
    res.send('getUserById')
}

export const updateUser = (req , res) => {
    res.send('updateUser')
}