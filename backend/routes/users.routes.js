import 
{   loginUser,
    registerUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser} from '../controllers/users.controllers.js'
import express from 'express'

const router = express.Router()

router.post('/' , registerUser)
router.get('/' , getUsers)
router.post('/logout' , logoutUser)
router.post('/login' , loginUser)
router.get('/profile' , getUserProfile)
router.put('/profile' , updateUserProfile)
router.delete('/:id' , deleteUser)
router.get('/:id' , getUserById)
router.put('/:id' , updateUser)

export default router