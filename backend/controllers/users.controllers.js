import User from "../models/user.models.js";


export const loginUser = async(req , res) => {
    const  {email , password} = req.body
    try {
        const user = await User.findOne({email : email})

        if(user && ( await user.matchPassword(password))){
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

export const  registerUser = (req , res) => {
    res.send('register user')
}

export const logoutUser = (req , res) => {
    res.send('logout user')

}

export const getUserProfile = (req , res) => {
    res.send('getUserProfile')
}

export const updateUserProfile = (req , res) => {
    res.send('updateUserProfile')
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